(() => {
  "use strict";

  const G = window.GH900;
  const STORE_KEY = "gh900quest.v1";
  const GRAVE_STEPS = [1, 3, 7]; // dias após o erro para cada revisão
  const QUIZ_SIZE = 5;
  const BOSS_SIZE = 10;
  const BOSS_PASS = 8;
  const XP = { section: 10, mission: 25, perCorrect: 2, graveOut: 5, streak7: 50 };
  const PRACTICE_URL = "https://learn.microsoft.com/credentials/certifications/github-foundations/?practice-assessment-type=certification";
  const SANDBOX_URL = "https://aka.ms/examdemo";

  // ── Datas ──────────────────────────────────────────────────────────────
  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const today = () => fmt(new Date());
  const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return fmt(d); };
  const diffDays = (a, b) => Math.round((parse(b) - parse(a)) / 86400000);
  const br = (s) => s.split("-").reverse().join("/");

  // ── Estado ─────────────────────────────────────────────────────────────
  const fresh = () => ({
    v: 1, xp: 0, log: [], read: {}, quizBest: {}, boss: {}, bossBest: {},
    missions: {}, grave: {}, days: [], streakBonus: [], practice: [],
  });

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return Object.assign(fresh(), JSON.parse(raw));
    } catch (_) { /* storage indisponível */ }
    return fresh();
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (_) { /* ignora */ }
  }

  let S = load();
  let view = { name: "map" };
  let session = null;

  // ── Helpers ────────────────────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const worldById = (id) => G.worlds.find((w) => w.id === id);
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const allBosses = () => G.worlds.every((w) => S.boss[w.id]);
  const findQ = (qid) => { for (const w of G.worlds) { const q = w.questions.find((x) => x.id === qid); if (q) return { q, w }; } return null; };
  const graveDue = () => Object.entries(S.grave).filter(([qid, g]) => findQ(qid) && diffDays(g.err, today()) >= GRAVE_STEPS[g.stage]).map(([qid]) => qid);

  function levelIndex(xp) {
    let idx = 0;
    G.levels.forEach((l, i) => { if (xp >= l.min) idx = i; });
    const last = G.levels.length - 1;
    if (idx === last && !allBosses()) idx = last - 1; // Octocat exige os 7 chefes
    return idx;
  }

  function streak() {
    const set = new Set(S.days);
    let d = set.has(today()) ? today() : addDays(today(), -1);
    let n = 0;
    while (set.has(d)) { n++; d = addDays(d, -1); }
    return n;
  }

  function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    $("#toast-layer").appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }

  function modal(html) {
    const m = $("#modal");
    m.innerHTML = `<div class="modal-box">${html}<p><button class="btn primary" data-act="close-modal">Bora!</button></p></div>`;
    m.hidden = false;
    m.querySelector("button").focus();
  }

  function gain(n, what) {
    if (!n) {
      if (!S.days.includes(today())) { S.days.push(today()); save(); }
      return;
    }
    const before = levelIndex(S.xp);
    S.xp = Math.max(0, S.xp + n);
    S.log.push({ d: today(), what, xp: n });
    if (!S.days.includes(today())) S.days.push(today());
    const st = streak();
    if (n > 0 && st > 0 && st % 7 === 0 && !S.streakBonus.includes(today())) {
      S.streakBonus.push(today());
      S.xp += XP.streak7;
      S.log.push({ d: today(), what: `Streak de ${st} dias`, xp: XP.streak7 });
      toast(`🔥 Streak ${st} dias! +${XP.streak7} XP`);
    }
    save();
    toast(`${n > 0 ? "+" : ""}${n} XP`);
    const after = levelIndex(S.xp);
    if (after > before) {
      const L = G.levels[after];
      modal(`<div class="big">${after === G.levels.length - 1 ? "🐙" : "⭐"}</div><h2>LEVEL UP!</h2><p>Nível ${after + 1}: <strong>${esc(L.name)}</strong></p>`);
    }
    hud();
  }

  // ── HUD ────────────────────────────────────────────────────────────────
  function hud() {
    const i = levelIndex(S.xp);
    const L = G.levels[i];
    const next = G.levels[i + 1];
    $("#hud-lvl").textContent = `LV ${i + 1}`;
    $("#hud-lvl-name").textContent = L.name;
    $("#hud-xp").textContent = `${S.xp} XP`;
    let pct = 100, nextTxt = "Nível máximo. Hora do chefe final!";
    if (next) {
      const span = next.min - L.min;
      pct = Math.min(100, ((S.xp - L.min) / span) * 100);
      nextTxt = S.xp >= next.min
        ? `XP suficiente: vença os 7 chefes para virar ${next.name}`
        : `${next.min - S.xp} XP para ${next.name}`;
    }
    $("#hud-bar").style.width = `${pct}%`;
    $("#hud-next").textContent = nextTxt;
    $("#hud-streak").textContent = `🔥 ${streak()}`;
    const due = graveDue().length;
    $("#hud-grave").textContent = `🪦 ${Object.keys(S.grave).length}${due ? ` · ${due}!` : ""}`;
  }

  // ── Telas ──────────────────────────────────────────────────────────────
  function render() {
    const app = $("#app");
    const fn = { map: vMap, world: vWorld, quiz: vQuiz, result: vResult, grave: vGrave, final: vFinal }[view.name];
    app.innerHTML = fn();
    hud();
    window.scrollTo({ top: 0 });
  }

  function nextStep() {
    const due = graveDue().length;
    if (due) return { txt: `Revisar ${due} carta(s) do Cemitério`, act: "go", arg: "grave" };
    for (const [i, w] of G.worlds.entries()) {
      const unread = w.sections.findIndex((_, k) => !S.read[`${w.id}-${k}`]);
      if (unread >= 0) return { txt: `Ler "${w.sections[unread].title}" (Mundo ${i + 1})`, act: "read", arg: `${w.id}:${unread}` };
      if (!S.boss[w.id]) {
        if ((S.quizBest[w.id] || 0) < QUIZ_SIZE) return { txt: `Quiz rápido do Mundo ${i + 1}`, act: "start", arg: `quiz:${w.id}` };
        return { txt: `Enfrentar o chefe do Mundo ${i + 1}`, act: "start", arg: `boss:${w.id}` };
      }
    }
    return { txt: "Encarar o chefe final", act: "go", arg: "final" };
  }

  function vMap() {
    const ns = nextStep();
    const cards = G.worlds.map((w, i) => {
      const read = w.sections.filter((_, k) => S.read[`${w.id}-${k}`]).length;
      const mis = w.missions.filter((m) => S.missions[m.id]).length;
      const qb = S.quizBest[w.id] || 0;
      return `
      <button class="world-card" style="--wc:${w.color}" data-act="world" data-arg="${w.id}">
        ${S.boss[w.id] ? '<span class="crown" title="Chefe derrotado">👑</span>' : ""}
        <span class="num">MUNDO ${i + 1} · ${w.weight}</span>
        <h3><span>${w.icon}</span>${esc(w.name)}</h3>
        <p class="dom">${esc(w.domain)}</p>
        ${meter("Leitura", read, w.sections.length)}
        ${meter("Missões", mis, w.missions.length)}
        ${meter("Melhor quiz", qb, QUIZ_SIZE)}
        <div style="margin-top:10px"><span class="chip">CHEFE ${S.boss[w.id] ? "DERROTADO" : `${w.bossXp} XP`}${S.bossBest[w.id] != null ? ` · melhor ${S.bossBest[w.id]}/${BOSS_SIZE}` : ""}</span></div>
      </button>`;
    }).join("");
    const due = graveDue().length;
    const total = Object.keys(S.grave).length;
    const ready = finalStatus().ready;
    return `
      <h1 class="pixel-title">Mapa do mundo</h1>
      <p class="sub">Leia, pratique e derrote os 7 chefes para liberar o exame.</p>
      <div class="special" style="margin-bottom:18px;border-style:solid;border-color:#3fb95066">
        <h3>▶ Próximo passo</h3>
        <p style="display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap">
          <span>${esc(ns.txt)}</span>
          <button class="btn primary" data-act="${ns.act}" data-arg="${ns.arg}">Ir agora</button>
        </p>
      </div>
      <div class="map-grid">${cards}</div>
      <div class="special-row">
        <button class="special" data-act="go" data-arg="grave">
          <h3>🪦 Cemitério</h3>
          <p>${total ? `${total} carta(s) · ${due} para revisar hoje` : "Vazio. Nenhum erro pendente."}</p>
        </button>
        <button class="special final" data-act="go" data-arg="final">
          <h3>🐉 Chefe final</h3>
          <p>${ready ? "Liberado! Agende o exame." : levelIndex(S.xp) === G.levels.length - 1 ? "Octocat! Faça o practice assessment oficial." : "Trancado até o nível Octocat (2000 XP + 7 chefes)."}</p>
        </button>
      </div>`;
  }

  const meter = (label, n, max) => `
    <div class="meter"><span>${label}</span><div class="bar"><div class="bar-fill" style="width:${(n / max) * 100}%"></div></div><span>${n}/${max}</span></div>`;

  function vWorld() {
    const w = worldById(view.w);
    const idx = G.worlds.indexOf(w) + 1;
    const tab = view.tab || "read";
    const tabs = [["read", "📖 Leitura"], ["battle", "⚔️ Teste"], ["missions", "🛠️ Missões"]]
      .map(([k, t]) => `<button class="tab" role="tab" aria-selected="${tab === k}" data-act="tab" data-arg="${k}">${t}</button>`).join("");
    const body = tab === "read" ? vRead(w) : tab === "battle" ? vBattle(w) : vMissions(w);
    return `
      <div style="--wc:${w.color}">
        <button class="back" data-act="go" data-arg="map">← Mapa</button>
        <div class="world-head">
          <span class="big-icon">${w.icon}</span>
          <div><h2>Mundo ${idx}: ${esc(w.name)}</h2><p>${esc(w.domain)} · peso ${w.weight} na prova</p></div>
        </div>
        <div class="tabs" role="tablist">${tabs}</div>
        ${body}
      </div>`;
  }

  function vRead(w) {
    const k = view.sec || 0;
    const sec = w.sections[k];
    const key = `${w.id}-${k}`;
    const done = !!S.read[key];
    const last = k === w.sections.length - 1;
    const toc = w.sections.map((s, i) => `
      <button aria-current="${i === k}" data-act="sec" data-arg="${i}">
        <span class="tick">${S.read[`${w.id}-${i}`] ? "✅" : "▫️"}</span>${esc(s.title)}
      </button>`).join("");
    return `
      <div class="reader">
        <nav class="toc">${toc}</nav>
        <article class="page">
          <span class="chip">SEÇÃO ${k + 1}/${w.sections.length}</span>
          <h3>${esc(sec.title)}</h3>
          ${sec.html}
          <div class="page-nav">
            <button class="btn" data-act="sec" data-arg="${k - 1}" ${k === 0 ? "disabled" : ""}>← Anterior</button>
            ${done
              ? `<span class="chip">✓ LIDA</span>`
              : `<button class="btn primary" data-act="read-done" data-arg="${k}">Entendi! +${XP.section} XP</button>`}
            ${last
              ? `<button class="btn" data-act="tab" data-arg="battle">Ir para o teste ⚔️</button>`
              : `<button class="btn" data-act="sec" data-arg="${k + 1}">Próxima →</button>`}
          </div>
        </article>
      </div>`;
  }

  function vBattle(w) {
    const read = w.sections.filter((_, k) => S.read[`${w.id}-${k}`]).length;
    const warn = read < w.sections.length
      ? `<p class="sub">⚠️ Você leu ${read} de ${w.sections.length} seções. Dá para lutar mesmo assim, mas ler antes rende mais acertos.</p>` : "";
    return `
      ${warn}
      <div class="arena-intro">
        <div class="mode-card">
          <h3>⚡ Quiz rápido</h3>
          <p>${QUIZ_SIZE} perguntas sorteadas de ${w.questions.length}, com explicação após cada resposta. ${XP.perCorrect} XP por acerto; ${QUIZ_SIZE}/${QUIZ_SIZE} dobra o XP. Erros vão para o Cemitério.</p>
          <button class="btn primary" data-act="start" data-arg="quiz:${w.id}">Começar quiz</button>
        </div>
        <div class="mode-card boss-card">
          <h3>👹 Chefe do mundo</h3>
          <p>${BOSS_SIZE} perguntas, sem dica, com resultado só no fim. Precisa de ${BOSS_PASS}/${BOSS_SIZE}. ${S.boss[w.id] ? "Já derrotado: pode refazer para treinar (sem XP)." : `Vitória vale <strong>${w.bossXp} XP</strong>.`}</p>
          <button class="btn boss" data-act="start" data-arg="boss:${w.id}">Enfrentar chefe</button>
        </div>
      </div>`;
  }

  function vMissions(w) {
    const items = w.missions.map((m) => `
      <label class="mission ${S.missions[m.id] ? "done" : ""}">
        <input type="checkbox" data-act="mission" data-arg="${m.id}" ${S.missions[m.id] ? "checked" : ""}>
        <span>${esc(m.text)}</span><span class="xp">+${XP.mission} XP</span>
      </label>`).join("");
    return `
      <p class="sub">Missões práticas no GitHub de verdade, no repositório de treino <code>gh900-dojo</code>. Marque quando terminar.</p>
      <div class="missions">${items}</div>`;
  }

  // ── Quiz ───────────────────────────────────────────────────────────────
  function startSession(mode, wid) {
    let qs;
    if (mode === "grave") qs = shuffle(graveDue()).slice(0, 10).map((id) => findQ(id).q);
    else {
      const w = worldById(wid);
      qs = shuffle(w.questions).slice(0, mode === "boss" ? BOSS_SIZE : QUIZ_SIZE);
    }
    if (!qs.length) { toast("Nada para revisar agora"); return; }
    session = { mode, wid, qs, order: qs.map((q) => shuffle(q.opts.map((_, i) => i))), i: 0, picks: [], answered: false };
    view = { name: "quiz" };
    render();
  }

  function vQuiz() {
    const s = session;
    const q = s.qs[s.i];
    const isBoss = s.mode === "boss";
    const label = s.mode === "grave" ? "🪦 Revisão do Cemitério" : isBoss ? `👹 Chefe: ${worldById(s.wid).name}` : `⚡ Quiz: ${worldById(s.wid).name}`;
    const pips = s.qs.map((qq, i) => {
      let c = "pip";
      if (i < s.picks.length) c += isBoss ? " done" : s.picks[i] === qq.a ? " ok" : " bad";
      if (i === s.i) c += " now";
      return `<span class="${c}"></span>`;
    }).join("");
    const picked = s.picks[s.i];
    const opts = s.order[s.i].map((oi, pos) => {
      let cls = "opt";
      if (s.answered && !isBoss) {
        if (oi === q.a) cls += " correct";
        else if (oi === picked) cls += " wrong";
      }
      return `<button class="${cls}" data-act="pick" data-arg="${oi}" ${s.answered ? "disabled" : ""}>
        <span class="key">${"ABCD"[pos]}</span><span>${esc(q.opts[oi])}</span></button>`;
    }).join("");
    let fb = "";
    if (s.answered && !isBoss) {
      const ok = picked === q.a;
      fb = `<div class="feedback ${ok ? "ok" : "bad"}"><strong>${ok ? "✅ Acertou!" : "❌ Errou, vai para o Cemitério"}</strong>${esc(q.exp)}</div>
        <div class="quiz-actions"><button class="btn primary" data-act="next">${s.i === s.qs.length - 1 ? "Ver resultado" : "Próxima →"}</button></div>`;
    }
    return `
      <div class="quiz">
        <div class="quiz-top"><span>${label}</span><span>${s.i + 1}/${s.qs.length}</span><div class="pips">${pips}</div></div>
        <div class="question" id="qbox">
          <h3>${esc(q.q)}</h3>
          <div class="opts">${opts}</div>
          ${fb}
        </div>
        <p class="hint">Atalhos: A–D ou 1–4 para responder · Enter para avançar · Esc para desistir</p>
      </div>`;
  }

  function pick(oi) {
    const s = session;
    if (s.answered) return;
    s.picks[s.i] = oi;
    if (s.mode === "boss") { advance(); return; }
    s.answered = true;
    render();
    if (oi !== s.qs[s.i].a) $("#qbox")?.classList.add("shake");
  }

  function advance() {
    const s = session;
    if (s.i < s.qs.length - 1) { s.i++; s.answered = false; render(); }
    else finish();
  }

  function sendToGrave(qid) { S.grave[qid] = { err: today(), stage: 0 }; }

  function finish() {
    const s = session;
    const correct = s.qs.filter((q, i) => s.picks[i] === q.a).length;
    const wrong = s.qs.filter((q, i) => s.picks[i] !== q.a);
    const n = s.qs.length;
    let xp = 0, title = "", big = "", note = "";
    const w = s.wid && worldById(s.wid);

    if (s.mode === "quiz") {
      wrong.forEach((q) => sendToGrave(q.id));
      xp = XP.perCorrect * correct * (correct === n ? 2 : 1);
      S.quizBest[s.wid] = Math.max(S.quizBest[s.wid] || 0, correct);
      big = correct === n ? "🔥" : correct >= 3 ? "💪" : "📚";
      title = correct === n ? "COMBO PERFEITO!" : "Quiz concluído";
      if (correct === n) note = "5/5 dobrou o XP!";
      save();
      gain(xp, `Quiz rápido ${w.name} (${correct}/${n})`);
    } else if (s.mode === "boss") {
      wrong.forEach((q) => sendToGrave(q.id));
      const win = correct >= BOSS_PASS;
      S.bossBest[s.wid] = Math.max(S.bossBest[s.wid] ?? 0, correct);
      big = win ? "👑" : "💀";
      title = win ? "CHEFE DERROTADO!" : "O chefe venceu desta vez";
      if (win && !S.boss[s.wid]) { S.boss[s.wid] = true; xp = w.bossXp; }
      else if (win) note = "Chefe já tinha sido derrotado, então não rende XP novo.";
      else note = `Precisava de ${BOSS_PASS}/${n}. Revise os erros abaixo e tente de novo amanhã.`;
      save();
      if (xp) gain(xp, `Chefe ${w.name} (${correct}/${n})`);
      else { if (!S.days.includes(today())) S.days.push(today()); save(); }
    } else {
      let out = 0;
      s.qs.forEach((q, i) => {
        const g = S.grave[q.id];
        if (!g) return;
        if (s.picks[i] === q.a) {
          g.stage++;
          if (g.stage >= GRAVE_STEPS.length) { delete S.grave[q.id]; out++; }
        } else sendToGrave(q.id);
      });
      xp = out * XP.graveOut;
      big = "🪦";
      title = "Revisão concluída";
      note = out ? `${out} carta(s) saíram do Cemitério!` : "Acertos avançam a carta para a próxima revisão.";
      save();
      if (xp) gain(xp, `Cemitério: ${out} carta(s) libertada(s)`);
      else { if (!S.days.includes(today())) S.days.push(today()); save(); }
    }

    view = { name: "result", data: { correct, n, xp, title, big, note, wrong, picks: s.picks, qs: s.qs, mode: s.mode, wid: s.wid } };
    render();
  }

  function vResult() {
    const r = view.data;
    const review = r.wrong.map((q) => {
      const i = r.qs.indexOf(q);
      const yours = r.picks[i] != null ? q.opts[r.picks[i]] : "—";
      return `<div class="review-item"><div><strong>${esc(q.q)}</strong></div>
        <div class="why">Sua resposta: ${esc(yours)}</div>
        <div class="ans">✓ ${esc(q.opts[q.a])}</div>
        <div class="why">${esc(q.exp)}</div></div>`;
    }).join("");
    const again = r.mode === "grave" ? "" : `<button class="btn" data-act="start" data-arg="${r.mode}:${r.wid}">Jogar de novo</button>`;
    const back = r.wid ? `<button class="btn primary" data-act="world" data-arg="${r.wid}">Voltar ao mundo</button>` : "";
    return `
      <div class="result">
        <div class="big">${r.big}</div>
        <div class="score">${r.correct}/${r.n}</div>
        <h2>${esc(r.title)}</h2>
        <div class="xp-gain">${r.xp ? `+${r.xp} XP` : "+0 XP"}</div>
        ${r.note ? `<p class="sub" style="margin-top:10px">${esc(r.note)}</p>` : ""}
        <div class="quiz-actions">${again}${back}<button class="btn" data-act="go" data-arg="map">Mapa</button></div>
        ${review ? `<h3 style="margin-top:32px;text-align:left">Revisão dos erros</h3><div class="review-list">${review}</div>` : ""}
      </div>`;
  }

  // ── Cemitério ──────────────────────────────────────────────────────────
  function vGrave() {
    const due = new Set(graveDue());
    const items = Object.entries(S.grave).filter(([qid]) => findQ(qid)).sort((a, b) => a[1].err.localeCompare(b[1].err)).map(([qid, g]) => {
      const { q, w } = findQ(qid);
      const next = addDays(g.err, GRAVE_STEPS[g.stage]);
      const st = GRAVE_STEPS.map((_, i) => `<i class="${i < g.stage ? "on" : ""}"></i>`).join("");
      return `<div class="grave-item">
        <div><div>${w.icon} ${esc(q.q)}</div>
        <div class="meta">Errou em ${br(g.err)} · ${due.has(qid) ? "<strong style='color:var(--gold)'>revisar hoje</strong>" : `próxima revisão ${br(next)}`}</div></div>
        <div class="stage" title="Revisões feitas">${st}</div></div>`;
    }).join("");
    return `
      <button class="back" data-act="go" data-arg="map">← Mapa</button>
      <h1 class="pixel-title">🪦 Cemitério</h1>
      <p class="sub">Cada erro vira uma carta. Ela volta 1, 3 e 7 dias depois do erro. Acerte as 3 revisões e ela sai (+${XP.graveOut} XP). Errou de novo? O relógio recomeça.</p>
      <button class="btn primary" data-act="start" data-arg="grave:" ${due.size ? "" : "disabled"}>Revisar ${due.size} carta(s) de hoje</button>
      ${items ? `<div class="grave-list">${items}</div>` : `<p class="empty">Nenhuma carta. Mandou bem! 🎉</p>`}`;
  }

  // ── Chefe final ────────────────────────────────────────────────────────
  function finalStatus() {
    const octo = levelIndex(S.xp) === G.levels.length - 1;
    const p = S.practice;
    const last2 = p.slice(-2);
    const twice = last2.length === 2 && last2.every((x) => x.score >= 85) && last2[0].d !== last2[1].d;
    return { octo, twice, ready: octo && twice };
  }

  function vFinal() {
    const f = finalStatus();
    const lv = G.levels[G.levels.length - 1];
    const bosses = G.worlds.filter((w) => S.boss[w.id]).length;
    const hist = S.practice.length
      ? S.practice.map((p) => `<li>${br(p.d)}: <strong>${p.score}%</strong> ${p.score >= 85 ? "✅" : "❌"}</li>`).join("")
      : "<li>Nenhuma tentativa registrada ainda.</li>";
    const ck = (ok, txt) => `<li>${ok ? "✅" : "⬜"} <span>${txt}</span></li>`;
    return `
      <button class="back" data-act="go" data-arg="map">← Mapa</button>
      <h1 class="pixel-title">🐉 Chefe final</h1>
      <p class="sub">O dragão é o exame GH-900 de verdade (nota mínima 700/1000). Antes dele, treine no simulado oficial.</p>
      <ul class="checklist">
        ${ck(S.xp >= lv.min, `Ter ${lv.min} XP (você tem ${S.xp})`)}
        ${ck(bosses === G.worlds.length, `Derrotar os ${G.worlds.length} chefes (${bosses}/${G.worlds.length})`)}
        ${ck(f.twice, `Tirar 85%+ duas vezes seguidas, em dias diferentes, no <a href="${PRACTICE_URL}" target="_blank" rel="noopener">practice assessment oficial</a>`)}
        ${ck(false, `Explorar o <a href="${SANDBOX_URL}" target="_blank" rel="noopener">exam sandbox</a> para conhecer a interface`)}
      </ul>
      ${f.octo ? `
        <h3 style="margin-top:28px">Registrar practice assessment</h3>
        <div class="score-form">
          <input id="score-in" type="number" min="0" max="100" placeholder="% acertos" aria-label="Porcentagem de acertos">
          <button class="btn primary" data-act="practice">Registrar</button>
        </div>` : `<p class="sub" style="margin-top:20px">🔒 O registro de simulado é liberado no nível Octocat.</p>`}
      <h3 style="margin-top:24px">Histórico</h3><ul>${hist}</ul>
      ${f.ready ? `<div class="special final" style="margin-top:20px"><h3>🏆 Pronto para o exame!</h3><p>Agende o GH-900 pelo Microsoft Learn.</p></div>` : ""}`;
  }

  // ── Eventos ────────────────────────────────────────────────────────────
  function act(a, arg, el) {
    switch (a) {
      case "go": view = { name: arg }; render(); break;
      case "world": view = { name: "world", w: arg, tab: "read", sec: 0 }; render(); break;
      case "tab": view.tab = arg; render(); break;
      case "sec": view.sec = Number(arg); render(); break;
      case "read": { const [w, k] = arg.split(":"); view = { name: "world", w, tab: "read", sec: Number(k) }; render(); break; }
      case "read-done": {
        const w = worldById(view.w), k = Number(arg), key = `${w.id}-${k}`;
        if (!S.read[key]) { S.read[key] = true; gain(XP.section, `Leitura: ${w.sections[k].title}`); }
        if (k < w.sections.length - 1) view.sec = k + 1;
        render();
        break;
      }
      case "start": { const [mode, wid] = arg.split(":"); startSession(mode, wid); break; }
      case "pick": pick(Number(arg)); break;
      case "next": advance(); break;
      case "mission": {
        const m = G.worlds.flatMap((w) => w.missions).find((x) => x.id === arg);
        if (el.checked) { S.missions[arg] = true; gain(XP.mission, `Missão: ${m.text}`); }
        else { delete S.missions[arg]; gain(-XP.mission, `Missão desmarcada: ${m.text}`); }
        render();
        break;
      }
      case "practice": {
        const v = Number($("#score-in").value);
        if (!(v >= 0 && v <= 100) || $("#score-in").value === "") { toast("Digite um valor de 0 a 100"); return; }
        S.practice.push({ d: today(), score: v });
        save();
        render();
        if (finalStatus().ready) modal(`<div class="big">🏆</div><h2>DRAGÃO À VISTA!</h2><p>Você está pronto. Agende o exame GH-900.</p>`);
        break;
      }
      case "close-modal": $("#modal").hidden = true; break;
    }
  }

  document.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) { view = { name: go.dataset.go }; render(); return; }
    const el = e.target.closest("[data-act]");
    if (!el || el.disabled) return;
    if (el.type === "checkbox") return; // tratado no change
    act(el.dataset.act, el.dataset.arg, el);
  });
  document.addEventListener("change", (e) => {
    const el = e.target;
    if (el.matches?.('input[type="checkbox"][data-act]')) act(el.dataset.act, el.dataset.arg, el);
  });

  document.addEventListener("keydown", (e) => {
    if (!$("#modal").hidden) { if (e.key === "Enter" || e.key === "Escape") $("#modal").hidden = true; return; }
    if (view.name !== "quiz" || e.metaKey || e.ctrlKey) return;
    const s = session;
    const k = e.key.toLowerCase();
    const pos = "abcd".indexOf(k) >= 0 ? "abcd".indexOf(k) : "1234".indexOf(k);
    if (pos >= 0 && !s.answered && s.order[s.i][pos] != null) { e.preventDefault(); pick(s.order[s.i][pos]); }
    else if (k === "enter" && s.answered) { e.preventDefault(); advance(); }
    else if (k === "escape") { view = s.wid ? { name: "world", w: s.wid, tab: "battle" } : { name: "grave" }; render(); }
  });

  // ── Export / import / reset ────────────────────────────────────────────
  $("#btn-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `gh900-quest-${today()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
  $("#btn-import").addEventListener("change", async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (typeof data.xp !== "number") throw new Error("formato");
      S = Object.assign(fresh(), data);
      save();
      view = { name: "map" };
      render();
      toast("Progresso importado");
    } catch (_) { toast("Arquivo inválido"); }
    e.target.value = "";
  });
  $("#btn-reset").addEventListener("click", () => {
    if (!confirm("Zerar todo o progresso? Não dá para desfazer (exporte antes se quiser guardar).")) return;
    S = fresh();
    save();
    view = { name: "map" };
    render();
  });

  render();
})();

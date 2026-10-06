// Conteúdo do GH-900 Quest: leitura, perguntas e missões por mundo.
// Domínios e pesos: guia oficial do exame GH-900 (versão jan/2026)
// https://learn.microsoft.com/credentials/certifications/resources/study-guides/gh-900
// Textos das lições e perguntas: escritos a partir dos objetivos do guia e da
// documentação do GitHub (https://docs.github.com). Conferir detalhes lá.

window.GH900 = {
  levels: [
    { min: 0, name: "Noob do init" },
    { min: 200, name: "Commitador" },
    { min: 500, name: "Brancher" },
    { min: 900, name: "Merger" },
    { min: 1400, name: "Maintainer" },
    { min: 2000, name: "Octocat" },
  ],

  worlds: [
    // ─────────────────────────────────────────────────────────────── 1
    {
      id: "w1",
      icon: "🏘️",
      name: "Vila do Commit",
      domain: "Understand Git and GitHub basics",
      weight: "25–30%",
      bossXp: 300,
      color: "#3fb950",
      sections: [
        {
          title: "Por que controle de versão",
          html: `
<p>Um sistema de controle de versão guarda o histórico de todas as mudanças num conjunto de arquivos. Com ele dá para:</p>
<ul>
<li>voltar a qualquer versão anterior;</li>
<li>saber <strong>quem</strong> mudou <strong>o quê</strong>, <strong>quando</strong> e <strong>por quê</strong> (mensagem do commit);</li>
<li>trabalhar em paralelo sem um sobrescrever o outro;</li>
<li>revisar mudanças antes de elas entrarem na versão principal.</li>
</ul>
<p>Sistemas <strong>centralizados</strong> (ex.: SVN) dependem de um servidor único. O <strong>Git</strong> é <strong>distribuído</strong>: cada clone tem o histórico completo, então commit, branch e log funcionam offline.</p>`,
        },
        {
          title: "Conceitos do Git",
          html: `
<ul>
<li><strong>Repositório</strong>: a pasta do projeto mais o histórico (diretório <code>.git</code>).</li>
<li><strong>Commit</strong>: uma "foto" (snapshot) das mudanças, com identificador único (hash SHA), autor, data e mensagem.</li>
<li><strong>Staging area</strong>: área intermediária. <code>git add</code> prepara as mudanças, <code>git commit</code> grava.</li>
<li><strong>Branch</strong>: um ponteiro móvel para um commit, ou seja, uma linha de desenvolvimento paralela. Criar branch é barato.</li>
<li><strong>HEAD</strong>: aponta para a branch/commit em que você está agora.</li>
<li><strong>Merge</strong>: junta o histórico de uma branch em outra. <strong>Conflito</strong> acontece quando as duas mudaram as mesmas linhas de formas diferentes.</li>
</ul>
<p>Comandos com remoto:</p>
<ul>
<li><code>git clone</code>: copia um repositório remoto inteiro, com histórico, para a sua máquina.</li>
<li><code>git fetch</code>: baixa novidades do remoto <em>sem</em> integrar na sua branch.</li>
<li><code>git pull</code>: <code>fetch</code> + integra (merge) na branch atual.</li>
<li><code>git push</code>: envia seus commits locais para o remoto.</li>
</ul>`,
        },
        {
          title: "Git × GitHub e tipos de conta",
          html: `
<p><strong>Git</strong> é a ferramenta de versionamento e roda localmente. <strong>GitHub</strong> é a plataforma que hospeda repositórios Git e adiciona colaboração: issues, pull requests, Actions, Projects, Copilot, Codespaces.</p>
<p>Tipos de conta:</p>
<ul>
<li><strong>Conta pessoal</strong>: a sua identidade. Planos Free e Pro.</li>
<li><strong>Organização</strong>: conta compartilhada onde pessoas colaboram em vários repositórios ao mesmo tempo, com <strong>times</strong> e permissões finas. Planos Free e Team.</li>
<li><strong>Enterprise</strong>: fica acima das organizações. Agrupa várias delas e centraliza políticas, segurança e cobrança.
  <ul><li><strong>GitHub Enterprise Cloud</strong>: hospedado pelo GitHub.</li>
  <li><strong>GitHub Enterprise Server</strong>: instalado na infraestrutura da própria empresa (self-hosted).</li></ul></li>
</ul>`,
        },
        {
          title: "GitHub Flow",
          html: `
<p>Fluxo leve baseado em branches. A <code>main</code> fica sempre pronta para deploy.</p>
<ol>
<li><strong>Criar uma branch</strong> a partir da <code>main</code>, com nome descritivo.</li>
<li><strong>Fazer commits</strong> pequenos e com mensagens claras.</li>
<li><strong>Abrir um pull request</strong> para pedir revisão.</li>
<li><strong>Revisar e discutir</strong>: comentários, ajustes, checks de CI.</li>
<li><strong>Fazer o merge</strong> na <code>main</code>.</li>
<li><strong>Apagar a branch</strong>.</li>
</ol>`,
        },
        {
          title: "Markdown no GitHub",
          html: `
<p>Issues, PRs, discussions, README e comentários aceitam Markdown (GitHub Flavored Markdown).</p>
<table>
<tr><th>Quer</th><th>Escreve</th></tr>
<tr><td>Título</td><td><code># Título</code>, <code>## Subtítulo</code></td></tr>
<tr><td>Negrito / itálico</td><td><code>**negrito**</code> / <code>_itálico_</code></td></tr>
<tr><td>Link</td><td><code>[texto](https://url)</code></td></tr>
<tr><td>Imagem</td><td><code>![alt](url.png)</code></td></tr>
<tr><td>Código</td><td><code>&#96;inline&#96;</code> ou bloco com três crases</td></tr>
<tr><td>Lista de tarefas</td><td><code>- [ ] a fazer</code> / <code>- [x] feito</code></td></tr>
<tr><td>Mencionar pessoa</td><td><code>@usuario</code> ou <code>@org/time</code></td></tr>
<tr><td>Referenciar issue/PR</td><td><code>#42</code></td></tr>
<tr><td>Citação</td><td><code>&gt; texto</code></td></tr>
</table>`,
        },
        {
          title: "GitHub Desktop e GitHub Mobile",
          html: `
<ul>
<li><strong>GitHub Desktop</strong>: app gráfico (Windows/macOS) para trabalhar com Git <em>localmente</em> sem linha de comando, com clone, commit, branch, push, pull e resolução de conflitos.</li>
<li><strong>GitHub Mobile</strong>: app de celular para acompanhar o trabalho em movimento: triagem de notificações, ler e responder issues, revisar e fazer merge de PRs. Também serve como método de 2FA.</li>
</ul>
<p>Regra rápida: <strong>mexer em arquivos locais → Desktop</strong>, <strong>acompanhar e revisar fora do computador → Mobile</strong>.</p>`,
        },
      ],
      questions: [
        { id: "w1-git-vs-github", q: "Qual frase descreve corretamente a diferença entre Git e GitHub?", opts: ["Git é a versão paga do GitHub.", "Git é um sistema de controle de versão distribuído; GitHub é uma plataforma que hospeda repositórios Git e adiciona ferramentas de colaboração.", "GitHub é o sistema de controle de versão; Git é a interface web dele.", "Git só funciona conectado à internet; GitHub funciona offline."], a: 1, exp: "Git roda localmente e não precisa de servidor. GitHub hospeda repositórios Git e soma PRs, issues, Actions etc." },
        { id: "w1-flow", q: "Qual é a ordem correta do GitHub Flow?", opts: ["Commit na main → abrir issue → merge → criar branch", "Criar branch → commits → abrir PR → revisar e discutir → merge → apagar branch", "Fork → tag → release → abrir PR", "Abrir PR → criar branch → merge → commits"], a: 1, exp: "No GitHub Flow, a main fica sempre deployável; o trabalho acontece em branches curtas e entra por PR revisado." },
        { id: "w1-md-checkbox", q: "Num issue, você quer uma lista de tarefas com checkbox. Qual Markdown usar?", opts: ["* (x) Tarefa", "[check] Tarefa", "- [ ] Tarefa", "## [ ] Tarefa"], a: 2, exp: "Checkbox = hífen + espaço + [ ]. Marcado: - [x]. ## cria um heading." },
        { id: "w1-enterprise", q: "Uma empresa quer agrupar várias organizações e aplicar políticas centralizadas (segurança, cobrança). Qual tipo de conta?", opts: ["Conta pessoal com GitHub Pro", "Organização no plano Free", "Conta enterprise", "Um time dentro de uma organização"], a: 2, exp: "Hierarquia: pessoal → organização → enterprise. A enterprise agrupa organizações e centraliza políticas." },
        { id: "w1-desktop", q: "Alguém quer fazer commit, criar branch e push num repositório clonado no notebook, sem linha de comando. Qual ferramenta?", opts: ["GitHub Mobile", "GitHub Desktop", "GitHub Pages", "GitHub Gist"], a: 1, exp: "GitHub Desktop é o app gráfico para operações Git locais. Mobile é para acompanhar e revisar pelo celular." },
        { id: "w1-commit", q: "O que melhor define um commit?", opts: ["Uma cópia do repositório em outra conta", "Um snapshot das mudanças com identificador único (SHA), autor e mensagem", "Um comentário dentro de um pull request", "Um arquivo de configuração do Git"], a: 1, exp: "Commit = snapshot identificado por hash SHA, com autor, data e mensagem." },
        { id: "w1-branch", q: "O que é uma branch no Git?", opts: ["Uma cópia completa do repositório em outro servidor", "Um ponteiro móvel para um commit, que permite uma linha de desenvolvimento paralela", "Uma tag de versão imutável", "Um backup automático da main"], a: 1, exp: "Branch é só um ponteiro leve para um commit. Por isso criar branch é barato." },
        { id: "w1-distributed", q: "Qual é uma vantagem de um sistema de controle de versão distribuído como o Git?", opts: ["Exige servidor central sempre online", "Cada clone tem o histórico completo, permitindo trabalhar offline", "Só permite um desenvolvedor por vez", "Não guarda histórico de autores"], a: 1, exp: "No Git, cada clone é um repositório completo. Commit, log e branch funcionam sem rede." },
        { id: "w1-clone", q: "O que faz o comando git clone?", opts: ["Cria um fork no GitHub", "Copia um repositório remoto para a máquina local, incluindo o histórico completo", "Envia commits locais ao remoto", "Cria uma nova branch"], a: 1, exp: "clone baixa o repositório inteiro e configura o remoto 'origin'. Fork é uma cópia no lado do GitHub." },
        { id: "w1-push", q: "Qual comando envia seus commits locais para o repositório remoto?", opts: ["git fetch", "git pull", "git push", "git commit"], a: 2, exp: "push envia; fetch/pull trazem; commit grava localmente." },
        { id: "w1-fetch-pull", q: "Qual a diferença entre git fetch e git pull?", opts: ["Não há diferença", "fetch baixa as novidades sem integrar; pull baixa e integra na branch atual", "fetch envia commits; pull recebe", "pull só funciona no GitHub Desktop"], a: 1, exp: "pull = fetch + merge (ou rebase) na branch atual." },
        { id: "w1-ref-issue", q: "Num comentário, como criar um link automático para o issue número 42 do mesmo repositório?", opts: ["@42", "#42", "!42", "issue:42"], a: 1, exp: "#número referencia issue/PR. @ menciona pessoas ou times." },
        { id: "w1-mobile", q: "Para qual tarefa o GitHub Mobile é mais indicado?", opts: ["Rodar testes de integração localmente", "Fazer triagem de notificações e revisar/mergear PRs fora do computador", "Hospedar um site estático", "Editar o devcontainer.json"], a: 1, exp: "Mobile = acompanhar trabalho em movimento: notificações, issues, revisões e merges." },
        { id: "w1-org", q: "Qual é o principal benefício de uma organização em relação a uma conta pessoal?", opts: ["Commits mais rápidos", "Propriedade compartilhada de repositórios, com times e permissões granulares", "Repositórios privados ilimitados só em organizações", "Uso offline do GitHub"], a: 1, exp: "Organizações permitem colaboração em escala com times, papéis e permissões." },
        { id: "w1-ghes", q: "O que é o GitHub Enterprise Server?", opts: ["Versão do GitHub instalada na infraestrutura da própria empresa", "Plano gratuito para estudantes", "Um runner do GitHub Actions", "Outro nome para GitHub Pages"], a: 0, exp: "Enterprise Server é self-hosted; Enterprise Cloud é hospedado pelo GitHub." },
        { id: "w1-conflict", q: "Quando ocorre um conflito de merge?", opts: ["Quando duas branches mudam as mesmas linhas de um arquivo de formas diferentes", "Sempre que se faz merge", "Quando o repositório é privado", "Quando há mais de 10 commits"], a: 0, exp: "O Git junta mudanças em linhas diferentes sozinho; mesma linha alterada nos dois lados exige resolução manual." },
      ],
      missions: [
        { id: "m1-1", text: "Criar o repositório gh900-dojo com README em Markdown (título, lista, tabela, bloco de código e checklist)" },
        { id: "m1-2", text: "Fazer o GitHub Flow completo: branch → commit → PR → review → merge → apagar branch" },
        { id: "m1-3", text: "Abrir o repositório no GitHub Desktop e comentar um PR pelo GitHub Mobile" },
      ],
    },

    // ─────────────────────────────────────────────────────────────── 2
    {
      id: "w2",
      icon: "🌲",
      name: "Floresta dos Repositórios",
      domain: "Work with GitHub repositories",
      weight: "10–15%",
      bossXp: 150,
      color: "#56d364",
      sections: [
        {
          title: "Arquivos-chave de um repositório",
          html: `
<table>
<tr><th>Arquivo</th><th>Para quê</th></tr>
<tr><td><code>README.md</code></td><td>Cartão de visita: o que é, como instalar, como usar. Aparece na página inicial do repositório.</td></tr>
<tr><td><code>LICENSE</code></td><td>Diz o que outros podem fazer com o código. <strong>Sem licença</strong>, vale o copyright padrão: ninguém tem permissão legal de reutilizar.</td></tr>
<tr><td><code>CONTRIBUTING.md</code></td><td>Regras para contribuir. O GitHub mostra um link quando alguém abre issue ou PR.</td></tr>
<tr><td><code>CODEOWNERS</code></td><td>Define donos de arquivos/pastas. Os donos são <strong>chamados automaticamente para revisar</strong> PRs que tocam nesses caminhos.</td></tr>
<tr><td><code>SECURITY.md</code></td><td>Como reportar vulnerabilidades de forma responsável.</td></tr>
<tr><td><code>.gitignore</code></td><td>Arquivos que o Git deve ignorar (builds, segredos locais, <code>node_modules</code>).</td></tr>
</table>
<p>CODEOWNERS pode ficar na raiz, em <code>docs/</code> ou em <code>.github/</code>.</p>`,
        },
        {
          title: "Criar e organizar repositórios",
          html: `
<ul>
<li>Ao criar, dá para já iniciar com README, <code>.gitignore</code> e licença.</li>
<li><strong>Template repository</strong>: marcado em Settings. "Use this template" cria um repositório <strong>novo, com os mesmos arquivos e pastas, mas histórico limpo</strong> e sem vínculo com o original.</li>
<li><strong>Fork</strong>: cópia ligada ao original, com histórico, usada para contribuir de volta via PR.</li>
<li><strong>Branch padrão</strong>: normalmente <code>main</code>. É a base dos PRs e a que aparece primeiro.</li>
<li><strong>Description e topics</strong> ajudam a encontrar o repositório.</li>
<li><strong>Archive</strong>: deixa o repositório somente leitura, sinalizando que não é mais mantido.</li>
</ul>`,
        },
        {
          title: "Gerenciar arquivos",
          html: `
<ul>
<li>Pela web: <strong>Add file → Create new file / Upload files</strong>, ou o lápis para editar. Ao salvar, você escolhe entre commitar direto na branch ou criar uma branch nova e abrir PR.</li>
<li><strong>History</strong> de um arquivo: todos os commits que o alteraram.</li>
<li><strong>Blame</strong>: mostra, linha a linha, quem mudou por último e em qual commit.</li>
<li><strong>Tags e releases</strong>: marcam versões (<code>v1.0.0</code>). Releases agregam notas e binários.</li>
</ul>`,
        },
        {
          title: "Insights, stars e feature preview",
          html: `
<p>A aba <strong>Insights</strong> dá visibilidade sobre o repositório:</p>
<ul>
<li><strong>Pulse</strong>: resumo da atividade recente (PRs mergeados, issues abertos/fechados).</li>
<li><strong>Contributors</strong>: quem contribuiu e quanto.</li>
<li><strong>Community standards</strong>: checklist de arquivos de saúde (README, LICENSE, CODE_OF_CONDUCT…).</li>
<li><strong>Traffic</strong>: visitas e clones. Só quem tem acesso de <strong>push (write)</strong> vê.</li>
<li><strong>Commits / Code frequency</strong>: ritmo de mudanças.</li>
<li><strong>Dependency graph</strong>: dependências (e dependentes) lidas de manifestos/lockfiles. É a base dos alertas do Dependabot.</li>
<li><strong>Network / Forks</strong>: branches e forks.</li>
</ul>
<p><strong>Stars</strong>: favoritar e demonstrar apreço. Ajudam na descoberta e podem ser organizadas em <em>Lists</em>. Star <em>não</em> liga notificações; quem faz isso é o <em>Watch</em>.</p>
<p><strong>Feature preview</strong>: no menu do avatar, liga e desliga recursos em beta.</p>`,
        },
        {
          title: "Boas práticas de manutenção",
          html: `
<ul>
<li>README claro e licença definida desde o começo.</li>
<li>Proteger a <code>main</code> e exigir PR revisado.</li>
<li>PRs pequenos e commits com mensagens úteis.</li>
<li>Templates de issue e PR para padronizar a entrada.</li>
<li>Topics e description preenchidos.</li>
<li>Arquivar o que não é mais mantido em vez de deixar abandonado.</li>
</ul>`,
        },
      ],
      questions: [
        { id: "w2-codeowners", q: "Qual é a função do arquivo CODEOWNERS?", opts: ["Listar quem pode fazer fork", "Solicitar revisão automaticamente dos donos dos arquivos alterados num PR", "Definir a licença do projeto", "Bloquear o repositório para leitura"], a: 1, exp: "CODEOWNERS mapeia caminhos para pessoas/times, que são chamados automaticamente como revisores." },
        { id: "w2-codeowners-loc", q: "Onde o arquivo CODEOWNERS pode ser colocado?", opts: ["Somente na raiz", "Na raiz, em docs/ ou em .github/", "Somente em .git/", "Em qualquer pasta, sem restrição"], a: 1, exp: "GitHub procura CODEOWNERS em .github/, na raiz e em docs/." },
        { id: "w2-security", q: "Para que serve o SECURITY.md?", opts: ["Guardar senhas do projeto", "Explicar como reportar vulnerabilidades de segurança", "Ativar o 2FA dos colaboradores", "Configurar o secret scanning"], a: 1, exp: "SECURITY.md é a política de segurança: como reportar falhas de forma responsável." },
        { id: "w2-license", q: "Um repositório público sem arquivo LICENSE significa que…", opts: ["O código é domínio público", "Vale o copyright padrão; outros não têm permissão legal para reutilizar o código", "Qualquer um pode usar comercialmente", "O GitHub aplica MIT automaticamente"], a: 1, exp: "Sem licença, nenhum direito de uso é concedido além do que os Termos do GitHub permitem (ver e fazer fork)." },
        { id: "w2-template", q: "Qual a diferença entre criar a partir de um template repository e fazer fork?", opts: ["Nenhuma", "Template cria repositório novo com os mesmos arquivos mas histórico limpo e sem vínculo; fork mantém histórico e vínculo com o original", "Fork não copia arquivos", "Template só funciona em organizações"], a: 1, exp: "Template = ponto de partida independente. Fork = cópia ligada, para contribuir de volta." },
        { id: "w2-contributing", q: "O que acontece quando um repositório tem CONTRIBUTING.md?", opts: ["PRs são bloqueados", "O GitHub exibe um link para as diretrizes quando alguém abre issue ou PR", "O repositório vira template", "Ativa o Dependabot"], a: 1, exp: "O GitHub destaca as diretrizes de contribuição para quem está participando." },
        { id: "w2-star", q: "O que acontece quando você dá star num repositório?", opts: ["Passa a receber todas as notificações dele", "Favorita o repositório e demonstra apreço; ajuda na descoberta", "Ganha acesso de escrita", "Cria um fork"], a: 1, exp: "Star = favorito + reconhecimento. Notificações são controladas por Watch." },
        { id: "w2-pulse", q: "Qual tela de Insights mostra um resumo da atividade recente (PRs mergeados, issues abertos e fechados)?", opts: ["Traffic", "Pulse", "Network", "Dependency graph"], a: 1, exp: "Pulse resume a atividade de um período." },
        { id: "w2-traffic", q: "Quem pode ver o gráfico de Traffic (visitas e clones) de um repositório?", opts: ["Qualquer visitante", "Quem tem acesso de push (write) ao repositório", "Só o dono da conta", "Só quem deu star"], a: 1, exp: "Traffic é visível para quem tem acesso de push." },
        { id: "w2-depgraph", q: "O que o Dependency graph mostra?", opts: ["Quem contribuiu mais", "As dependências do projeto (e dependentes), a partir de manifestos e lockfiles", "O histórico de deploys", "Os forks do repositório"], a: 1, exp: "O dependency graph lê manifestos/lockfiles e é a base dos alertas do Dependabot." },
        { id: "w2-preview", q: "Para que serve o Feature preview no GitHub?", opts: ["Ver o site do GitHub Pages antes de publicar", "Ativar ou desativar recursos em beta na sua conta", "Pré-visualizar Markdown", "Testar workflows sem rodar"], a: 1, exp: "Feature preview (menu do avatar) liga e desliga recursos beta." },
        { id: "w2-gitignore", q: "Para que serve o .gitignore?", opts: ["Esconder o repositório da busca", "Indicar arquivos não rastreados que o Git deve ignorar", "Bloquear pushes de certos usuários", "Listar dependências"], a: 1, exp: ".gitignore evita commitar builds, dependências e arquivos locais." },
        { id: "w2-archive", q: "O que acontece ao arquivar (archive) um repositório?", opts: ["Ele é apagado após 30 dias", "Fica somente leitura, sinalizando que não é mais mantido", "Vira privado", "Os forks são removidos"], a: 1, exp: "Archive deixa o repositório read-only, e é reversível." },
        { id: "w2-blame", q: "Qual visão mostra quem alterou por último cada linha de um arquivo e em qual commit?", opts: ["History", "Blame", "Pulse", "Compare"], a: 1, exp: "Blame anota cada linha com o último commit/autor." },
      ],
      missions: [
        { id: "m2-1", text: "Adicionar LICENSE, CONTRIBUTING.md, SECURITY.md e .github/CODEOWNERS no gh900-dojo" },
        { id: "m2-2", text: "Marcar o repositório como template e criar um repositório novo a partir dele" },
        { id: "m2-3", text: "Explorar a aba Insights (Pulse, Contributors, Community standards, Dependency graph)" },
      ],
    },

    // ─────────────────────────────────────────────────────────────── 3
    {
      id: "w3",
      icon: "🏛️",
      name: "Praça da Colaboração",
      domain: "Collaborate using GitHub",
      weight: "10–15%",
      bossXp: 150,
      color: "#58a6ff",
      sections: [
        {
          title: "Issues",
          html: `
<p>Issues registram bugs, tarefas e ideias. Cada issue pode ter:</p>
<ul>
<li><strong>Assignees</strong>: quem vai resolver.</li>
<li><strong>Labels</strong>: categorias (<code>bug</code>, <code>enhancement</code>, <code>good first issue</code>…).</li>
<li><strong>Milestone</strong>: agrupa por entrega/data.</li>
<li><strong>Templates</strong>: em <code>.github/ISSUE_TEMPLATE/</code>. Podem ser Markdown ou <em>issue forms</em> em YAML, com campos.</li>
</ul>
<p><strong>Filtros</strong> úteis na barra de busca:</p>
<ul>
<li><code>is:issue is:open assignee:@me</code>: issues abertos atribuídos a você.</li>
<li><code>is:pr is:open review-requested:@me</code>: PRs esperando sua revisão.</li>
<li><code>label:bug no:assignee</code>: bugs sem dono.</li>
</ul>`,
        },
        {
          title: "Pull requests",
          html: `
<ul>
<li><strong>Draft PR</strong>: sinaliza "ainda não está pronto". Não pode ser mergeado até virar "Ready for review".</li>
<li><strong>Revisão</strong>: três tipos de resposta: <strong>Comment</strong>, <strong>Approve</strong> e <strong>Request changes</strong>.</li>
<li><strong>Suggested changes</strong>: o revisor propõe a alteração exata no código, e o autor aplica com um clique (vira commit).</li>
<li><strong>Template de PR</strong>: <code>.github/pull_request_template.md</code>.</li>
</ul>
<p><strong>Métodos de merge:</strong></p>
<ul>
<li><strong>Create a merge commit</strong>: mantém todos os commits e cria um commit de merge.</li>
<li><strong>Squash and merge</strong>: junta todos os commits do PR em <strong>um</strong> commit.</li>
<li><strong>Rebase and merge</strong>: reaplica os commits um a um, sem commit de merge (histórico linear).</li>
</ul>
<p><strong>Ligar PR a issue:</strong> palavras-chave na descrição (<code>close</code>, <code>closes</code>, <code>closed</code>, <code>fix</code>, <code>fixes</code>, <code>fixed</code>, <code>resolve</code>, <code>resolves</code>, <code>resolved</code>) + <code>#número</code>. Ex.: <code>Fixes #12</code>. O issue fecha quando o PR é mergeado na <strong>branch padrão</strong>. Também dá para ligar manualmente pela barra lateral (Development).</p>`,
        },
        {
          title: "Discussions",
          html: `
<p><strong>Discussions</strong> é o fórum do repositório (ou da organização), para conversas que <em>não</em> são trabalho rastreável:</p>
<ul>
<li>Categorias: Announcements, Q&amp;A, Ideas, General, Polls, Show and tell.</li>
<li>Em categorias no formato <strong>Q&amp;A</strong>, dá para <strong>marcar uma resposta como solução</strong>.</li>
<li>Um issue pode ser <strong>convertido</strong> em discussion (e vice-versa, criando um issue a partir dela).</li>
</ul>
<p>Regra: <strong>trabalho a fazer → issue</strong>; <strong>pergunta, ideia aberta, anúncio → discussion</strong>.</p>`,
        },
        {
          title: "Notificações",
          html: `
<p>Configurações de <strong>Watch</strong> por repositório:</p>
<ul>
<li><strong>Participating and @mentions</strong>: só quando você participa ou é mencionado (padrão).</li>
<li><strong>All Activity</strong>: tudo do repositório.</li>
<li><strong>Custom</strong>: escolhe tipos (issues, PRs, releases, discussions, security alerts).</li>
<li><strong>Ignore</strong>: nunca notifica, nem com menção.</li>
</ul>
<p>A <strong>caixa de entrada</strong> (github.com/notifications) tem filtros por motivo (<code>reason:review-requested</code>, <code>reason:mention</code>), permite marcar como feito, salvar e cancelar inscrição. Dá para receber por web, e-mail e GitHub Mobile.</p>`,
        },
        {
          title: "Gists, Wikis e GitHub Pages",
          html: `
<ul>
<li><strong>Gist</strong>: compartilha trechos de código ou notas. Cada gist é um repositório Git (dá para clonar e fazer fork).
  <ul><li><strong>Público</strong>: aparece na busca/Discover.</li>
  <li><strong>Secreto</strong>: não aparece na busca, mas <strong>qualquer pessoa com a URL acessa</strong>. Não é privado.</li></ul></li>
<li><strong>Wiki</strong>: páginas de documentação do repositório, guardadas num repositório Git separado (<code>repo.wiki.git</code>).</li>
<li><strong>GitHub Pages</strong>: hospeda <strong>sites estáticos</strong> a partir de um repositório (branch, pasta <code>/docs</code> ou via Actions). Site de usuário: <code>usuario.github.io</code>.</li>
</ul>`,
        },
      ],
      questions: [
        { id: "w3-closes", q: "Como fazer um issue fechar automaticamente quando um PR for mergeado?", opts: ["Adicionar a label 'done' no issue", "Escrever 'Fixes #12' na descrição do PR que será mergeado na branch padrão", "Mencionar @issue12 no commit", "Atribuir o PR ao autor do issue"], a: 1, exp: "Palavras-chave (close/fix/resolve e variações) + #número fecham o issue no merge para a branch padrão." },
        { id: "w3-discussion", q: "Um usuário quer fazer uma pergunta aberta à comunidade do projeto, sem ser bug nem tarefa. Onde?", opts: ["Issue", "Discussion", "Pull request", "Wiki"], a: 1, exp: "Discussions são para perguntas, ideias e anúncios; issues são trabalho rastreável." },
        { id: "w3-review", q: "Quais são as três opções ao enviar uma revisão de PR?", opts: ["Accept, Reject, Skip", "Comment, Approve, Request changes", "Merge, Close, Reopen", "Like, Dislike, Comment"], a: 1, exp: "Review: Comment (só comentar), Approve (aprovar) ou Request changes (pedir mudanças)." },
        { id: "w3-squash", q: "O que faz o 'Squash and merge'?", opts: ["Apaga o PR", "Combina todos os commits do PR num único commit na branch base", "Reaplica cada commit sem commit de merge", "Cria um commit de merge mantendo todos os commits"], a: 1, exp: "Squash junta tudo em um commit. Rebase and merge reaplica um a um. Merge commit mantém tudo + commit de merge." },
        { id: "w3-draft", q: "O que caracteriza um draft pull request?", opts: ["Já foi aprovado", "Sinaliza que ainda não está pronto e não pode ser mergeado até ser marcado como pronto", "Não aparece para ninguém", "É apagado em 7 dias"], a: 1, exp: "Draft = trabalho em andamento; precisa ir para 'Ready for review' antes do merge." },
        { id: "w3-issue-tpl", q: "Onde ficam os templates de issue de um repositório?", opts: [".github/ISSUE_TEMPLATE/", ".git/templates/", "docs/issues/", "Settings > Templates apenas"], a: 0, exp: "Templates de issue (Markdown ou issue forms YAML) ficam em .github/ISSUE_TEMPLATE/." },
        { id: "w3-filter", q: "Qual filtro lista os issues abertos atribuídos a você?", opts: ["is:issue is:open assignee:@me", "type:issue owner:me", "issues:mine open:true", "is:pr author:@me"], a: 0, exp: "is:issue + is:open + assignee:@me." },
        { id: "w3-gist", q: "Sobre um gist secreto, é correto afirmar que…", opts: ["Só o dono consegue abrir", "Não aparece na busca, mas qualquer pessoa com a URL consegue acessar", "Fica criptografado", "Exige 2FA para abrir"], a: 1, exp: "Gist secreto não é privado: só não é listado. Quem tem o link vê." },
        { id: "w3-pages", q: "Para que serve o GitHub Pages?", opts: ["Hospedar sites estáticos a partir de um repositório", "Rodar back-ends com banco de dados", "Gerenciar issues", "Executar pipelines de CI"], a: 0, exp: "Pages publica HTML/CSS/JS estático (com Jekyll opcional) a partir de branch, /docs ou Actions." },
        { id: "w3-wiki", q: "Como o conteúdo da Wiki de um repositório é armazenado?", opts: ["Num banco de dados fora do Git", "Num repositório Git separado, ligado ao repositório principal", "Na pasta docs/ da main", "Em gists"], a: 1, exp: "A wiki é um repositório Git próprio (repo.wiki.git), que pode ser clonado." },
        { id: "w3-watch", q: "Com Watch em 'Participating and @mentions', você recebe notificações quando…", opts: ["Qualquer coisa acontece no repositório", "Você participa da conversa ou é mencionado", "Nunca", "Só em releases"], a: 1, exp: "É o padrão: participação e menções. All Activity = tudo; Ignore = nada." },
        { id: "w3-suggest", q: "O que é uma 'suggested change' numa revisão de PR?", opts: ["Um novo issue", "Uma alteração de código proposta pelo revisor que o autor pode aplicar como commit", "Um voto de aprovação", "Uma label automática"], a: 1, exp: "O revisor escreve a linha corrigida; o autor clica para commitar a sugestão." },
        { id: "w3-qa-answer", q: "Em Discussions, onde é possível marcar um comentário como resposta?", opts: ["Em qualquer categoria", "Em categorias com formato Q&A", "Só em Announcements", "Não é possível"], a: 1, exp: "Marcar resposta é recurso das categorias de formato pergunta e resposta (Q&A)." },
        { id: "w3-convert", q: "Um issue virou na verdade uma pergunta genérica. O que dá para fazer?", opts: ["Nada, só fechar", "Converter o issue em discussion", "Transformar em PR", "Mover para a Wiki"], a: 1, exp: "Issues podem ser convertidos em discussions para continuar a conversa no lugar certo." },
      ],
      missions: [
        { id: "m3-1", text: "Criar um issue template e um pull request template em .github/" },
        { id: "m3-2", text: "Abrir um PR com 'Closes #1' na descrição e ver o issue fechar no merge" },
        { id: "m3-3", text: "Habilitar Discussions, criar um Gist e publicar uma página no GitHub Pages" },
        { id: "m3-4", text: "Configurar um Watch personalizado (Custom) em um repositório" },
      ],
    },

    // ─────────────────────────────────────────────────────────────── 4
    {
      id: "w4",
      icon: "🏭",
      name: "Fábrica de Automação",
      domain: "Apply modern development practices",
      weight: "10–15%",
      bossXp: 150,
      color: "#a371f7",
      sections: [
        {
          title: "GitHub Actions",
          html: `
<p>Plataforma de automação e CI/CD integrada ao GitHub.</p>
<ul>
<li><strong>Workflow</strong>: arquivo <strong>YAML</strong> em <code>.github/workflows/</code>.</li>
<li><strong>Evento</strong> (chave <code>on:</code>): o que dispara. Ex.: <code>push</code>, <code>pull_request</code>, <code>schedule</code> (cron), <code>workflow_dispatch</code> (manual).</li>
<li><strong>Job</strong>: conjunto de steps que roda num <strong>runner</strong>. Jobs rodam em paralelo por padrão.</li>
<li><strong>Step</strong>: um comando (<code>run:</code>) ou uma action reutilizável (<code>uses: dono/action@versão</code>).</li>
<li><strong>Runner</strong>: a máquina que executa. <strong>GitHub-hosted</strong> (Ubuntu, Windows, macOS) ou <strong>self-hosted</strong> (sua máquina).</li>
<li><strong>Secrets</strong>: valores sensíveis acessados com <code>secrets.NOME</code>.</li>
<li>Actions prontas ficam no <strong>GitHub Marketplace</strong>.</li>
</ul>`,
        },
        {
          title: "GitHub Copilot",
          html: `
<ul>
<li><strong>Sugestões de código</strong> enquanto você digita, no editor.</li>
<li><strong>Copilot Chat</strong>: perguntas sobre o código, explicações, geração de testes.</li>
<li><strong>Agent mode</strong> (no IDE): recebe uma tarefa e executa vários passos sozinho: edita vários arquivos, roda comandos no terminal, olha os erros e itera até concluir.</li>
<li><strong>Copilot coding agent</strong>: você <strong>atribui um issue ao Copilot</strong>, ele trabalha em segundo plano num ambiente próprio (baseado em GitHub Actions) e <strong>abre um PR</strong> para você revisar.</li>
<li><strong>Multi-modelo</strong>: dá para escolher entre modelos de IA de diferentes fornecedores no chat.</li>
</ul>`,
        },
        {
          title: "Planos do Copilot",
          html: `
<table>
<tr><th>Plano</th><th>Para quem</th><th>Destaque</th></tr>
<tr><td><strong>Individual</strong> (Free, Pro, Pro+)</td><td>Conta pessoal</td><td>A própria pessoa gerencia as configurações e paga.</td></tr>
<tr><td><strong>Business</strong></td><td>Organizações</td><td><strong>Gestão centralizada</strong> de licenças e <strong>políticas</strong> pela organização; recursos de privacidade e proteção para empresa.</td></tr>
<tr><td><strong>Enterprise</strong></td><td>Contas enterprise</td><td>Tudo do Business + recursos avançados e cotas maiores, gerenciado no nível da enterprise.</td></tr>
</table>
<p>Pegadinha comum: "a empresa quer controlar quem usa e quais recursos" → <strong>Business</strong> ou <strong>Enterprise</strong>, nunca individual.</p>
<p style="opacity:.75">Detalhes de planos mudam com frequência. Confira em docs.github.com/copilot.</p>`,
        },
        {
          title: "Codespaces e dev containers",
          html: `
<ul>
<li><strong>GitHub Codespaces</strong>: ambiente de desenvolvimento na nuvem, um <strong>container rodando numa VM</strong>. Abre no VS Code do navegador ou no desktop.</li>
<li>Tem <strong>terminal</strong>, roda o código, faz <strong>port forwarding</strong> para testar apps web.</li>
<li>Configurado por <code>.devcontainer/devcontainer.json</code>: imagem base, features, extensões do VS Code, comandos pós-criação, portas.</li>
<li><strong>Prebuilds</strong> deixam o codespace pronto mais rápido.</li>
<li>Cobrado por uso (compute + armazenamento). Contas pessoais têm uma cota mensal gratuita.</li>
</ul>`,
        },
        {
          title: "github.dev × Codespaces",
          html: `
<ul>
<li><strong>github.dev</strong>: editor leve no navegador. Abre apertando <strong><code>.</code></strong> num repositório (ou trocando <code>.com</code> por <code>.dev</code> na URL).</li>
<li>É <strong>gratuito</strong>, mas <strong>não tem compute</strong>: sem terminal, sem rodar ou depurar código.</li>
<li>Bom para: editar arquivos, fazer commits rápidos, revisar.</li>
</ul>
<table>
<tr><th></th><th>github.dev</th><th>Codespaces</th></tr>
<tr><td>Terminal</td><td>❌</td><td>✅</td></tr>
<tr><td>Rodar/depurar</td><td>❌</td><td>✅</td></tr>
<tr><td>Custo</td><td>Grátis</td><td>Por uso (com cota grátis)</td></tr>
<tr><td>Como abrir</td><td>Tecla <code>.</code></td><td>Code → Codespaces</td></tr>
</table>`,
        },
      ],
      questions: [
        { id: "w4-wf-dir", q: "Onde ficam os arquivos de workflow do GitHub Actions?", opts: [".github/workflows/", ".actions/", "ci/workflows/", ".git/hooks/"], a: 0, exp: "Workflows ficam em .github/workflows/ na branch." },
        { id: "w4-wf-yaml", q: "Em que formato são escritos os workflows do GitHub Actions?", opts: ["JSON", "YAML", "XML", "TOML"], a: 1, exp: "Workflows são arquivos .yml/.yaml." },
        { id: "w4-on", q: "Qual chave do workflow define os eventos que o disparam?", opts: ["jobs:", "runs-on:", "on:", "steps:"], a: 2, exp: "on: define gatilhos (push, pull_request, schedule…). runs-on escolhe o runner." },
        { id: "w4-runner", q: "O que é um runner no GitHub Actions?", opts: ["Um tipo de action do Marketplace", "A máquina que executa os jobs, hospedada pelo GitHub ou self-hosted", "Um usuário com permissão de admin", "O arquivo YAML do workflow"], a: 1, exp: "Runner executa jobs: GitHub-hosted (Linux/Windows/macOS) ou self-hosted." },
        { id: "w4-uses", q: "Como reutilizar uma action pronta num step?", opts: ["run: action-name", "uses: dono/action@versão", "import: action", "action: dono/repo"], a: 1, exp: "uses: referencia uma action (ex.: actions/checkout@v4)." },
        { id: "w4-dispatch", q: "Qual evento permite disparar um workflow manualmente pela interface?", opts: ["push", "schedule", "workflow_dispatch", "pull_request"], a: 2, exp: "workflow_dispatch adiciona o botão 'Run workflow'." },
        { id: "w4-coding-agent", q: "Como funciona o Copilot coding agent?", opts: ["Completa só a linha atual no editor", "Você atribui um issue ao Copilot; ele trabalha em segundo plano e abre um PR para revisão", "Faz merge automático de todos os PRs", "Substitui o GitHub Actions"], a: 1, exp: "Coding agent: issue atribuído → trabalho autônomo em ambiente próprio → PR para revisão humana." },
        { id: "w4-agent-mode", q: "O que caracteriza o Agent mode do Copilot no IDE?", opts: ["Só responde perguntas sem editar nada", "Executa tarefas em vários passos: edita vários arquivos, roda comandos no terminal e itera até concluir", "Só funciona no GitHub Mobile", "Revisa PRs no github.com"], a: 1, exp: "Agent mode age de forma autônoma dentro do IDE, com edições multi-arquivo e comandos." },
        { id: "w4-multimodel", q: "O que significa o suporte multi-modelo do Copilot?", opts: ["Gerar código em várias linguagens", "Poder escolher entre diferentes modelos de IA para o chat", "Rodar em vários sistemas operacionais", "Ter várias licenças por usuário"], a: 1, exp: "Multi-modelo = escolher o modelo de IA (de diferentes fornecedores) usado nas respostas." },
        { id: "w4-business", q: "Uma organização quer gerenciar centralmente licenças e políticas do Copilot para os membros. Qual plano?", opts: ["Copilot Free", "Copilot Pro individual", "Copilot Business", "Nenhum, isso não existe"], a: 2, exp: "Business é para organizações, com gestão central de licenças e políticas. Enterprise faz o mesmo no nível da enterprise." },
        { id: "w4-devcontainer", q: "Qual arquivo configura o ambiente de um Codespace?", opts: [".github/codespace.yml", ".devcontainer/devcontainer.json", "Dockerfile na raiz, obrigatoriamente", ".vscode/settings.json"], a: 1, exp: "devcontainer.json define imagem, extensões, features, portas e comandos." },
        { id: "w4-dev-vs-cs", q: "Qual a principal diferença entre github.dev e Codespaces?", opts: ["github.dev é pago e Codespaces é grátis", "github.dev é um editor leve sem terminal nem execução de código; Codespaces tem uma VM com terminal", "Não há diferença", "Codespaces só abre arquivos Markdown"], a: 1, exp: "github.dev não tem compute. Precisa rodar ou depurar? Use Codespaces." },
        { id: "w4-dot", q: "Qual atalho abre o editor github.dev a partir de um repositório?", opts: ["Ctrl+K", "Tecla . (ponto)", "Tecla ?", "Shift+D"], a: 1, exp: "Apertar '.' abre github.dev; também dá para trocar .com por .dev na URL." },
        { id: "w4-cs-where", q: "Onde um Codespace executa?", opts: ["No navegador, sem servidor", "Num container numa VM na nuvem", "No runner self-hosted da empresa, obrigatoriamente", "No GitHub Pages"], a: 1, exp: "Cada codespace é um container numa VM hospedada pelo GitHub." },
      ],
      missions: [
        { id: "m4-1", text: "Criar .github/workflows/ci.yml que roda em push e imprime algo" },
        { id: "m4-2", text: "Abrir o gh900-dojo num Codespace e adicionar .devcontainer/devcontainer.json" },
        { id: "m4-3", text: "Apertar '.' para abrir o github.dev e anotar o que ele não faz" },
        { id: "m4-4", text: "Montar uma tabela Copilot Individual × Business × Enterprise a partir da docs oficial" },
      ],
    },

    // ─────────────────────────────────────────────────────────────── 5
    {
      id: "w5",
      icon: "📋",
      name: "Quadro do Projeto",
      domain: "Manage projects with GitHub",
      weight: "5–10%",
      bossXp: 100,
      color: "#d29922",
      sections: [
        {
          title: "GitHub Projects",
          html: `
<p><strong>Projects</strong> é a ferramenta de planejamento do GitHub, uma planilha integrada a issues e PRs.</p>
<ul>
<li>Pertence a um <strong>usuário ou organização</strong> e pode reunir itens de <strong>vários repositórios</strong>.</li>
<li>Itens: issues, PRs e <strong>draft issues</strong> (rascunhos que só existem no projeto até serem convertidos em issue).</li>
<li>Mudanças no issue (status, assignee, label) refletem no projeto e vice-versa.</li>
</ul>`,
        },
        {
          title: "Layouts e views",
          html: `
<ul>
<li><strong>Table</strong>: planilha com colunas de campos.</li>
<li><strong>Board</strong>: kanban, colunas por um campo (ex.: Status).</li>
<li><strong>Roadmap</strong>: linha do tempo baseada em campos de <strong>data</strong> ou <strong>iteration</strong>.</li>
</ul>
<p>Cada <strong>view</strong> salva layout, filtro, agrupamento (group by), ordenação e <em>slice by</em>. Um projeto pode ter várias views.</p>`,
        },
        {
          title: "Campos, labels e milestones",
          html: `
<ul>
<li><strong>Campos customizados</strong>: texto, número, data, single select e <strong>iteration</strong> (ciclos de tempo, tipo sprints).</li>
<li><strong>Labels</strong>: categorizam issues e PRs. Padrões: <code>bug</code>, <code>documentation</code>, <code>duplicate</code>, <code>enhancement</code>, <code>good first issue</code>, <code>help wanted</code>, <code>invalid</code>, <code>question</code>, <code>wontfix</code>.</li>
<li><strong>Milestones</strong>: agrupam issues e PRs com uma <strong>data de entrega</strong> e mostram o <strong>percentual de progresso</strong>.</li>
<li><strong>Assignees</strong>: até 10 pessoas por issue ou PR.</li>
</ul>`,
        },
        {
          title: "Workflows, saved replies e insights",
          html: `
<ul>
<li><strong>Workflows embutidos</strong> do Projects automatizam o quadro, por exemplo:
  <ul><li>item fechado → Status = Done;</li>
  <li>PR mergeado → Status = Done;</li>
  <li><strong>auto-add</strong>: itens de um repositório que batem um filtro entram sozinhos;</li>
  <li><strong>auto-archive</strong> de itens antigos.</li></ul>
  Para mais automação: GitHub Actions + API.</li>
<li><strong>Saved replies</strong>: respostas prontas e reutilizáveis em comentários de issue e PR, configuradas em Settings da sua conta.</li>
<li><strong>Insights</strong> do projeto: gráficos de estado atual e <strong>históricos</strong> (ex.: burn up) para acompanhar progresso.</li>
</ul>`,
        },
      ],
      questions: [
        { id: "w5-layouts", q: "Quais são os layouts disponíveis numa view do GitHub Projects?", opts: ["List, Grid, Gallery", "Table, Board, Roadmap", "Kanban, Gantt, Calendar", "Sheet, Card, Chart"], a: 1, exp: "Table, Board e Roadmap." },
        { id: "w5-roadmap", q: "O layout Roadmap organiza os itens com base em…", opts: ["Número de comentários", "Campos de data ou iteration, numa linha do tempo", "Ordem alfabética", "Quantidade de labels"], a: 1, exp: "Roadmap = timeline usando campos de data/iteration." },
        { id: "w5-draft", q: "O que é um draft issue num Project?", opts: ["Um issue fechado", "Um item que existe só no projeto até ser convertido em issue de um repositório", "Um PR em rascunho", "Um template de issue"], a: 1, exp: "Draft issues são rascunhos rápidos dentro do projeto; podem virar issue depois." },
        { id: "w5-iteration", q: "Para que serve um campo do tipo iteration?", opts: ["Contar commits", "Planejar trabalho em ciclos de tempo, como sprints", "Definir o assignee", "Fechar issues automaticamente"], a: 1, exp: "Iteration define blocos de tempo com início e duração." },
        { id: "w5-milestone", q: "O que um milestone oferece?", opts: ["Um repositório novo", "Agrupa issues e PRs com data de entrega e mostra percentual de progresso", "Um runner dedicado", "Uma regra de proteção de branch"], a: 1, exp: "Milestone = meta com data + barra de progresso de itens fechados." },
        { id: "w5-workflow", q: "Qual é um exemplo de workflow embutido do GitHub Projects?", opts: ["Rodar testes a cada push", "Quando um item é fechado, mudar o Status para Done", "Publicar o site no Pages", "Rotacionar secrets"], a: 1, exp: "Workflows embutidos ajustam campos e adicionam/arquivam itens automaticamente." },
        { id: "w5-saved", q: "O que são saved replies?", opts: ["Backups de issues", "Respostas prontas reutilizáveis em comentários de issues e PRs", "Respostas automáticas por e-mail", "Comentários fixados"], a: 1, exp: "Saved replies agilizam respostas repetidas e ficam nas configurações da sua conta." },
        { id: "w5-insights", q: "Para que servem os insights de um Project?", opts: ["Ver tráfego do repositório", "Gráficos do estado atual e históricos para acompanhar o progresso", "Auditar logins", "Ver dependências"], a: 1, exp: "Project insights = charts configuráveis, incluindo históricos como burn up." },
        { id: "w5-multi", q: "Um Project de organização pode incluir itens de quantos repositórios?", opts: ["Só um", "Vários repositórios", "Só repositórios públicos", "No máximo dois"], a: 1, exp: "Projects reúnem issues e PRs de vários repositórios." },
        { id: "w5-assignees", q: "Quantas pessoas podem ser atribuídas (assignees) a um mesmo issue?", opts: ["1", "Até 10", "Até 3", "Ilimitado"], a: 1, exp: "Issues e PRs aceitam até 10 assignees." },
        { id: "w5-label", q: "Qual label padrão sinaliza um issue bom para quem está começando no projeto?", opts: ["help wanted", "good first issue", "enhancement", "question"], a: 1, exp: "'good first issue' destaca tarefas amigáveis para iniciantes." },
      ],
      missions: [
        { id: "m5-1", text: "Criar um Project com views Table, Board e Roadmap" },
        { id: "m5-2", text: "Criar labels, um milestone e um campo iteration; ativar um workflow embutido" },
        { id: "m5-3", text: "Criar uma saved reply e usá-la num comentário" },
      ],
    },

    // ─────────────────────────────────────────────────────────────── 6
    {
      id: "w6",
      icon: "🏰",
      name: "Fortaleza da Segurança",
      domain: "Understand privacy, security, and administration",
      weight: "10–15%",
      bossXp: 150,
      color: "#f85149",
      sections: [
        {
          title: "Segurança da conta: 2FA e passkeys",
          html: `
<ul>
<li><strong>2FA</strong> (autenticação em dois fatores): app TOTP (autenticador), chave de segurança física, GitHub Mobile e SMS em alguns países.</li>
<li>O GitHub exige 2FA de quem contribui código no github.com.</li>
<li><strong>Recovery codes</strong>: códigos de recuperação para voltar à conta se perder o dispositivo de 2FA. Guarde em local seguro.</li>
<li><strong>Passkeys</strong>: login <strong>sem senha</strong>, resistente a phishing, usando biometria/PIN do dispositivo. Uma passkey cobre senha + 2FA de uma vez.</li>
</ul>`,
        },
        {
          title: "Papéis em repositórios",
          html: `
<table>
<tr><th>Papel</th><th>Pode</th></tr>
<tr><td><strong>Read</strong></td><td>Ver e clonar, abrir issues e comentar.</td></tr>
<tr><td><strong>Triage</strong></td><td>Gerenciar issues e PRs (labels, assignees, fechar) <strong>sem</strong> acesso de escrita no código.</td></tr>
<tr><td><strong>Write</strong></td><td>Fazer push, gerenciar branches, mergear PRs.</td></tr>
<tr><td><strong>Maintain</strong></td><td>Gerenciar o repositório <strong>sem</strong> ações sensíveis/destrutivas (não apaga, não transfere).</td></tr>
<tr><td><strong>Admin</strong></td><td>Acesso total, incluindo configurações, segurança e exclusão.</td></tr>
</table>
<p>Princípio do <strong>menor privilégio</strong>: dê o menor papel que resolve.</p>`,
        },
        {
          title: "Organização: papéis e times",
          html: `
<ul>
<li><strong>Owner</strong>: controle total da organização (configurações, cobrança, membros).</li>
<li><strong>Member</strong>: membro padrão; recebe a <strong>permissão base</strong> definida pela org.</li>
<li><strong>Moderator</strong>: modera conversas (bloqueia usuários, oculta comentários).</li>
<li><strong>Billing manager</strong>: só cobrança.</li>
<li><strong>Security manager</strong>: gerencia alertas e configurações de segurança.</li>
<li><strong>Outside collaborator</strong>: <strong>não é membro</strong>, mas tem acesso a repositórios específicos.</li>
<li><strong>Teams</strong>: grupos de membros. Recebem permissões em repositórios, podem ser aninhados e mencionados com <code>@org/time</code>.</li>
</ul>`,
        },
        {
          title: "Visibilidade e proteção de branch",
          html: `
<ul>
<li><strong>Public</strong>: qualquer pessoa vê. <strong>Private</strong>: só quem tem acesso. <strong>Internal</strong>: visível para <strong>todos os membros da enterprise</strong> (só existe em enterprise).</li>
<li><strong>Branch protection rules</strong>: exigir PR antes do merge, número de aprovações, status checks passando, commits assinados, histórico linear, bloquear force push e exclusão.</li>
<li><strong>Rulesets</strong>: versão mais nova e flexível. <strong>Vários rulesets podem valer ao mesmo tempo</strong> (as regras se somam), podem ser aplicados no nível da organização e têm status de enforcement (active/disabled).</li>
<li>Recursos de segurança do repositório: <strong>Dependabot</strong> (alertas e atualizações de dependências vulneráveis), <strong>secret scanning</strong>, <strong>code scanning</strong>.</li>
</ul>`,
        },
        {
          title: "Enterprise: EMU e políticas do Copilot",
          html: `
<ul>
<li><strong>Enterprise Managed Users (EMU)</strong>: as contas dos usuários são <strong>criadas e controladas pelo provedor de identidade (IdP)</strong> da empresa (ex.: Entra ID, Okta) via SAML/OIDC + SCIM.
  <ul><li>A empresa controla nome de usuário, perfil, acesso e desativação.</li>
  <li>Usuários EMU ficam restritos à enterprise e não interagem com conteúdo público fora dela (não criam repositórios públicos nem contribuem em projetos externos).</li></ul></li>
<li><strong>Políticas de Copilot</strong>: owners da enterprise/organização decidem quem recebe licença e quais recursos ficam liberados (ex.: chat, agentes, modelos disponíveis).</li>
</ul>`,
        },
      ],
      questions: [
        { id: "w6-passkey", q: "O que é uma passkey no GitHub?", opts: ["Uma senha mais longa", "Credencial sem senha, resistente a phishing, que cobre senha e 2FA de uma vez", "Um token de API", "Um código de recuperação"], a: 1, exp: "Passkey usa biometria/PIN do dispositivo, substituindo senha + 2FA." },
        { id: "w6-recovery", q: "Para que servem os recovery codes do 2FA?", opts: ["Recuperar acesso à conta se você perder o dispositivo de 2FA", "Recuperar repositórios apagados", "Resetar o Copilot", "Desfazer um merge"], a: 0, exp: "Recovery codes são a saída de emergência quando o segundo fator some." },
        { id: "w6-triage", q: "Qual papel permite gerenciar issues e PRs (labels, assignees, fechar) sem acesso de escrita no código?", opts: ["Read", "Triage", "Write", "Maintain"], a: 1, exp: "Triage = gestão de issues/PRs sem push." },
        { id: "w6-maintain", q: "O papel Maintain permite…", opts: ["Apagar o repositório", "Gerenciar o repositório sem ações sensíveis ou destrutivas", "Só ler o código", "Gerenciar cobrança da organização"], a: 1, exp: "Maintain gerencia o dia a dia do repositório, mas não apaga nem transfere. Isso é Admin." },
        { id: "w6-least-push", q: "Qual é o menor papel que permite fazer push de código num repositório?", opts: ["Triage", "Write", "Maintain", "Admin"], a: 1, exp: "Write é o primeiro nível com push." },
        { id: "w6-internal", q: "O que significa visibilidade 'internal' num repositório?", opts: ["Só o dono vê", "Visível para todos os membros da enterprise; disponível só em contas enterprise", "Público mas sem busca", "Igual a privado"], a: 1, exp: "Internal = todo mundo da enterprise vê; ninguém de fora." },
        { id: "w6-protection", q: "Como garantir que nada entre na main sem PR aprovado por pelo menos 1 pessoa?", opts: ["Criar uma label", "Configurar uma branch protection rule (ou ruleset) exigindo PR e aprovações", "Ativar Discussions", "Arquivar o repositório"], a: 1, exp: "Branch protection/rulesets exigem PR, aprovações, checks etc." },
        { id: "w6-emu", q: "O que caracteriza Enterprise Managed Users (EMU)?", opts: ["Usuários criam contas livremente", "As contas são criadas e controladas pelo provedor de identidade da empresa", "É um tipo de runner", "É o plano gratuito de organizações"], a: 1, exp: "EMU: IdP provisiona e controla as contas (via SCIM), restritas à enterprise." },
        { id: "w6-owner", q: "Qual papel de organização tem controle total, incluindo configurações e membros?", opts: ["Member", "Moderator", "Owner", "Billing manager"], a: 2, exp: "Owner administra tudo na organização." },
        { id: "w6-outside", q: "O que é um outside collaborator?", opts: ["Um membro com papel Owner", "Alguém que não é membro da organização, mas tem acesso a repositórios específicos", "Um bot do GitHub", "Um usuário bloqueado"], a: 1, exp: "Outside collaborators acessam repositórios pontuais sem fazer parte da org." },
        { id: "w6-teams", q: "Qual é a principal utilidade dos teams numa organização?", opts: ["Hospedar sites", "Agrupar membros para dar permissões em repositórios e mencioná-los com @org/time", "Criar forks", "Rodar workflows"], a: 1, exp: "Teams simplificam permissões e comunicação em grupo." },
        { id: "w6-copilot-policy", q: "Quem define quais recursos do Copilot ficam disponíveis para os membros de uma organização com Copilot Business?", opts: ["Cada membro individualmente", "Os owners da organização (ou da enterprise), via políticas", "O GitHub Support", "Ninguém, tudo vem liberado"], a: 1, exp: "Políticas de Copilot são geridas por owners da org/enterprise." },
        { id: "w6-rulesets", q: "Uma vantagem dos rulesets em relação às branch protection rules clássicas é que…", opts: ["Só funcionam em repositórios públicos", "Vários rulesets podem valer ao mesmo tempo e podem ser aplicados no nível da organização", "Dispensam aprovações", "Apagam branches antigas"], a: 1, exp: "Rulesets se combinam e podem ser definidos para vários repositórios de uma vez." },
        { id: "w6-dependabot", q: "O que os alertas do Dependabot indicam?", opts: ["Commits sem assinatura", "Dependências do projeto com vulnerabilidades conhecidas", "Issues sem assignee", "Workflows lentos"], a: 1, exp: "Dependabot cruza o dependency graph com o banco de vulnerabilidades." },
      ],
      missions: [
        { id: "m6-1", text: "Conferir o 2FA da conta e cadastrar uma passkey" },
        { id: "m6-2", text: "Criar uma branch protection rule (ou ruleset) na main exigindo PR e 1 aprovação" },
        { id: "m6-3", text: "Criar uma organização gratuita de teste, um time e testar os papéis de repositório" },
      ],
    },

    // ─────────────────────────────────────────────────────────────── 7
    {
      id: "w7",
      icon: "🛒",
      name: "Mercado Open Source",
      domain: "Explore the GitHub community",
      weight: "5–10%",
      bossXp: 100,
      color: "#db61a2",
      sections: [
        {
          title: "Open source no GitHub",
          html: `
<ul>
<li><strong>Benefícios</strong>: transparência, colaboração global, reuso, inovação mais rápida, aprendizado e portfólio.</li>
<li><strong>Fluxo de contribuição</strong> sem acesso de escrita: <strong>fork</strong> → branch → commits → <strong>PR para o repositório original</strong>.</li>
<li>Labels <code>good first issue</code> e <code>help wanted</code> guiam novos contribuidores.</li>
<li><strong>Arquivos de saúde da comunidade</strong>: README, LICENSE, CONTRIBUTING, <strong>CODE_OF_CONDUCT</strong> (regras de convivência), SECURITY, templates.</li>
</ul>`,
        },
        {
          title: "GitHub Sponsors e Marketplace",
          html: `
<ul>
<li><strong>GitHub Sponsors</strong>: apoio financeiro (mensal ou único) a desenvolvedores e organizações que mantêm open source. O GitHub não cobra taxa sobre patrocínios feitos por contas pessoais.</li>
<li><strong>GitHub Marketplace</strong>: catálogo de <strong>Actions</strong> e <strong>Apps</strong> que estendem o GitHub (CI, qualidade de código, segurança, gestão de projetos). Há gratuitos e pagos, e criadores verificados.</li>
</ul>`,
        },
        {
          title: "Descobrir e acompanhar",
          html: `
<ul>
<li><strong>Follow</strong> num usuário ou organização: a atividade pública aparece no seu <strong>feed</strong>.</li>
<li><strong>Watch</strong> num repositório: notificações. <strong>Star</strong>: favorito e reconhecimento.</li>
<li><strong>Explore</strong>, <strong>Topics</strong>, <strong>Trending</strong> e <strong>Collections</strong> ajudam a achar projetos.</li>
<li>Para um repositório ser <strong>descobrível</strong>: público, com description, <strong>topics</strong> e um bom README.</li>
</ul>`,
        },
        {
          title: "InnerSource, forks e templates",
          html: `
<ul>
<li><strong>InnerSource</strong>: aplicar práticas de open source <strong>dentro da empresa</strong>: código visível entre times, contribuição via PR, documentação aberta. Quebra silos e evita retrabalho. Repositórios <strong>internal</strong> ajudam muito.</li>
<li><strong>Fork</strong>: quando quer contribuir num projeto em que não tem escrita, ou divergir dele mantendo vínculo.</li>
<li><strong>Template</strong>: quando quer <strong>começar um projeto novo</strong> a partir de uma base pronta, sem herdar histórico.</li>
</ul>`,
        },
      ],
      questions: [
        { id: "w7-fork", q: "Quando faz sentido fazer fork de um repositório?", opts: ["Para favoritar o projeto", "Para contribuir num projeto em que você não tem acesso de escrita, enviando PR depois", "Para receber notificações", "Para mudar a licença do original"], a: 1, exp: "Fork + PR é o fluxo clássico de contribuição open source." },
        { id: "w7-sponsors", q: "Para que serve o GitHub Sponsors?", opts: ["Comprar Actions pagas", "Apoiar financeiramente desenvolvedores e organizações que mantêm open source", "Patrocinar anúncios no GitHub", "Pagar o Copilot da equipe"], a: 1, exp: "Sponsors financia mantenedores diretamente." },
        { id: "w7-marketplace", q: "O que se encontra no GitHub Marketplace?", opts: ["Repositórios à venda", "Actions e Apps que estendem o GitHub", "Vagas de emprego", "Templates de Projects apenas"], a: 1, exp: "Marketplace = Actions e Apps (gratuitos e pagos)." },
        { id: "w7-innersource", q: "O que é InnerSource?", opts: ["Código-fonte de um app interno do GitHub", "Aplicar práticas de open source dentro de uma organização", "Licença para código privado", "Um tipo de runner"], a: 1, exp: "InnerSource leva colaboração aberta (PRs, visibilidade, docs) para dentro da empresa." },
        { id: "w7-follow", q: "O que acontece quando você segue (follow) um usuário?", opts: ["Recebe acesso aos repositórios privados dele", "A atividade pública dele aparece no seu feed", "Vira colaborador dos repositórios dele", "Ele recebe seu e-mail"], a: 1, exp: "Follow alimenta o feed com a atividade pública." },
        { id: "w7-topics", q: "Para que servem os topics de um repositório?", opts: ["Definir permissões", "Classificar o repositório por assunto e facilitar a descoberta", "Criar milestones", "Bloquear forks"], a: 1, exp: "Topics categorizam e aparecem em buscas e páginas de tópico." },
        { id: "w7-coc", q: "Qual arquivo define as regras de convivência da comunidade de um projeto?", opts: ["CONTRIBUTING.md", "CODE_OF_CONDUCT.md", "SECURITY.md", "CODEOWNERS"], a: 1, exp: "CODE_OF_CONDUCT define o comportamento esperado; CONTRIBUTING, o como contribuir." },
        { id: "w7-benefit", q: "Qual é um benefício do open source?", opts: ["Código fica escondido de concorrentes", "Transparência e colaboração ampla, acelerando inovação e reuso", "Dispensa licença", "Impede forks"], a: 1, exp: "Abertura permite revisão, reuso e contribuição de muita gente." },
        { id: "w7-internal-inner", q: "Que recurso ajuda uma empresa com enterprise a praticar InnerSource?", opts: ["Gists secretos", "Repositórios com visibilidade internal", "Desativar Pull Requests", "Arquivar repositórios"], a: 1, exp: "Internal deixa o código visível para toda a enterprise, sem expor ao público." },
        { id: "w7-template-start", q: "Você quer iniciar um projeto novo a partir de um boilerplate, sem herdar histórico nem vínculo. O que usar?", opts: ["Fork", "Template repository", "Clone + push no mesmo repo", "Gist"], a: 1, exp: "Template = projeto novo, histórico limpo. Fork mantém vínculo." },
        { id: "w7-discover", q: "O que mais ajuda um repositório público a ser descoberto?", opts: ["Ter muitas branches", "Description, topics e um bom README", "Ser arquivado", "Ter Wiki desativada"], a: 1, exp: "Metadados e README alimentam busca, Topics e Explore." },
      ],
      missions: [
        { id: "m7-1", text: "Dar star e follow em 3 projetos/pessoas e ver o efeito no feed" },
        { id: "m7-2", text: "Fazer fork de um projeto open source e abrir um PR de documentação" },
        { id: "m7-3", text: "Navegar no Marketplace e achar uma Action e um App; ler sobre Sponsors" },
        { id: "m7-4", text: "Escrever 3 linhas explicando InnerSource com um exemplo do trabalho" },
      ],
    },
  ],
};

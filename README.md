# GH-900 Quest

Estudo gamificado para a certificação **GitHub Foundations (exame GH-900)**,
em português. Você lê cada domínio da prova, responde quizzes, enfrenta
chefes e ganha XP até ficar pronto para o exame.

**▶ Jogar online: https://thithio.github.io/gh900-quest/**

> 🇺🇸 *A gamified, Portuguese-language study game for the GitHub Foundations
> (GH-900) certification. Static HTML/CSS/JS, no build step. Play online or run locally.*

## O que tem

- **7 mundos**, um por domínio do exame, com os pesos do guia oficial
  atualizado em janeiro de 2026.
- **Leitura**: 34 seções curtas resumindo o que cada domínio cobra.
- **Quiz rápido**: 5 perguntas sorteadas, com explicação depois de cada
  resposta.
- **Chefe do mundo**: 10 perguntas sem dica. Precisa acertar 8 para vencer.
- **Missões práticas**: 24 tarefas para fazer no GitHub de verdade.
- **Cemitério**: cada erro vira uma carta que volta para revisão 1, 3 e 7
  dias depois (repetição espaçada).
- **Chefe final**: liberado no nível máximo. Você registra suas notas no
  practice assessment oficial da Microsoft e o jogo avisa quando dá para
  agendar a prova.
- XP, 6 níveis (de *Noob do init* a *Octocat*), streak de dias seguidos e
  atalhos de teclado (A–D ou 1–4 para responder, Enter para avançar).

O banco tem 94 perguntas de múltipla escolha.

## Como rodar

O jeito mais fácil é jogar direto pelo link acima, sem instalar nada.

Para rodar na sua máquina, também não precisa instalar nada além de Python 3, que só serve como servidor web
local:

```bash
git clone https://github.com/Thithio/gh900-quest.git
cd gh900-quest
python3 -m http.server 8900 --bind 127.0.0.1
```

Depois, abra http://localhost:8900.

Qualquer servidor de arquivos estáticos serve (`npx serve`, extensão Live
Server do VS Code etc.).

## Seu progresso

O progresso fica salvo no `localStorage` do navegador, preso ao endereço
(o site do GitHub Pages ou `localhost:8900`). Jogar online e jogar local
são progressos separados, assim como trocar de navegador.
Use **Exportar progresso** no rodapé para baixar um JSON de backup e
**Importar** para restaurar.

## Domínios do exame

| Mundo | Domínio | Peso |
|---|---|---|
| 1 | Understand Git and GitHub basics | 25–30% |
| 2 | Work with GitHub repositories | 10–15% |
| 3 | Collaborate using GitHub | 10–15% |
| 4 | Apply modern development practices | 10–15% |
| 5 | Manage projects with GitHub | 5–10% |
| 6 | Understand privacy, security, and administration | 10–15% |
| 7 | Explore the GitHub community | 5–10% |

Fonte: [guia de estudo oficial do GH-900](https://learn.microsoft.com/credentials/certifications/resources/study-guides/gh-900).
Para passar, é preciso tirar 700 de 1000.

## Avisos

- O conteúdo foi escrito a partir dos objetivos do guia oficial e da
  [documentação do GitHub](https://docs.github.com). **As perguntas não
  são da prova real.** Servem para treino.
- Planos do Copilot, EMU e outros recursos mudam com frequência. Na
  dúvida, a documentação oficial vale mais que este jogo.
- Projeto independente, sem vínculo com o GitHub nem com a Microsoft.
  "GitHub" e "GitHub Foundations" são marcas dos respectivos donos.

## Contribuir

Achou uma pergunta errada, desatualizada ou ambígua? Abra um
[issue](https://github.com/Thithio/gh900-quest/issues/new/choose) com o
template "Pergunta com problema".

Para adicionar perguntas ou lições, edite `content.js`. Cada pergunta
segue este formato:

```js
{ id: "w1-exemplo", q: "Enunciado?", opts: ["A", "B", "C", "D"], a: 1, exp: "Por que B está certa." }
```

`a` é o índice da alternativa correta (começa em 0). As alternativas são
embaralhadas na hora de exibir.

## Licença

[MIT](LICENSE)

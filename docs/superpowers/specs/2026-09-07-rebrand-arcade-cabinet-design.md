# MUNIZ.DEV — Rebrand "Arcade Cabinet"

Status: approved direction, spec under review
Date: 2026-09-07
Owner: Gabriela Muniz

---

## Context

`muniz-dev-landing-page` é o site pessoal de Gabriela Muniz — desenvolvedora
full stack freelancer, atendimento remoto. React 19 + TypeScript + Vite 8,
prerender SSG, deploy GitHub Pages. Identidade atual: "retro-gamer dark" com
fonte pixel, rosa/lilás sobre fundo escuro, vários efeitos (boot "PRESS START",
som 8-bit, scanlines CRT, glitch, Konami code, toasts de conquista, cursor pixel).

Problemas que motivam o rebrand:

1. **O formulário de contato (Formspree) não está conectado a nada.** Precisa sair.
2. **A experiência precisa de um salto**, não de polish. Muitos efeitos pequenos
   competindo entre si diluem o impacto; a identidade não está "vendendo".
3. **Um acento de cor só** (rosa) — nada sinaliza o que é interativo.
4. A ação principal do site não está clara depois que o form sai.

Decisões tomadas com a usuária:

- Rebrand **completo** (nome, tom, estrutura, hierarquia de seções, sistema visual),
  **mantendo o DNA retro-gamer**.
- **Nome não muda**: `MUNIZ.DEV` / `muniz.dev`. Domínio não muda.
- **Ação principal = WhatsApp.** Portfólio continua forte pra dar credibilidade
  a recrutador, mas a conversão é projeto freelance.
- Cortar os gimmicks fracos, investir em poucos momentos retro fortes.
- Usuária deu carta branca nos detalhes; quer algo "inovador".

Resultado pretendido: um site que se lê como **uma sessão de arcade** — o
visitante é "Player 1", a missão é colocar software no ar, o "insert coin" é
começar um projeto (WhatsApp). Retro vira moldura intencional, nunca ruído.
Leitura impecável pra recrutador; conversão clara pra cliente.

---

## Goals

- Sistema visual novo: 2º acento, escala tipográfica que permite títulos grandes
  e legíveis, tokens com papéis claros.
- Chrome persistente (HUD) que substitui a nav e dá contexto o tempo todo.
- Estrutura de seções renomeada/reordenada como "stages" de um jogo, com um
  componente `Stage` padronizando entrada e acessibilidade.
- Contato sem formulário — CTA único e forte pro WhatsApp.
- Cards de projeto reformulados no formato "análise de game" (honesto, não nota falsa).
- Remover Konami, conquistas e cursor pixel. Boot curto. Chiptune opt-in.
- Preservar todo o trabalho de a11y/perf já feito (skip-link, `<main id>`,
  `aria-labelledby`, reduced-motion, lazy media, prerender).
- Entregável em 3 fases, cada uma buildável e verificável isoladamente.

## Non-goals

- Trocar framework, build ou hospedagem.
- Trocar nome ou domínio.
- Minigame jogável de verdade (gimmicky, prejudica recrutador).
- Backend / formulário / captura de lead própria.
- Reescrever `TerminalWindow`, `Reveal`, `PixelCorners`, `sound.ts` (só ajustar uso).
- Internacionalização. Site segue 100% pt-BR.

---

## Sistema visual

### Tokens de cor (`src/index.css :root`)

```css
--bg:        #0f0b1a;   /* fundo base (mais fundo que o atual #161022) */
--surface:   #1a1330;   /* card, painel */
--surface-2: #241a3d;   /* card sobre card, chip */
--bg-deep:   #080610;   /* recuo: poço de vídeo, fundo do FINAL BOSS */

--text:           #f4f1fb;
--text-body:      #d8d2ec;   /* parágrafo longo */
--text-secondary: #a89bc4;   /* apoio, legenda */

--p1:       #ff5fa8;   /* rosa — AÇÃO / Player 1. Botões primários, INSERT COIN */
--p1-light: #ffb6da;
--p1-dim:   rgba(255, 95, 168, 0.15);

--p2:       #3df0e0;   /* ciano — INTERATIVO / "ao vivo" / Player 2.
                          valores do HUD, hover de link, afordância "jogável" */
--p2-dim:   rgba(61, 240, 224, 0.14);

--score:    #c8ff4d;   /* lime — só barras de "stack/score" e momentos "HIGH SCORE".
                          uso raro, nunca como texto de leitura */

--border:   #2a2140;
--border-2: #3a2f52;

--success: #2ecc71;  --success-bg: #0b1f0f;
--error:   #e74c3c;  --error-bg:   #2a0b08;

--r-sm: 4px;  --r-md: 8px;  --r-lg: 14px;
```

**Papéis (regra):**
- `--p1` = "a coisa que eu quero que você clique agora". No máximo 1 por dobra.
- `--p2` = "isto é interativo / vivo" — links em hover, valores do HUD que mudam,
  botões de play, foco. Também o "STAGE N" (kicker).
- `--score` = enfeite de progresso/pontuação. Nunca texto corrido.
- Texto sempre `--text*`. Acento como texto só em tamanho ≥ display/label.

**Contraste — verificar na Fase 1 (WCAG 2.1 AA):**
- `--p2` sobre `--bg` e sobre `--surface` (ciano brilhante — provável ~10:1, confirmar).
- `--score` sobre `--bg` — confirmar; se reprovar como texto, restringir a fill de barra.
- `--text-secondary` sobre `--surface` e `--surface-2` (fundo mais claro que `--bg`
  reduz a razão — hoje só foi verificado sobre `--bg`).
- `--p1` sobre `--bg` = ~6.6:1 (já verificado, mantém).
- Texto sobre `--p1` e sobre `--p2` (botões) = usar `--bg` (`#0f0b1a`), não branco.

### Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Display | `Press Start 2P` (`--font-display`) | kicker "STAGE N", labels do HUD, wordmark, texto de botão, microcopy retro ("PRESS START", "INSERT COIN"). **Nunca** frase > ~4 palavras, nunca corpo. |
| Título | `Space Grotesk` 700 (`--font-head`) | títulos de stage (`h2`), `h1` do Title Screen. Caixa alta, tracking apertado, tamanho grande via `clamp()`. Press Start 2P é largo demais pra título grande. |
| Corpo | `Space Grotesk` 400/500 (`--font-body`) | parágrafos, listas, inputs. |
| Mono "sistema" | `ui-monospace, SFMono-Regular, 'Cascadia Code', Consolas, monospace` (`--font-mono`) | linhas com prefixo `> ` no HUD e no terminal slim. **Sem novo download** — stack de sistema. |

Ambas as Google Fonts já carregadas (`Press Start 2P`, `Space Grotesk`).
Não adicionar fonte nova. Manter `display=swap` + fallback.

Escala (referência, tudo fluido com `clamp()`):
- `h1` Title Screen: `clamp(30px, 6vw, 64px)` em `--font-head`
- `h2` título de stage: `clamp(22px, 1rem + 3vw, 40px)` em `--font-head`
- kicker "STAGE N": 11–12px em `--font-display`, `--p2`
- corpo: 16–18px
- HUD label: 9–10px em `--font-display`

### Motivos retro (o que fica, o que sai)

| Motivo | Decisão |
|---|---|
| Vinheta CRT | Reaproveitar o `div.scanlines` como **vinheta de cantos** (radial escuro nas 4 bordas), sem linhas sobre o texto. `aria-hidden`. Some com `prefers-reduced-motion`. |
| Moldura pixel (`PixelCorners` / `.pixel-frame`) | Fica. "Cartucho" nos cards de projeto e no card do Title Screen. |
| Glitch (`.glitch`) | Fica **só** no wordmark (HUD) e em 1 palavra do `h1` do Title Screen. Só em hover / entrada, nunca loop constante. |
| Boot "PRESS START" | Fica, **≤ 1s**, pulável, pulado sob `prefers-reduced-motion`. |
| Som 8-bit (`sound.ts`) | Fica. **Desligado por padrão.** Toggle no HUD, estado em `localStorage`. Blips de hover só quando ligado. |
| Marquee de tecnologias | Deixa de ser seção. Vira **fita fina** ("loading tape") dentro do Title Screen ou logo abaixo do HUD. |
| Konami code | **Removido.** |
| Toasts de conquista | **Removidos.** O HUD sempre visível cumpre melhor o papel de "feedback de progresso". |
| Cursor pixel (SVG em `body`) | **Removido.** Volta o cursor nativo. `CursorGlow` também sai. |

---

## Estrutura

### Chrome persistente

**`Hud`** — fixo. Desktop: coluna/barra vertical à esquerda (largura ~72–96px
fechada, expande no hover/foco pro Level Select) **ou** barra horizontal no topo
— decidir no protótipo da Fase 1. Mobile: barra fixa no topo + Level Select em
overlay (herdando o comportamento de menu atual do `Nav`).

Conteúdo do HUD:
- **Wordmark** `MUNIZ.DEV` (com `.glitch`).
- **LEVEL SELECT** — lista das stages, âncora `#id`, marca a stage ativa
  (IntersectionObserver). `<nav aria-label="Selecionar seção">`. Sem focus trap
  no desktop; no overlay mobile mantém trap + Esc (reusa lógica do `Nav` atual).
- **STAT READOUT** — `hudStats` de `content.ts`, renderizado tipo placar
  (`XP  6+ ANOS` / `SHIPPED  8` / `STACK  FULL`). Valores em `--p2`.
- **CHIPTUNE** — toggle on/off, `aria-pressed`, persistido.
- **INSERT COIN** — botão sempre visível, `--p1`, abre WhatsApp (`whatsappUrl`).

**`ScrollEnergyBar`** — o `ScrollProgress` atual, re-estilizado como "energy bar"
(segmentada, `--p2`→`--p1`). Mantém `useReducedMotion`.

**`CrtVignette`** — o antigo `div.scanlines`, agora vinheta de cantos. `aria-hidden`.

### Stages (ordem e nomes novos)

Componente `Stage` (novo) padroniza cabeçalho + entrada + a11y de cada seção.

| # | Componente | `id` | kicker | título (`h2`) | mudança |
|---|---|---|---|---|---|
| — | `TitleScreen` (era `Hero`) | `topo` (sem id, `aria-label`) | — | `h1` | attract mode; boot ≤1s; PRESS START → rola pra `#player`; INSERT COIN → WhatsApp; card de retrato retunado; fita de tecnologias aqui |
| 1 | `Sobre` | `player` (era `sobre`) | STAGE 1 | QUEM É O PLAYER | bio enxuta; stack como "loadout" (chips); terminal grande → versão slim |
| 2 | `Como` | `fase` (era `como`) | STAGE 2 | COMO A FASE FUNCIONA | 3 passos como "walkthrough" (briefing → build → ship) |
| 3 | `Projetos` | `projetos` | STAGE 3 | PROJETOS | cards "análise de game" (ver abaixo); 8 projetos |
| 4 | `Servicos` | `arsenal` (era `servicos`) | STAGE 4 | ARSENAL | 6 serviços como "power-ups" |
| 5 | `GithubRepos` | `repos` (era `github`) | BONUS | REPOSITÓRIOS | feed ao vivo; enquadrado como "conteúdo extra" |
| 6 | `Parceiros` | `parceiros` | CO-OP | PARCEIROS | Vortem |
| 7 | `Faq` | `faq` | CONTINUE? | DÚVIDAS ANTES DO START | acordeão (mantém) |
| 8 | `InsertCoin` (era `Contato`) | `insert-coin` (era `contato`) | FINAL BOSS | INSERT COIN | **sem form**; WhatsApp gigante + e-mail secundário + LinkedIn/GitHub/Instagram como "credits" |
| — | `Footer` | — | — | — | "credits roll" mínimo |

**IDs que mudam:** `sobre→player`, `como→fase`, `servicos→arsenal`,
`github→repos`, `contato→insert-coin`. `projetos`, `parceiros`, `faq` não mudam.
Atualizar âncoras em: `public/llms.txt`, `public/llms-full.txt`. `sitemap.xml`
só tem a URL raiz — sem impacto. Sem redirect de hash antigo (site pessoal,
tráfego de deep-link é irrelevante).

### Card de projeto — formato "análise de game"

Honesto, **sem nota inventada**. Cada card:
- preview (`image` `.webp` ou `videoUrl` — como já é hoje);
- título + pitch de 1 linha (`description` encurtada, ou novo campo `pitch`);
- **EQUIPPED** — chips das tecnologias usadas (`stack: string[]`, novo);
- **VEREDITO** — 1 linha (`verdict?: string`, novo) — o "resultado" do projeto
  ("no ar, cliente usando", "protótipo fechado", "conceito de identidade");
- link "Ver site ↗" / "Ver repositório ↗" quando houver `siteUrl`.

Sem `stackScore` numérico — a barra de "score" seria interpretada como nota falsa.
A régua de "quão completo" fica implícita na quantidade de chips EQUIPPED.

---

## Componentes

### Novos

| Componente | O que faz | Como se usa | Depende de |
|---|---|---|---|
| `Hud.tsx` / `Hud.css` | Chrome fixo: wordmark, Level Select, stat readout, chiptune toggle, Insert Coin | `<Hud />` em `App.tsx`, uma vez | `content.ts` (`stages`, `hudStats`, `whatsappUrl`), `sound.ts`, IntersectionObserver p/ stage ativa |
| `Stage.tsx` | Wrapper de seção: `<section id aria-labelledby>` + cabeçalho (kicker + `h2`) + entrada `Reveal` | `<Stage id="player" kicker="STAGE 1" title="QUEM É O PLAYER"> … </Stage>` | `Reveal` |
| `InsertCoin.tsx` / `InsertCoin.css` | "FINAL BOSS": CTA WhatsApp full-bleed + canais diretos | `<InsertCoin />` em `App.tsx` | `content.ts` (`whatsappUrl`, `contactLinks`) |
| `LevelSelect.tsx` | Lista de navegação das stages (usado dentro do `Hud`, desktop e overlay mobile) | `<LevelSelect activeId={…} onNavigate={…} />` | `content.ts` (`stages`) |

### Reformulados

| Componente | Mudança |
|---|---|
| `ProjectCard.tsx` | Layout "análise": preview → título → pitch → chips EQUIPPED (`project.stack`) → linha VEREDITO (`project.verdict`) → link. Remove qualquer resquício de flip/`stackScore`. |
| `Hero.tsx` → `TitleScreen.tsx` | Renomear arquivo + componente. Boot `BOOT_DURATION` ≤ 1000ms total. `titleWords` mantém o fix de espaçamento (`.word-reveal` margin). Fita de tecnologias embutida. CTA primário PRESS START (rola), secundário INSERT COIN (WhatsApp). |
| `ScrollProgress.tsx` → `ScrollEnergyBar` | Re-skin (segmentada, gradiente `--p2`→`--p1`). Lógica igual. |
| `App.tsx` | Nova composição: `Hud` no lugar de `Nav` + `SoundToggle`; `CrtVignette` no lugar de `.scanlines`; remove `KonamiEgg`, `CursorGlow`, `AchievementsProvider`; `<TitleScreen/>` + stages + `<InsertCoin/>` dentro do `<main id="main">`. |
| Cada seção (`Sobre`, `Como`, `Projetos`, `Servicos`, `GithubRepos`, `Parceiros`, `Faq`) | Trocar o `<section className="section">` + `.eyebrow` + `<h2>` ad-hoc pelo `<Stage>`. Remover chamadas a `useUnlockAchievement`. Ajustes de conteúdo conforme a tabela de stages. |

### Removidos

`KonamiEgg.tsx` / `.css`, `AchievementsContext.tsx` / `Achievements.css`,
`CursorGlow.tsx` / `.css`, `Nav.tsx` / `Nav.css` (absorvido por `Hud`),
`SoundToggle.tsx` / `.css` (absorvido por `Hud`), o `<form>` + `handleSubmit` +
`FORMSPREE_ID` + estados de `Contato.tsx`.

### Mantidos sem mudança estrutural

`PixelCorners.tsx`, `Reveal.tsx`, `TerminalWindow.tsx` (só uso mais enxuto em
`Sobre`), `TechMarquee.tsx` (re-posicionado), `sound.ts`, `useTypewriter.ts`,
`entry-server.tsx`, `main.tsx`, `scripts/*`.

---

## Modelo de dados — `src/data/content.ts`

Adições:

```ts
export const whatsappUrl =
  'https://wa.me/558194561507?text=Oi%20Gabriela!%20Vim%20pelo%20site%20e%20quero%20falar%20sobre%20um%20projeto.';

export const hudStats = [
  { label: 'XP', value: '6+ ANOS' },
  { label: 'SHIPPED', value: '8 PROJETOS' },
  { label: 'STACK', value: 'FULL' },
];

export const stages = [
  { id: 'player',      kicker: 'STAGE 1',   title: 'QUEM É O PLAYER' },
  { id: 'fase',        kicker: 'STAGE 2',   title: 'COMO A FASE FUNCIONA' },
  { id: 'projetos',    kicker: 'STAGE 3',   title: 'PROJETOS' },
  { id: 'arsenal',     kicker: 'STAGE 4',   title: 'ARSENAL' },
  { id: 'repos',       kicker: 'BONUS',     title: 'REPOSITÓRIOS' },
  { id: 'parceiros',   kicker: 'CO-OP',     title: 'PARCEIROS' },
  { id: 'faq',         kicker: 'CONTINUE?', title: 'DÚVIDAS ANTES DO START' },
  { id: 'insert-coin', kicker: 'FINAL BOSS', title: 'INSERT COIN' },
];
```

`interface Project` ganha:

```ts
stack?: string[];   // techs "equipadas" no projeto — chips
verdict?: string;   // 1 linha de "resultado"
```

Preencher `stack` e `verdict` nos 8 projetos existentes (texto a redigir na Fase 3,
revisado pela usuária). `contactLinks` continua; some qualquer coisa presa ao form.
`stack` (constante existente, lista de áreas) — renomear pra `loadout` se colidir
com o campo novo `Project.stack`; senão manter.

Verificar valores de `hudStats` com a usuária ("6+ anos", "8 projetos").

---

## Acessibilidade

- **Herdar tudo que já foi feito**: skip-link → `<main id="main" tabindex="-1">`,
  `aria-labelledby` (agora emitido pelo `Stage`), `CrtVignette` `aria-hidden`,
  caminhos `prefers-reduced-motion` (CSS global + `useReducedMotion` nos componentes).
- `Hud`: `<header>` + `<nav aria-label="Selecionar seção">`. Desktop sem focus
  trap. Overlay mobile: trap + Esc + retorno de foco (reusa a lógica do `Nav`).
  Toggle do Level Select com `aria-expanded`/`aria-controls`.
- Stat readout: texto real, não imagem. Se algum valor "animar" (contador),
  `aria-live="off"` e valor final no DOM desde o início.
- `Stage`: `kicker` e `title` viram um bloco de cabeçalho; `title` é o `<h2>`
  com `id`, `section[aria-labelledby]` aponta pra ele. Um único `<h1>` no site
  (Title Screen).
- CHIPTUNE toggle: `aria-pressed`, rótulo textual.
- INSERT COIN: `<a>` de verdade pro `wa.me` (`target="_blank"`, `rel="noopener"`),
  não `<button>`.
- Contraste AA obrigatório nos pares novos (`--p2`, `--score`) — bloqueia a Fase 1.
- Foco visível preservado (`:focus-visible` global; revisar cor pra `--p2`).
- `TitleScreen` mantém `inert` no conteúdo durante o boot.

## Performance

- Remover `KonamiEgg` (60 nós de confete + listeners), `AchievementsContext`
  (provider + timers) e `CursorGlow` (rAF contínuo) **reduz** JS e trabalho de runtime.
- Nenhuma fonte nova (mono = stack de sistema).
- Sem novas imagens além das que já existem; OG image regenerada na Fase 3 pelo
  `scripts/optimize-hero-image.mjs` (ajustar arte pro visual novo — opcional).
- `Hud` fixo: usar `position: fixed` + `transform` pra abrir/fechar, `will-change`
  só enquanto anima. IntersectionObserver (não scroll listener) pra stage ativa.
- Bundle segue chunk único; medir antes/depois (`dist/assets/index-*.js`).
- Prerender SSG intacto — `Stage`, `Hud`, `InsertCoin` têm que renderizar no
  servidor (`renderToString`) sem `window`. Qualquer acesso a `window`/`localStorage`
  (chiptune, IntersectionObserver) atrás de `useEffect`.
- CLS: `Hud` reserva sua área (largura/altura fixas); media dos cards já tem
  dimensão explícita.

---

## Fases

Cada fase termina com o site **buildável, no ar e verificável**.

### Fase 1 — Fundação visual + HUD
- Reescrever tokens em `src/index.css` (paleta, papéis, escala de tipo, `--font-head`, `--font-mono`).
- Remover regras CSS de konami/achievement/cursor pixel; `CrtVignette` (vinheta de cantos).
- `Stage.tsx` + `Stage.css`. Migrar as 7 seções de conteúdo pra usá-lo (só o
  wrapper/cabeçalho; conteúdo interno inalterado nesta fase).
- `Hud.tsx` + `LevelSelect.tsx` (+ CSS). Absorve `Nav` e `SoundToggle`.
  `ScrollProgress` → `ScrollEnergyBar` re-skin.
- `App.tsx`: trocar `Nav`/`SoundToggle`/`.scanlines` por `Hud`/`CrtVignette`.
  `KonamiEgg`/`CursorGlow`/`AchievementsProvider` continuam montados nesta fase
  (remoção é da Fase 2) pra manter o diff focado em tokens + HUD.
- **Verificação contraste AA** dos acentos novos. Ajustar tokens se reprovar.
- Resultado: mesma estrutura de seções, pele e navegação novas.

### Fase 2 — Estrutura de jogo + tirar o form
- `content.ts`: `stages`, `hudStats`, `whatsappUrl`. IDs de seção renomeados;
  `LevelSelect` e âncoras (`llms.txt`, `llms-full.txt`) atualizados.
- `Hero` → `TitleScreen` (renomear, boot ≤1s, fita de tecnologias, CTAs novos).
- `TechMarquee` deixa de ser seção.
- `InsertCoin.tsx` substitui o form do `Contato`. Remover `<form>`, `handleSubmit`,
  `FORMSPREE_ID`. Remover menção a Formspree no `README.md`.
- Remover `KonamiEgg`, `AchievementsContext`/`Achievements.css`, `CursorGlow`.
  Tirar `useUnlockAchievement` de todas as seções.
- Resultado: navegação e narrativa de "stages" completas; contato sem form.

### Fase 3 — Conteúdo, cards e acabamento
- `ProjectCard` no formato "análise": chips EQUIPPED + linha VEREDITO.
  Adicionar `stack` e `verdict` aos 8 projetos (texto revisado pela usuária).
- `Servicos` como "ARSENAL" (power-ups), `Sobre` "loadout", `Como` "walkthrough" —
  ajustes de copy e microlayout.
- Reescrever `docs/brand-guidelines.md` pro sistema novo.
- OG image nova (opcional) via `scripts/optimize-hero-image.mjs`.
- Passe final: contraste, teclado, mobile 375px, `prefers-reduced-motion`,
  Lighthouse/axe, tamanho de bundle antes/depois.

---

## Verificação

Por fase e no fim:

1. `npm run build` — `tsc` limpo, prerender sem erro, todas as stages presentes
   em `dist/index.html`.
2. `npm run lint` (oxlint) — sem regressão (o warning pré-existente em
   `AchievementsContext` some junto com o arquivo na Fase 2).
3. `npm run dev` + browser:
   - Percorrer todas as stages; Level Select rola pra seção certa; stage ativa
     marcada no HUD.
   - INSERT COIN (HUD e FINAL BOSS) abre `wa.me` com mensagem pré-preenchida.
   - Chiptune começa **desligado**; toggle liga/desliga e persiste no reload.
   - Boot ≤ 1s; PRESS START entra na Stage 1.
4. **Só teclado** (Tab/Shift+Tab/Enter/Esc): skip-link, HUD, Level Select
   (overlay mobile com trap + Esc), acordeão do FAQ, links de projeto.
5. **Contraste**: axe/Lighthouse sem violação; conferência manual dos pares
   `--p2`/`--score` sobre `--bg`, `--surface`, `--surface-2`.
6. **Mobile 375px**: HUD colapsa pro topo, stages em 1 coluna, sem overflow-x,
   títulos escalando por `clamp()`.
7. **`prefers-reduced-motion`**: boot pulado, glitch/vinheta calmos, sem
   entrada animada, energy bar estática.
8. **Perf**: comparar `dist/assets/index-*.js` (gzip) antes/depois — expectativa
   de redução.
9. `docs/brand-guidelines.md` bate com `src/index.css :root`.

---

## Perguntas abertas (resolver no review deste spec)

1. **HUD**: barra vertical à esquerda ou barra horizontal no topo no desktop?
   (Proposta: decidir com um protótipo rápido na Fase 1; default = vertical à
   esquerda que expande.)
2. **`hudStats`**: "6+ anos", "8 projetos", "STACK FULL" — os números conferem?
3. **Chiptune / som 8-bit**: manter mesmo? (Proposta: manter, off por padrão.)
4. **OG image nova** na Fase 3 ou fica a atual? (Proposta: regenerar, baixa prioridade.)
5. **Copy de `verdict` dos 8 projetos**: você escreve ou eu redijo pra revisão?
   (Proposta: eu redijo, você revisa — como foi com as descrições novas.)
6. **`dist/` versionado**: existe um build antigo commitado no repo (stale). Limpar
   nesta leva? (Proposta: sim, adicionar ao `.gitignore` efetivo e remover do índice.)

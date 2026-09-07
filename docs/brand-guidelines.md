# Guia de marca — muniz.dev

Fonte de verdade da identidade de **Gabriela Muniz** (muniz.dev). Os valores de cor,
tipografia e raio espelham os design tokens em `src/index.css` (bloco `:root`). Ao alterar
um token lá, atualize este documento — e vice-versa.

---

## 1. Essência

Desenvolvedora full stack freelancer. Atendimento 100% remoto, Brasil e exterior.
A marca vende **entrega real e código que qualquer dev consegue manter** — não hype de
tecnologia. A estética retro-gamer é o diferencial de personalidade; nunca deve atrapalhar
a leitura nem a credibilidade técnica.

- **Headline:** `CÓDIGO QUE RESOLVE DE VERDADE`
- **Uma frase:** "Desenvolvedora Full Stack freelancer, atendimento 100% remoto, com foco em código limpo e entrega real."
- **Promessa concreta:** avaliação inicial gratuita em até 24 horas; orçamento por escopo, sem tabela fixa.

---

## 2. Voz e tom

Português do Brasil, primeira pessoa, direto e sem enrolação. Fala como uma dev explicando
para um cliente — segura, sem jargão vazio, sem "vender fumaça".

**Faça:**
- Frases curtas. Verbo no presente. "Eu retorno em até 24 horas."
- Termos técnicos quando forem precisos (React, Spring, PostgreSQL, REST) — o público inclui devs e recrutadores.
- Foco no resultado para o cliente: o que fica pronto, no ar, documentado.
- CTAs de ação clara: "Ver site", "Ver repositório", "Enviar mensagem", "Vamos construir algo juntos?".

**Não faça:**
- Superlativo de marketing: "revolucionário", "disruptivo", "o melhor do mercado".
- Promessa vaga de prazo ou preço. Sempre condicionar a escopo.
- Emoji no corpo de texto sério (permitido em microcopy lúdica: badges, easter eggs, rodapé).
- CAIXA ALTA em frase inteira longa fora de títulos/labels (a fonte display já é toda em caixa).

**Microcopy retro (uso pontual):** "PRESS START", "REPRODUZIR", "EM BREVE", nomes de
conquistas ("Iniciou o jogo", "Chegou em PROJETOS"). Curto, sempre em caixa alta, sempre
na fonte display.

---

## 3. Paleta

Definida em `src/index.css :root`. Tema único, escuro (não há modo claro).

| Token | Hex | Papel |
|---|---|---|
| `--bg` | `#161022` | Fundo base da página |
| `--bg-alt` | `#1c1530` | Superfície elevada (cards, formulário) |
| `--bg-deep` | `#100b1a` | Fundo recuado (área de vídeo, overlay de menu) |
| `--text` | `#f4f1fb` | Texto principal / títulos |
| `--text-body` | `#d8d2ec` | Parágrafo longo (Hero sub, bio) |
| `--text-secondary` | `#a89bc4` | Texto de apoio, descrição de card, legendas |
| `--accent` | `#ff5fa8` | Ação: botões primários, links, eyebrow, foco, brilho |
| `--accent-light` | `#ffb6da` | Realce sobre o accent, gradientes |
| `--accent-dim` | `rgba(255,95,168,.15)` | Glow, hover sutil, fundo de estado |
| `--border` | `#2a2140` | Divisória discreta |
| `--border2` | `#3a2f52` | Borda de card / controle |
| `--success` / `--success-bg` | `#2ecc71` / `#0b1f0f` | Estado de sucesso (form enviado) |
| `--error` / `--error-bg` | `#e74c3c` / `#2a0b08` | Estado de erro |

### Contraste (WCAG 2.1, verificado sobre `--bg`)

| Par | Razão | AA normal (4.5) | AAA normal (7) |
|---|---|---|---|
| `--text` sobre `--bg` | ~16:1 | ✅ | ✅ |
| `--text-body` sobre `--bg` | ~11:1 | ✅ | ✅ |
| `--text-secondary` sobre `--bg` | ~7.2:1 | ✅ | ✅ |
| `--accent` sobre `--bg` | ~6.6:1 | ✅ | ✅ (só normal) |

Regras:
- `--accent` como **texto** só em tamanho normal ou maior (eyebrow 12px+, links). Não usar accent para blocos longos de leitura.
- Nunca colocar `--text-secondary` sobre `--bg-alt`/`--bg-deep` sem revalidar (fundo mais claro reduz a razão).
- Texto sobre `--accent` (botão primário) usa `--bg` (`#161022`), não branco.

---

## 4. Tipografia

| Papel | Família (token) | Uso |
|---|---|---|
| Display | `--font-display` = `'Press Start 2P', monospace` | `h1`–`h3`, `.eyebrow`, `.btn`, labels, nav, rodapé, microcopy retro |
| Corpo | `--font-body` = `'Space Grotesk', sans-serif` | parágrafos, inputs, descrições, listas |

`Press Start 2P` é pixelada e larga: **só em fragmentos curtos**. Nunca em parágrafo,
nunca abaixo de ~10px. Sempre com `line-height` folgado (1.5–1.6) e `letter-spacing`
positivo pequeno em labels.

Escala atual (referência):
- `h1` (Hero): `clamp(22px, 1.25rem + 2.6vw, 34px)`
- `.section-title`: `clamp(17px, 1rem + 1.6vw, 26px)`
- `.eyebrow`: 12px · `.btn`: 12px · nav link: 22px (16px no mobile)
- Corpo: 15–20px

Ambas as fontes vêm do Google Fonts com `display=swap` e fallback declarado. Sempre manter
o fallback (`monospace` / `sans-serif`) na pilha.

---

## 5. Logo e favicon

- **Wordmark:** `MUNIZ.DEV` em `--font-display`, cor `--accent`, com `text-shadow` suave
  em `--accent-dim`. Frequentemente com efeito `.glitch` (RGB-split) via
  `className="glitch" data-text="MUNIZ.DEV"`.
- **Favicon:** `public/favicon.svg`. Referenciado em `index.html`.
- Área de proteção: manter espaço livre de pelo menos a altura de um caractere ao redor do wordmark.
- Não fazer: recolorir o wordmark fora da paleta, aplicar em fundo claro, distorcer proporção,
  usar o efeito glitch em movimento constante (só hover / entrada).

---

## 6. Motivos visuais retro

Elementos que carregam a identidade. Todos respeitam `prefers-reduced-motion` (ver
`src/index.css` e os `useReducedMotion()` nos componentes). Usar com parcimônia — um ou
dois por dobra de tela, nunca todos juntos competindo.

| Motivo | Onde vive | Quando usar |
|---|---|---|
| Scanlines CRT | `.scanlines` (`App.tsx`, `index.css`) | Overlay global fixo. `aria-hidden`. Nunca sobre texto de formulário. |
| Moldura pixel | `.pixel-frame` / `PixelCorners.tsx` | Cantos de card em destaque (Hero, ProjectCard). |
| Glitch de texto | `.glitch` + `data-text` | Wordmark, título do Hero, nome de parceiro. Só em hover/entrada. |
| Boot "PRESS START" | `Hero.tsx` `BootOverlay` | Só na primeira carga do Hero; pulado com reduced-motion. |
| Conquistas (toasts) | `AchievementsContext` | Feedback lúdico ao rolar seções. `role="status"`, discreto. |
| Som 8-bit | `src/lib/sound.ts` + `SoundToggle` | Blips em hover/click. **Desligado por padrão**; sempre com toggle visível. |
| Konami code | `KonamiEgg.tsx` | Easter egg puro. Não pode bloquear nem cobrir conteúdo. |

Regra geral: se um motivo reduzir a legibilidade, a confiança ("parece amador") ou a
performance, ele sai. A régua é sempre "recrutador no celular consegue ler / dev no desktop
leva a sério".

---

## 7. Mensageria por seção

| Seção | Papel na narrativa | Mensagem-chave |
|---|---|---|
| Hero | Prender + posicionar | `CÓDIGO QUE RESOLVE DE VERDADE` · disponível para projetos · CTAs contato / projetos |
| Sobre | Provar amplitude técnica | "Dev que domina toda a stack" — Java/Spring + ecossistema JS, SOLID, Clean Code |
| Como | Reduzir risco | Briefing (24h grátis) → desenvolvimento incremental → entrega com deploy e suporte |
| Projetos | Prova concreta | "Trabalhos recentes" — landing pages e sistemas reais, com link para o site no ar |
| GitHub | Prova de código aberto | Últimos repositórios, ao vivo da API |
| Serviços | Traduzir em oferta | 6 frentes: frontend, backend, integrações, banco, mobile, consultoria |
| Parceiros | Contexto de ecossistema | Vortem (marketing estratégico) |
| FAQ | Tirar objeção | Preço, prazo, stack, atendimento remoto |
| Contato | Converter | "Vamos construir algo juntos?" — formulário + canais diretos, retorno em 24h |

CTA padrão do site: **"Enviar mensagem"** (formulário) e **"Vamos construir algo juntos?"**
(headline de contato). Links de projeto: **"Ver site ↗"** ou **"Ver repositório ↗"** quando o destino é GitHub.

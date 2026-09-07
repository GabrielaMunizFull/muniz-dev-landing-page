<div align="center">

<img src="src/assets/gabriela-laptop.png" width="160" alt="Gabriela Muniz" />

# 🎮 MUNIZ.DEV

### `CÓDIGO QUE RESOLVE DE VERDADE`

![site](https://img.shields.io/badge/site-online-ff5fa8?style=for-the-badge&labelColor=161022&color=ff5fa8)
![stack](https://img.shields.io/badge/stack-React%20%2B%20TS-7a3ff2?style=for-the-badge&labelColor=161022)
![status](https://img.shields.io/badge/dispon%C3%ADvel-para%20projetos-ff5fa8?style=for-the-badge&labelColor=161022&color=ff5fa8)

**[🔗 muniz.dev →](https://gabrielamunizfull.github.io/muniz-dev-landing-page)**

</div>

---

## 🕹️ Sobre

Landing page pessoal de **Gabriela Muniz**, desenvolvedora full stack — visual **retro gamer dark** (pixel font, rosa/lilás sobre fundo escuro), construída em **React + TypeScript + Vite**, com animações via **Framer Motion**.

## 🧩 Stack

![React](https://img.shields.io/badge/React-ff5fa8?style=flat-square&logo=react&logoColor=161022)
![TypeScript](https://img.shields.io/badge/TypeScript-7a3ff2?style=flat-square&logo=typescript&logoColor=f4f1fb)
![Vite](https://img.shields.io/badge/Vite-ff5fa8?style=flat-square&logo=vite&logoColor=161022)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-7a3ff2?style=flat-square&logo=framer&logoColor=f4f1fb)

## 📂 Estrutura

```
muniz-dev-landing-page/
├── index.html                 # shell Vite + meta tags SEO + schema.org
├── vite.config.ts             # base: '/muniz-dev-landing-page/'
├── public/                    # robots.txt, sitemap.xml, verificação Google
├── src/
│   ├── App.tsx
│   ├── index.css              # tokens de cor, fontes, keyframes globais
│   ├── assets/                # foto do hero + projeto-*.webp + itaca-video.mp4
│   ├── data/content.ts        # stack, steps, services, faq, projects, techList, stages, hudStats, whatsappUrl
│   ├── hooks/                 # useTypewriter, useActiveStage
│   └── components/            # Hud, TitleScreen, Stage, TechMarquee, Sobre, Como, Projetos,
│                               # GithubRepos, Servicos, Parceiros, Faq, InsertCoin, Footer, Reveal, CrtVignette
└── .github/workflows/deploy.yml   # build + deploy automático (GitHub Pages)
```

## ✨ Seções ("stages")

Rebrand "Arcade Cabinet": HUD fixo (Level Select + placar + INSERT COIN), cada seção é uma stage.

| Stage | id | Descrição |
|---|---|---|
| 🏠 Title Screen | — | Boot "PRESS START", título, CTAs (WhatsApp / ver trabalhos), foto, fita de tecnologias |
| 📖 STAGE 1 — Quem é o player | `#player` | Bio + badges de stack técnica |
| 🛠️ STAGE 2 — Como a fase funciona | `#fase` | Processo em 3 passos (briefing → dev → entrega) |
| 🎮 STAGE 3 — Projetos | `#projetos` | Grid de trabalhos recentes — preview `.webp` por card, vídeo local só no Ítaca |
| 💾 BONUS — Repositórios | `#repos` | Últimos repositórios da API do GitHub |
| 🧰 STAGE 4 — Arsenal | `#arsenal` | 6 serviços oferecidos |
| 🤝 CO-OP — Parceiros | `#parceiros` | Vortem |
| ❓ CONTINUE? — Dúvidas | `#faq` | FAQ acordeão (rich snippet no Google) |
| 📬 FINAL BOSS — Insert Coin | `#insert-coin` | CTA direto pro WhatsApp + links (e-mail, LinkedIn, GitHub, Instagram) |

## 🎮 Adicionando / trocando projetos

Cada item do array `projects` em `src/data/content.ts` segue a `interface Project`:

- `image` + `imageAlt` — preview `.webp` (importado de `src/assets/projeto-<slug>.webp`, ~16:9). É o caso padrão.
- `videoUrl` — mp4 local importado de `src/assets/`. Tem prioridade sobre `image` e mostra botão de play (só o Ítaca usa hoje).
- Sem `image` nem `videoUrl` → o card mostra o placeholder `EM BREVE`.

Para gerar um preview novo: tire um screenshot do site em ~1440px de largura e rode um `sharp(...).resize(1000, 563, { fit: 'cover', position: 'top' }).webp({ quality: 80 })` (mesmo padrão de `scripts/optimize-hero-image.mjs`). Ao incluir/remover projetos, sincronize também `public/llms.txt` e `public/llms-full.txt`.

## 🚀 Rodando localmente

```bash
git clone https://github.com/GabrielaMunizFull/muniz-dev-landing-page.git
cd muniz-dev-landing-page
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm run preview
```

## 📡 Deploy

Push na branch `main` dispara `.github/workflows/deploy.yml`, que builda com Vite e publica `dist/` na branch `gh-pages`, servida em `https://gabrielamunizfull.github.io/muniz-dev-landing-page`.

## 📡 SEO

- Meta tags completas (Open Graph, Twitter Card, description, keywords)
- `sitemap.xml` + `robots.txt`
- Dados estruturados `schema.org` (`Person` + `FAQPage` + `ProfessionalService`)
- Verificado no Google Search Console

## 📬 Contato

<div align="center">

[![Email](https://img.shields.io/badge/Email-ff5fa8?style=for-the-badge&logo=gmail&logoColor=161022)](mailto:gabrielasdsmuniz@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-7a3ff2?style=for-the-badge&logo=linkedin&logoColor=f4f1fb)](https://www.linkedin.com/in/gabriela-muniz-1ab02a1ab)
[![GitHub](https://img.shields.io/badge/GitHub-ff5fa8?style=for-the-badge&logo=github&logoColor=161022)](https://github.com/GabrielaMunizFull)
[![Instagram](https://img.shields.io/badge/Instagram-7a3ff2?style=for-the-badge&logo=instagram&logoColor=f4f1fb)](https://instagram.com/muniz.devv)

</div>

---

<div align="center">
<sub>© 2026 · Feito com 💜 e muito código limpo</sub>
</div>

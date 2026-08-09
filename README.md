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
│   ├── assets/                # gabriela-laptop.png
│   ├── data/content.ts        # stack, steps, services, faq, projects, techList
│   └── components/            # Nav, Hero, TechMarquee, Sobre, Como, Projetos,
│                               # Servicos, Faq, Contato, Footer, Reveal
└── .github/workflows/deploy.yml   # build + deploy automático (GitHub Pages)
```

## ✨ Seções

| Seção | Descrição |
|---|---|
| 🏠 Hero | Badge de disponibilidade, título, CTAs, foto |
| 🧵 Tech marquee | Faixa animada com as tecnologias |
| 📖 Sobre | Bio + badges de stack técnica |
| 🛠️ Como | Processo em 3 passos (briefing → dev → entrega) |
| 🎮 Projetos | Grid 2x2 de vídeos (placeholder — trocar pelos reais) |
| 🧰 Serviços | 6 cards de serviços oferecidos |
| ❓ FAQ | Perguntas frequentes (acordeão animado, com rich snippet no Google) |
| 📬 Contato | Formulário (via [Formspree](https://formspree.io)) + links diretos |

## 🎮 Trocando os vídeos dos projetos

Edite `src/data/content.ts` (array `projects`) para os textos, e `src/components/ProjectCard.tsx` para adicionar `<source src="..." type="video/mp4" />` e `poster="..."` reais em cada `<video>`.

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
- Dados estruturados `schema.org` (`Person` + `FAQPage`)
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

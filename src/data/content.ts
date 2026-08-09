import itacaVideo from '../assets/itaca-video.mp4';

export const techList = [
  'JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'NODE.JS', 'JAVA', 'SPRING',
  'PYTHON', 'SQL', 'POSTGRESQL', 'REST APIS', 'GIT', 'DOCKER', 'HTML/CSS',
];

export const stack = [
  'FRONTEND', 'BACKEND', 'APIS REST', 'BANCO DE DADOS', 'MOBILE', 'INTEGRAÇÕES',
];

export const steps = [
  {
    number: '01',
    title: 'BRIEFING',
    description: 'Você descreve o projeto, escopo e prazo. Eu retorno com uma avaliação inicial gratuita em até 24 horas.',
  },
  {
    number: '02',
    title: 'DESENVOLVIMENTO',
    description: 'Código limpo, comunicação constante e entregas incrementais para você acompanhar o progresso real.',
  },
  {
    number: '03',
    title: 'ENTREGA',
    description: 'Deploy, testes finais e suporte pós-entrega. Projeto no ar, documentado e pronto para escalar.',
  },
];

// TODO: substituir os slots restantes por vídeos/imagens e textos reais.
export const projects = [
  {
    id: 1,
    title: 'CUIDARIS',
    description: 'SaaS de saúde para assistentes virtuais, profissionais e clínicas.',
    embedUrl: 'https://www.loom.com/embed/6fb8ec3ee9224025bf434c684d7037e6',
  },
  {
    id: 2,
    title: 'VIDEOMAKER EMILY',
    description: 'Landing page / portfólio para social media, criado para videomakeremily.com.',
    embedUrl: 'https://www.loom.com/embed/2469a30a0e0e45a5b0c2bb1878dcfcf1',
  },
  {
    id: 3,
    title: 'ÍTACA',
    description: 'Protótipo de app de navegação — o app que Odisseu usaria pra voltar pra casa.',
    videoUrl: itacaVideo,
  },
  {
    id: 4,
    title: 'FECHOU',
    description: 'Plataforma que facilita a contratação entre freelancers e clientes.',
    embedUrl: 'https://www.loom.com/embed/381aad69c19346fdb43ebd00a9005e7a',
  },
];

export const services = [
  { icon: '🖥️', title: 'DESENVOLVIMENTO FRONTEND', description: 'Interfaces modernas, responsivas e acessíveis com React, HTML/CSS e boas práticas de UX.' },
  { icon: '⚙️', title: 'DESENVOLVIMENTO BACKEND', description: 'APIs robustas, regras de negócio sólidas e arquitetura pensada para escalar com Node.js, Java/Spring e Python.' },
  { icon: '🔗', title: 'INTEGRAÇÕES & APIS', description: 'Conexão com sistemas externos, gateways de pagamento, ERPs, plataformas SaaS e qualquer API REST.' },
  { icon: '🗄️', title: 'BANCO DE DADOS', description: 'Modelagem, otimização de queries, migrações e manutenção em bancos relacionais e não-relacionais.' },
  { icon: '📱', title: 'APLICATIVOS MOBILE', description: 'Apps para Android e iOS com foco em performance e experiência do usuário, usando tecnologias modernas.' },
  { icon: '🚀', title: 'CONSULTORIA TÉCNICA', description: 'Análise de projetos, revisão de código, arquitetura de sistemas e suporte técnico especializado.' },
];

export const faq = [
  {
    question: 'QUANTO CUSTA CONTRATAR UMA DESENVOLVEDORA FREELANCER FULL STACK?',
    answer: 'O valor varia conforme escopo, prazo e complexidade do projeto. Envie os detalhes pelo formulário de contato e eu retorno com uma avaliação inicial gratuita em até 24 horas.',
  },
  {
    question: 'QUANTO TEMPO LEVA PARA DESENVOLVER UM PROJETO?',
    answer: 'Depende do tamanho do projeto: uma landing page pode ficar pronta em poucos dias, enquanto sistemas web completos ou integrações levam algumas semanas. O prazo é definido junto com você antes de começar.',
  },
  {
    question: 'QUAIS TECNOLOGIAS VOCÊ UTILIZA?',
    answer: 'Trabalho com JavaScript, TypeScript, React e Node.js no ecossistema JS, Java com Spring para backends robustos, Python, SQL/PostgreSQL para banco de dados, além de integrações via REST APIs.',
  },
  {
    question: 'VOCÊ ATENDE EMPRESAS E PROJETOS REMOTOS?',
    answer: 'Sim, atendo clientes de qualquer lugar do Brasil e do exterior, 100% remoto, com comunicação por e-mail, WhatsApp ou videochamada.',
  },
];

export const contactLinks = [
  { icon: '📧', label: 'gabrielasdsmuniz@gmail.com', href: 'mailto:gabrielasdsmuniz@gmail.com' },
  { icon: '💼', label: 'linkedin.com/in/gabriela-muniz', href: 'https://www.linkedin.com/in/gabriela-muniz-1ab02a1ab' },
  { icon: '🐙', label: 'github.com/GabrielaMunizFull', href: 'https://github.com/GabrielaMunizFull' },
  { icon: '📸', label: 'instagram.com/muniz.devv', href: 'https://instagram.com/muniz.devv' },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/558194561507' },
];

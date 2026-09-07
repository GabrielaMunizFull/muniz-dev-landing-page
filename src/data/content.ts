import itacaVideo from '../assets/itaca-video.mp4';
import vortemLogo from '../assets/vortem-logo.jpeg';
import vortemLogoWebp from '../assets/vortem-logo.webp';
import projetoNexus from '../assets/projeto-nexus.webp';
import projetoJennifer from '../assets/projeto-jennifer.webp';
import projetoVictoria from '../assets/projeto-victoria.webp';
import projetoCuidaris from '../assets/projeto-cuidaris.webp';
import projetoEmily from '../assets/projeto-emily.webp';
import projetoFechou from '../assets/projeto-fechou.webp';
import projetoGrao from '../assets/projeto-grao.webp';

export const techList = [
  'JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'NODE.JS', 'JAVA', 'SPRING',
  'PYTHON', 'SQL', 'POSTGRESQL', 'REST APIS', 'GIT', 'DOCKER', 'HTML/CSS',
];

/** WhatsApp com mensagem pré-preenchida — ação principal do site. */
export const whatsappUrl =
  'https://wa.me/558194561507?text=Oi%20Gabriela!%20Vim%20pelo%20site%20e%20quero%20falar%20sobre%20um%20projeto.';

/** Placar de credibilidade exibido no HUD. */
export const hudStats = [
  { label: 'XP', value: '6+ ANOS' },
  { label: 'SHIPPED', value: '10+ PROJETOS' },
  { label: 'STACK', value: 'FULL' },
];

/** Manifesto de navegação — cada seção é uma "stage". `id` casa com o id da <section>. */
export const stages = [
  { id: 'player', kicker: 'STAGE 1', title: 'QUEM É O PLAYER' },
  { id: 'fase', kicker: 'STAGE 2', title: 'COMO A FASE FUNCIONA' },
  { id: 'projetos', kicker: 'STAGE 3', title: 'PROJETOS' },
  { id: 'arsenal', kicker: 'STAGE 4', title: 'ARSENAL' },
  { id: 'repos', kicker: 'BONUS', title: 'REPOSITÓRIOS' },
  { id: 'parceiros', kicker: 'CO-OP', title: 'PARCEIROS' },
  { id: 'faq', kicker: 'CONTINUE?', title: 'DÚVIDAS ANTES DO START' },
  { id: 'insert-coin', kicker: 'FINAL BOSS', title: 'INSERT COIN' },
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

export interface Project {
  id: number;
  title: string;
  description: string;
  /** Link pro site no ar ou repositório. Omitido em projetos conceito/fictícios. */
  siteUrl?: string;
  /** Imagem de preview (webp). Usada quando não há videoUrl. */
  image?: string;
  imageAlt?: string;
  /** Vídeo local mp4. Tem prioridade sobre image e mostra botão de play. */
  videoUrl?: string;
  /** Techs "equipadas" no projeto — chips EQUIPPED no card. */
  stack?: string[];
  /** Uma linha de "resultado" — o veredito do card. */
  verdict?: string;
}

export const projects: Project[] = [
  {
    id: 5,
    title: 'NEXUS CONTABILIDADE',
    description: 'Site institucional e captação de leads para contabilidade consultiva: soluções por perfil de cliente, processo em três etapas, FAQ e formulário de proposta segmentado. Domínio próprio.',
    image: projetoNexus,
    imageAlt: 'Página inicial do site da Nexus Contabilidade Consultiva',
    siteUrl: 'https://nexuscontabilidadeconsultiva.com/',
    stack: ['REACT', 'TYPESCRIPT', 'LANDING PAGE', 'SEO'],
    verdict: 'No ar em domínio próprio, captando leads.',
  },
  {
    id: 6,
    title: 'JENNIFER SIQUEIRA',
    description: 'Landing page editorial para estúdio de tatuagem autoral: portfólio, depoimentos e agendamento de consulta, com tipografia serifada e paleta calma.',
    image: projetoJennifer,
    imageAlt: 'Página inicial do site do estúdio de tatuagem Jennifer Siqueira',
    siteUrl: 'https://jennifer-siqueira-landing-page.vercel.app/',
    stack: ['REACT', 'TYPESCRIPT', 'LANDING PAGE', 'UI EDITORIAL'],
    verdict: 'No ar, recebendo agendamentos.',
  },
  {
    id: 7,
    title: 'VICTORIA SOCIAL MEDIA',
    description: 'Landing page de conversão para social media manager: estratégia, case real, portfólio de vídeos, depoimentos e contato direto.',
    image: projetoVictoria,
    imageAlt: 'Página inicial do site da social media Victoria (@viicksocialmedia)',
    siteUrl: 'https://victoria-social-media-site.vercel.app/',
    stack: ['REACT', 'TYPESCRIPT', 'LANDING PAGE', 'CONVERSÃO'],
    verdict: 'No ar, pronta pra converter.',
  },
  {
    id: 1,
    title: 'CUIDARIS',
    description: 'SaaS de gestão pra clínicas: agenda semanal com validação de horário, cadastro de pacientes e profissionais, controle financeiro e emissão de recibo em PDF.',
    image: projetoCuidaris,
    imageAlt: 'Página inicial do SaaS Cuidaris',
    siteUrl: 'https://cuidaris-web.vercel.app/',
    stack: ['REACT', 'NODE.JS', 'POSTGRESQL', 'SAAS', 'PDF'],
    verdict: 'SaaS completo, clínicas usando no dia a dia.',
  },
  {
    id: 4,
    title: 'FECHOU',
    description: 'Plataforma que facilita a contratação entre freelancers e clientes, do briefing à proposta em PDF.',
    image: projetoFechou,
    imageAlt: 'Página inicial da plataforma Fechou',
    siteUrl: 'https://fechou-one.vercel.app/',
    stack: ['REACT', 'NODE.JS', 'SAAS', 'PDF', 'PIX'],
    verdict: 'Plataforma no ar, do briefing ao pagamento.',
  },
  {
    id: 8,
    title: 'GRÃO & OFÍCIO',
    description: 'Landing page conceito para torrefação artesanal de café: identidade editorial própria, catálogo de microlotes, linha do tempo da torra e pontos de venda. Projeto fictício de identidade personalizada.',
    image: projetoGrao,
    imageAlt: 'Página inicial do site conceito Grão & Ofício, torrefação artesanal',
    stack: ['HTML', 'CSS', 'IDENTIDADE VISUAL', 'CONCEITO'],
    verdict: 'Peça de identidade — projeto fictício.',
  },
  {
    id: 3,
    title: 'ÍTACA',
    description: 'Protótipo de app de navegação — o app que Odisseu usaria pra voltar pra casa.',
    videoUrl: itacaVideo,
    siteUrl: 'https://github.com/GabrielaMunizFull/itaca',
    stack: ['PROTÓTIPO', 'MOBILE', 'UI/UX'],
    verdict: 'Protótipo fechado, código no GitHub.',
  },
  {
    id: 2,
    title: 'VIDEOMAKER EMILY',
    description: 'Landing page / portfólio para social media, criado para videomakeremily.com.',
    image: projetoEmily,
    imageAlt: 'Página inicial do site Videomaker Emily',
    stack: ['REACT', 'LANDING PAGE', 'PORTFÓLIO'],
    verdict: 'No ar em videomakeremily.com.',
    siteUrl: 'https://videomakeremily.com/',
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

export const partners = [
  {
    name: 'VORTEM',
    logo: vortemLogo,
    logoWebp: vortemLogoWebp,
    description: 'A agência Vortem é uma agência de marketing estratégico voltada a desenvolver estratégias para um único fim: solucionar o seu problema e trazer os resultados. É exatamente o que entregamos a cada cliente da Gabriela. Venha ser um cliente Vortem você também! Não vendemos posts, vendemos soluções.',
  },
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

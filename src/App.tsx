import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { TechMarquee } from './components/TechMarquee';
import { Sobre } from './components/Sobre';
import { Como } from './components/Como';
import { Projetos } from './components/Projetos';
import { GithubRepos } from './components/GithubRepos';
import { Servicos } from './components/Servicos';
import { Faq } from './components/Faq';
import { Contato } from './components/Contato';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CursorGlow } from './components/CursorGlow';
import { SoundToggle } from './components/SoundToggle';
import { KonamiEgg } from './components/KonamiEgg';
import { AchievementsProvider } from './context/AchievementsContext';

function App() {
  return (
    <AchievementsProvider>
      <ScrollProgress />
      <CursorGlow />
      <SoundToggle />
      <KonamiEgg />
      <div className="scanlines" />
      <Nav />
      <Hero />
      <TechMarquee />
      <Sobre />
      <Como />
      <Projetos />
      <GithubRepos />
      <Servicos />
      <Faq />
      <Contato />
      <Footer />
    </AchievementsProvider>
  );
}

export default App;

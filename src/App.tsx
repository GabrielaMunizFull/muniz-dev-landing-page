import { Hud } from './components/Hud';
import { TitleScreen } from './components/TitleScreen';
import { Sobre } from './components/Sobre';
import { Como } from './components/Como';
import { Projetos } from './components/Projetos';
import { GithubRepos } from './components/GithubRepos';
import { Servicos } from './components/Servicos';
import { Parceiros } from './components/Parceiros';
import { Faq } from './components/Faq';
import { InsertCoin } from './components/InsertCoin';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CrtVignette } from './components/CrtVignette';

function App() {
  return (
    <>
      <ScrollProgress />
      <CrtVignette />
      <div className="cabinet-bezel" aria-hidden="true" />
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <Hud />
      <main id="main" tabIndex={-1}>
        <TitleScreen />
        <Sobre />
        <Como />
        <Projetos />
        <GithubRepos />
        <Servicos />
        <Parceiros />
        <Faq />
        <InsertCoin />
      </main>
      <Footer />
    </>
  );
}

export default App;

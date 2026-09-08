import './index.css';
import { hydrate, render } from 'preact';
import App from './App.tsx';

const rootEl = document.getElementById('root')!;

if (rootEl.hasChildNodes()) {
  hydrate(<App />, rootEl);
} else {
  render(<App />, rootEl);
}

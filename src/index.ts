import './styles/index.scss';
import Header from './components/header/header';
import Footer from './components/footer/footer';

class App {
  public start(): void {
    const body = document.querySelector('body');

    const header = new Header().getElement();
    const footer = new Footer().getElement();

    body?.append(header, footer);
  }
}

const app: App = new App();
app.start();

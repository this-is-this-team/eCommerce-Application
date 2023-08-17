import './styles/index.scss';
import { createRouter } from './router';
import Header from './components/header/header';
import MainPage from './pages/main-page/main-page';
import Footer from './components/footer/footer';

class App {
  public start(): void {
    const header = new Header().getElement();
    const main = new MainPage().getElement();
    const footer = new Footer().getElement();

    document.body.append(header, main, footer);

    createRouter(main);
  }
}

const app: App = new App();

app.start();

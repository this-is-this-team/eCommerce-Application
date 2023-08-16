import './styles/index.scss';
import { createRouter } from './router';

class App {
  public start(): void {
    const main = document.createElement('main');

    document.body.append(main);

    createRouter(main);
  }
}

const app: App = new App();
app.start();

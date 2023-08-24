import './styles/index.scss';
import { createRouter } from './router';
import Header from './components/header/header';
import MainPage from './pages/main-page/main-page';
import Footer from './components/footer/footer';
import getUser from './services/getUser';
import userStore from './store/user-store';

class App {
  public async start() {
    try {
      const header = new Header().getElement();
      const main = new MainPage().getElement();
      const footer = new Footer().getElement();

      document.body.append(header, main, footer);

      const token = localStorage.getItem('token');
      if (token) {
        const customer = await getUser(JSON.parse(token));
        userStore.dispatch({ type: 'SET_IS_AUTH', isAuth: true });
        userStore.dispatch({ type: 'ADD_CUSTOMER', customer });
      }

      createRouter(main);
    } catch (error) {
      console.error(error);
    }
  }
}

const app: App = new App();

app.start();

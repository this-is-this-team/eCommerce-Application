import './styles/index.scss';
import { createRouter } from './router';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import getUser from './services/getUser';
import userStore from './store/user-store';
import Notification from './components/notification/notification';
import Product from './components/product/product';

class App {
  public async start() {
    const header = new Header().getElement();
    const main = document.createElement('main');
    const form = new Product('0b2e67b2-dfa9-4107-af01-052e4c3463eb').getElement();
    const footer = new Footer().getElement();

    document.body.append(header, main, form, footer);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const customer = await getUser(JSON.parse(token));
        userStore.dispatch({ type: 'SET_IS_AUTH', isAuth: true });
        userStore.dispatch({ type: 'ADD_CUSTOMER', customer });
      }
    } catch (error) {
      if (error instanceof Error) {
        new Notification('error', error.message).showNotification();
      } else {
        console.error(error);
      }
      localStorage.removeItem('token');
    }

    createRouter(main);
  }
}

const app: App = new App();

app.start();

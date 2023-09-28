import { createRouter } from './router';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import getUser from './services/getUser';
import userStore from './store/user-store';
import Notification from './components/notification/notification';
import getCart from './services/basket/getCart';
import cartStore from './store/cart-store';
import './styles/index.scss';

class App {
  public async start() {
    const header = new Header().getElement();
    const main = document.createElement('main');
    const footer = new Footer().getElement();

    document.body.append(header, main, footer);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const customer = await getUser(token);
        userStore.dispatch({ type: 'SET_IS_AUTH', isAuth: true });
        userStore.dispatch({ type: 'ADD_CUSTOMER', customer });
      }
      const cart = await getCart();
      cartStore.dispatch({ type: 'UPDATE_CART', cart });
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

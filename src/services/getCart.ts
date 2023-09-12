import { Cart } from '@commercetools/platform-sdk';
import userStore from '../store/user-store';
import getActiveCart from './getActiveCart';
import createUserCart from './createUserCart';
import Notification from '../components/notification/notification';
import createAnonymusCart from './createAnonymusCart';

export default async function getCart(): Promise<Cart | undefined> {
  let token: string | null;
  let cart: Cart | null;
  const { isAuth } = userStore.getState();

  if (isAuth) {
    token = localStorage.getItem('token');
    if (!token) {
      new Notification('error', 'Something went wrong! Please try to log in or try again later.').showNotification();
      return;
    }

    try {
      cart = await getActiveCart(token);
      return cart;
    } catch {
      cart = await createUserCart(token);
      return cart;
    }
  } else {
    token = localStorage.getItem('tokenAnon');

    if (!token) {
      await createAnonymusCart();
      token = localStorage.getItem('tokenAnon');
      if (!token) {
        new Notification('error', 'Something went wrong! Please try to log in or try again later.').showNotification();
        return;
      }
    }

    cart = await getActiveCart(token);
    return cart;
  }
}

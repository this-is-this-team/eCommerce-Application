import userStore from '../../store/user-store';
import createAnonymusCart from './createAnonymusCart';
import Notification from '../../components/notification/notification';
import { Cart } from '@commercetools/platform-sdk';
import createUserCart from './createUserCart';

export default async function removeCart(): Promise<Cart | undefined> {
  const { isAuth } = userStore.getState();
  let token: string | null;
  let cart: Cart | undefined = undefined;

  if (!isAuth) {
    token = localStorage.getItem('tokenAnon');

    if (!token) {
      token = localStorage.getItem('tokenAnon');

      if (!token) {
        new Notification('error', 'Something went wrong! Please try to log in or try again later.').showNotification();
        return;
      }
    }

    cart = await createAnonymusCart();
  } else {
    token = localStorage.getItem('token');

    if (!token) {
      new Notification('error', 'Something went wrong! Please try to log in or try again later.').showNotification();
      return;
    }

    cart = await createUserCart(token);
  }

  return cart;
}

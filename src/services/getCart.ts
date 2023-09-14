import { Cart } from '@commercetools/platform-sdk';
import userStore from '../store/user-store';
import createUserCart from './createUserCart';
import Notification from '../components/notification/notification';
import createAnonymusCart from './createAnonymusCart';
import getAnonActiveCart from './getAnonActiveCart';
import getActiveCart from './getActiveCart';

export default async function getCart(): Promise<Cart | undefined> {
  let token: string | null;
  let refreshToken: string | null;
  const { isAuth } = userStore.getState();

  if (isAuth) {
    token = localStorage.getItem('token');
    if (!token) {
      new Notification('error', 'Something went wrong! Please try to log in or try again later.').showNotification();
      return;
    }

    try {
      return await getActiveCart(token);
    } catch {
      return await createUserCart(token);
    }
  } else {
    token = localStorage.getItem('tokenAnon');

    if (!token) {
      try {
        return await createAnonymusCart();
      } catch (error) {
        if (error instanceof Error) {
          new Notification(
            'error',
            'Something went wrong! Please try to log in or try again later.'
          ).showNotification();
        } else {
          console.error(error);
        }
        return;
      }
    }

    try {
      return await getActiveCart(token);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'invalid_token') {
          localStorage.removeItem('tokenAnon');
          localStorage.removeItem('token');

          refreshToken = localStorage.getItem('refreshTokenAnon');
          if (!refreshToken) {
            new Notification(
              'error',
              'Something went wrong! Please try to log in or try again later.'
            ).showNotification();
            return;
          }
          return await getAnonActiveCart(refreshToken);
        }
      } else {
        console.error(error);
      }
      return await createAnonymusCart();
    }
  }
}

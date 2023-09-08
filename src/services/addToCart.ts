import { ClientResponse, Cart } from '@commercetools/platform-sdk';
import userStore from '../store/user-store';
import createAnonymusCart from './createAnonymusCart';
import getActiveCart from './getActiveCart';
import apiExistingToken from './apiExistingToken';
import Notification from '../components/notification/notification';
import createUserCart from './createUserCart';

export default async function addToCart(productId: string): Promise<Cart | undefined> {
  const { isAuth } = userStore.getState();
  let cart: Cart;
  let token: string | null;

  if (!isAuth) {
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
  } else {
    token = localStorage.getItem('token');
    if (!token) {
      new Notification('error', 'Something went wrong! Please try to log in or try again later.').showNotification();
      return;
    }

    try {
      cart = await getActiveCart(token);
    } catch {
      cart = await createUserCart(token);
    }
  }

  const response: ClientResponse<Cart> = await apiExistingToken(token)
    .me()
    .carts()
    .withId({
      ID: cart.id,
    })
    .post({
      body: {
        version: cart.version,
        actions: [
          {
            action: 'addLineItem',
            productId,
          },
        ],
      },
    })
    .execute();

  return response?.body;
}

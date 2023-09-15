import { Cart, ClientResponse, DiscountCode } from '@commercetools/platform-sdk';
import userStore from '../store/user-store';
import createAnonymusCart from './basket/createAnonymusCart';
import getActiveCart from './basket/getActiveCart';
import apiExistingToken from './apiExistingToken';
import Notification from '../components/notification/notification';
import createUserCart from './basket/createUserCart';

export default async function getDiscountCode(): Promise<DiscountCode | undefined> {
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

  const response: ClientResponse<DiscountCode> = await apiExistingToken(token)
    .discountCodes()
    .withId({
      ID: cart?.discountCodes[0].discountCode.id || '',
    })
    .get()
    .execute();

  return response?.body;
}

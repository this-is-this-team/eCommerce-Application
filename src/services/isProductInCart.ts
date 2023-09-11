import userStore from '../store/user-store';
import createAnonymusCart from './createAnonymusCart';
import Notification from '../components/notification/notification';
import getActiveCart from './getActiveCart';

export default async function isProductInCart(productId: string): Promise<boolean> {
  const { isAuth } = userStore.getState();
  let token: string | null;

  if (!isAuth) {
    token = localStorage.getItem('tokenAnon');

    if (!token) {
      await createAnonymusCart();
      token = localStorage.getItem('tokenAnon');

      if (!token) {
        new Notification('error', 'Something went wrong! Please try to log in or try again later.').showNotification();
        return false;
      }
    }
  } else {
    token = localStorage.getItem('token');
    if (!token) {
      new Notification('error', 'Something went wrong! Please try to log in or try again later.').showNotification();
      return false;
    }
  }

  try {
    const response = await getActiveCart(token);

    const productsInCart = response.lineItems;

    const result = productsInCart.some((item) => item.productId === productId);

    return result;
  } catch (err) {
    return false;
  }
}

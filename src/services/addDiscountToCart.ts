import { ClientResponse, Cart, MyCartRemoveDiscountCodeAction } from '@commercetools/platform-sdk';
import userStore from '../store/user-store';
import createAnonymusCart from './createAnonymusCart';
import getActiveCart from './getActiveCart';
import apiExistingToken from './apiExistingToken';
import Notification from '../components/notification/notification';
import createUserCart from './createUserCart';

export default async function addDiscountToCart(code: string): Promise<Cart | undefined> {
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

  function removeAllDiscountes(): MyCartRemoveDiscountCodeAction[] | [] {
    const result: MyCartRemoveDiscountCodeAction[] = [];

    cart.discountCodes.forEach((item) => {
      result.push({
        action: 'removeDiscountCode',
        discountCode: {
          typeId: item.discountCode.typeId,
          id: item.discountCode.id,
        },
      });
    });

    return result;
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
          ...removeAllDiscountes(),
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      },
    })
    .execute();

  return response?.body;
}

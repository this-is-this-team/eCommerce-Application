import { ClientResponse, DiscountCode } from '@commercetools/platform-sdk';
import apiExistingToken from './apiExistingToken';
import cartStore from '../store/cart-store';

export default async function getDiscountCode(): Promise<DiscountCode | undefined> {
  const { cart } = cartStore.getState();

  const currentToken = localStorage.getItem('token');
  const parsenToken = currentToken ? currentToken : '';

  const response: ClientResponse<DiscountCode> = await apiExistingToken(parsenToken)
    .discountCodes()
    .withId({
      ID: cart?.discountCodes[0].discountCode.id || '',
    })
    .get()
    .execute();

  return response?.body;
}

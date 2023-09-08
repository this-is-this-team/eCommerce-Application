import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import apiExistingToken from './apiExistingToken';

export default async function createUserCart(token: string): Promise<Cart> {
  const response: ClientResponse<Cart> = await apiExistingToken(token)
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
        country: 'US',
      },
    })
    .execute();

  return response.body;
}

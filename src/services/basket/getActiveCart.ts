import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import apiExistingToken from '../apiExistingToken';

export default async function getActiveCart(token: string): Promise<Cart> {
  const response: ClientResponse<Cart> = await apiExistingToken(token).me().activeCart().get().execute();

  return response.body;
}

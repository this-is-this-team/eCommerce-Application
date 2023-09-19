import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import apiRefreshToken from './apiRefreshToken';
import MyTokenCache from './TokenCache';

export default async function getAnonActiveCart(refreshToken: string): Promise<Cart> {
  const tokenCache = new MyTokenCache();
  const response: ClientResponse<Cart> = await apiRefreshToken(refreshToken, tokenCache)
    .me()
    .activeCart()
    .get()
    .execute();

  const { token } = tokenCache.get();
  if (token) localStorage.setItem('tokenAnon', token);

  return response.body;
}

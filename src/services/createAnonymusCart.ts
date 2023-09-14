import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import apiRootAnonymus from './apiRootAnonymus';
import MyTokenCache from './TokenCache';

export default async function createAnonymusCart(): Promise<Cart> {
  const tokenCache = new MyTokenCache();

  const response: ClientResponse<Cart> = await apiRootAnonymus(tokenCache)
    .me()
    .carts()
    .post({
      body: {
        currency: 'USD',
        country: 'US',
      },
    })
    .execute();

  const { token, refreshToken } = tokenCache.get();
  if (token) localStorage.setItem('tokenAnon', token);
  if (refreshToken) localStorage.setItem('refreshTokenAnon', refreshToken);

  return response.body;
}

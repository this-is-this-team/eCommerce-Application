import { ISigninData } from '../types/interfaces';
import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import apiRootLogin from './apiRootLogin';
import MyTokenCache from './TokenCache';
import saveToken from '../utils/saveToken';

export default async function signinUser(body: ISigninData): Promise<ClientResponse<CustomerSignInResult>> {
  const tokenCache = new MyTokenCache();

  const customer: ClientResponse<CustomerSignInResult> = await apiRootLogin(body.email, body.password, tokenCache)
    .me()
    .login()
    .post({
      body,
    })
    .execute();

  const { token } = tokenCache.get();
  if (token) saveToken(token);

  return customer;
}

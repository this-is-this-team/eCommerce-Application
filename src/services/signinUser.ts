import { ISigninData } from '../types/interfaces';
import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import apiRootLogin from './apiRootLogin';
import MyTokenCache from './TokenCache';
import saveToLocalStorage from '../utils/saveToLocalStorage';

export default async function signinUser(body: ISigninData): Promise<ClientResponse<CustomerSignInResult>> {
  const tokenCache = new MyTokenCache();

  const customer: ClientResponse<CustomerSignInResult> = await apiRootLogin(body.email, body.password, tokenCache)
    .me()
    .login()
    .post({
      body,
    })
    .execute();

  const token = tokenCache.get();
  saveToLocalStorage('token', token.token);

  return customer;
}

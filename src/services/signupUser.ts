import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ISignupData } from '../types/interfaces';
import apiRootRegistration from './apiRootRegistration';
import MyTokenCache from './TokenCache';
import saveToLocalStorage from '../utils/saveToLocalStorage';

export default async function signupUser(body: ISignupData): Promise<ClientResponse<CustomerSignInResult>> {
  const tokenCache = new MyTokenCache();

  const customer: ClientResponse<CustomerSignInResult> = await apiRootRegistration(tokenCache)
    .me()
    .signup()
    .post({
      body,
    })
    .execute();

  const token = tokenCache.get();
  saveToLocalStorage('token', token.token);

  return customer;
}

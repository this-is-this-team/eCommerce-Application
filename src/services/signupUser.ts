import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ISignupData } from '../types/interfaces';
import apiRootRegistration from './apiRootRegistration';
import MyTokenCache from './TokenCache';
import saveToken from '../utils/saveToken';

export default async function signupUser(body: ISignupData): Promise<ClientResponse<CustomerSignInResult>> {
  const tokenCache = new MyTokenCache();

  const customer: ClientResponse<CustomerSignInResult> = await apiRootRegistration(tokenCache)
    .me()
    .signup()
    .post({
      body,
    })
    .execute();

  const { token } = tokenCache.get();
  if (token) saveToken(token);

  return customer;
}

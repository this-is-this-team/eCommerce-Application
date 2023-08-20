import { ISigninData } from '../types/interfaces';
import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import apiRoot from './apiRoot';

export default async function signinUser(body: ISigninData): Promise<ClientResponse<CustomerSignInResult>> {
  const customer: ClientResponse<CustomerSignInResult> = await apiRoot
    .me()
    .login()
    .post({
      body,
    })
    .execute();

  return customer;
}

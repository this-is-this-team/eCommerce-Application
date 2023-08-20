import { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ISignupData } from '../types/interfaces';
import apiRoot from './apiRoot';

export default async function signupUser(body: ISignupData): Promise<ClientResponse<CustomerSignInResult>> {
  const customer: ClientResponse<CustomerSignInResult> = await apiRoot
    .me()
    .signup()
    .post({
      body,
    })
    .execute();

  return customer;
}

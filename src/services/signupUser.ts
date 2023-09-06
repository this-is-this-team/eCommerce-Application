import { Customer } from '@commercetools/platform-sdk';
import { ISignupData } from '../types/interfaces';
import apiRootCredentials from './apiRootCredentials';
import signinUser from './signinUser';

export default async function signupUser(body: ISignupData): Promise<Customer> {
  await apiRootCredentials()
    .me()
    .signup()
    .post({
      body,
    })
    .execute();

  const customer: Customer = await signinUser({
    email: body.email,
    password: body.password,
  });

  return customer;
}

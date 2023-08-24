import { Customer } from '@commercetools/platform-sdk';
import { ISignupData } from '../types/interfaces';
import apiRootSignup from './apiRootSignup';
import signinUser from './signinUser';

export default async function signupUser(body: ISignupData): Promise<Customer> {
  await apiRootSignup()
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

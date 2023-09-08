import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ISigninData } from '../types/interfaces';
import apiRootPassword from './apiRootPassword';
import MyTokenCache from './TokenCache';
import userStore from '../store/user-store';
import apiExistingToken from './apiExistingToken';

export default async function signinUser(body: ISigninData): Promise<Customer> {
  const tokenCache = new MyTokenCache();

  const tokenAnon: string | null = localStorage.getItem('tokenAnon');

  if (tokenAnon) {
    await apiExistingToken(tokenAnon)
      .me()
      .login()
      .post({
        body: {
          email: body.email,
          password: body.password,
          activeCartSignInMode: 'UseAsNewActiveCustomerCart',
        },
      })
      .execute();

    localStorage.removeItem('tokenAnon');
  }

  const response: ClientResponse<CustomerSignInResult> = await apiRootPassword(body.email, body.password, tokenCache)
    .me()
    .login()
    .post({
      body,
    })
    .execute();

  const { token } = tokenCache.get();
  if (token) localStorage.setItem('token', token);
  userStore.dispatch({ type: 'SET_IS_AUTH', isAuth: true });
  userStore.dispatch({ type: 'ADD_CUSTOMER', customer: response?.body?.customer });

  return response?.body?.customer;
}

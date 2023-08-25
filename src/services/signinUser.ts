import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ISigninData } from '../types/interfaces';
import apiRootLogin from './apiRootLogin';
import MyTokenCache from './TokenCache';
import userStore from '../store/user-store';

export default async function signinUser(body: ISigninData): Promise<Customer> {
  const tokenCache = new MyTokenCache();

  const response: ClientResponse<CustomerSignInResult> = await apiRootLogin(body.email, body.password, tokenCache)
    .me()
    .login()
    .post({
      body,
    })
    .execute();

  const { token } = tokenCache.get();
  if (token) localStorage.setItem('token', JSON.stringify(token));
  userStore.dispatch({ type: 'SET_IS_AUTH', isAuth: true });
  userStore.dispatch({ type: 'ADD_CUSTOMER', customer: response?.body?.customer });

  return response?.body?.customer;
}

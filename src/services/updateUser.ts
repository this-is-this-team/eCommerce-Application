import { ClientResponse, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import userStore from '../store/user-store';
import apiExistingToken from './apiExistingToken';

export default async function updateUser(data: MyCustomerUpdateAction[]): Promise<Customer> {
  const { customer } = userStore.getState();

  const currentToken = localStorage.getItem('token');
  const parsenToken = currentToken ? JSON.parse(currentToken) : '';

  const body = {
    body: {
      version: Number(customer?.version),
      actions: data,
    },
  };

  const response: ClientResponse<Customer> = await apiExistingToken(parsenToken).me().post(body).execute();

  userStore.dispatch({ type: 'ADD_CUSTOMER', customer: response.body });

  return response.body;
}

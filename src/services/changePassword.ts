import { ClientResponse, Customer, MyCustomerChangePassword } from '@commercetools/platform-sdk';
import userStore from '../store/user-store';
import apiExistingToken from './apiExistingToken';

export default async function changePassword(currentPassword: string, newPassword: string): Promise<Customer> {
  const { customer } = userStore.getState();

  const currentToken = localStorage.getItem('token');
  const parsenToken = currentToken ? currentToken : '';

  const sendData: { body: MyCustomerChangePassword } = {
    body: {
      version: Number(customer?.version),
      currentPassword,
      newPassword,
    },
  };

  const response: ClientResponse<Customer> = await apiExistingToken(parsenToken)
    .me()
    .password()
    .post(sendData)
    .execute();

  userStore.dispatch({ type: 'ADD_CUSTOMER', customer: response.body });

  return response.body;
}

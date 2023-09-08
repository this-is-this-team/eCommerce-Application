import { ClientResponse, Customer, MyCustomerAddAddressAction, _BaseAddress } from '@commercetools/platform-sdk';
import userStore from '../../store/user-store';
import apiExistingToken from '../apiExistingToken';

export default async function addAddress(data: _BaseAddress): Promise<Customer> {
  const { customer } = userStore.getState();

  const currentToken = localStorage.getItem('token');
  const parsenToken = currentToken ? currentToken : '';

  const action: MyCustomerAddAddressAction = {
    action: 'addAddress',
    address: data,
  };

  const body = {
    body: {
      version: Number(customer?.version),
      actions: [action],
    },
  };

  const response: ClientResponse<Customer> = await apiExistingToken(parsenToken).me().post(body).execute();

  userStore.dispatch({ type: 'ADD_CUSTOMER', customer: response.body });

  return response.body;
}

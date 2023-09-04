import {
  ClientResponse,
  Customer,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
} from '@commercetools/platform-sdk';
import userStore from '../../store/user-store';
import apiExistingToken from '../apiExistingToken';

export default async function setDefaultTypeAddress(type: string, id: string): Promise<Customer> {
  const { customer } = userStore.getState();

  const currentToken = localStorage.getItem('token');
  const parsenToken = currentToken ? JSON.parse(currentToken) : '';

  const action: MyCustomerSetDefaultBillingAddressAction | MyCustomerSetDefaultShippingAddressAction = {
    action: type === 'Billing' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress',
    addressId: id.trim() === '' ? undefined : id,
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

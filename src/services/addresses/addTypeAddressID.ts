import {
  ClientResponse,
  Customer,
  MyBusinessUnitAddBillingAddressIdAction,
  MyBusinessUnitAddShippingAddressIdAction,
} from '@commercetools/platform-sdk';
import userStore from '../../store/user-store';
import apiExistingToken from '../apiExistingToken';

export default async function addTypeAddressID(type: string, id: string): Promise<Customer> {
  const { customer } = userStore.getState();

  const currentToken = localStorage.getItem('token');
  const parsenToken = currentToken ? JSON.parse(currentToken) : '';

  const action: MyBusinessUnitAddBillingAddressIdAction | MyBusinessUnitAddShippingAddressIdAction = {
    action: type === 'Billing' ? 'addBillingAddressId' : 'addShippingAddressId',
    addressId: id,
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

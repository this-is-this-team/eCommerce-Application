import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import apiExistingToken from './apiExistingToken';

export default async function getUser(token: string): Promise<Customer> {
  const customer: ClientResponse<Customer> = await apiExistingToken(token).me().get().execute();

  return customer.body;
}

import { ClientResponse, Product } from '@commercetools/platform-sdk';
import apiRootCredentials from './apiRootCredentials';

export default async function getProductById(ID: string): Promise<Product> {
  const response: ClientResponse<Product> = await apiRootCredentials().products().withId({ ID }).get().execute();

  return response.body;
}

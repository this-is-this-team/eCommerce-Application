import { ClientResponse, Product, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import apiRootCredentials from './apiRootCredentials';

export default async function getProducts(): Promise<Product[]> {
  const response: ClientResponse<ProductPagedQueryResponse> = await apiRootCredentials().products().get().execute();

  return response.body.results;
}

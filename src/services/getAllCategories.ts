import { type Category } from '@commercetools/platform-sdk';
import apiRootCredentials from './apiRootCredentials';

export default async function getAllCategories(): Promise<Category[]> {
  const response = await apiRootCredentials().categories().get().execute();

  return response.body.results;
}

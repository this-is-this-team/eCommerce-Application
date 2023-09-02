import {
  Category,
  type ClientResponse,
  type ProductProjection,
  type ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import apiRootCredentials from './apiRootCredentials';
import getAllCategories from './getAllCategories';

export default async function getProducts(
  categoryName?: string,
  subcategoryName?: string
): Promise<ProductProjection[] | undefined> {
  try {
    const allCategories: Category[] = await getAllCategories();

    let categoryId = '';
    let queryArgs = {};

    if (subcategoryName) {
      categoryId = allCategories.find((item) => item.key === subcategoryName)?.id || '';
      queryArgs = {
        filter: `categories.id:"${categoryId}"`,
      };
    } else if (categoryName) {
      categoryId = allCategories.find((item) => item.key === categoryName)?.id || '';
      queryArgs = {
        filter: `categories.id: subtree("${categoryId}")`,
      };
    } else {
      queryArgs = {};
    }

    const response: ClientResponse<ProductProjectionPagedQueryResponse> = await apiRootCredentials()
      .productProjections()
      .search()
      .get({
        queryArgs,
      })
      .execute();

    return response.body.results;
  } catch (error) {
    console.log(error);
  }
}

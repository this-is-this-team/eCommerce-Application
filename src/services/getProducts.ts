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
  subcategoryName?: string,
  filterPrice: string = '',
  filterDays: string = ''
): Promise<ProductProjection[] | undefined> {
  try {
    const allCategories: Category[] = await getAllCategories();

    let categoryId = '';
    const filter: string[] = [];
    const queryArgs = {
      filter,
    };
    let filterQuery: string = '';

    if (subcategoryName) {
      categoryId = allCategories.find((item) => item.key === subcategoryName)?.id || '';
      queryArgs.filter.push(`categories.id:"${categoryId}"`);
    } else if (categoryName) {
      categoryId = allCategories.find((item) => item.key === categoryName)?.id || '';
      filter.push(`categories.id: subtree("${categoryId}")`);
    }

    if (filterPrice) {
      filterQuery = `variants.price.centAmount:${filterPrice}`;
    }

    if (filterDays) {
      filter.push(`variants.attributes.days:${filterDays}`);
    }

    const response: ClientResponse<ProductProjectionPagedQueryResponse> = await apiRootCredentials()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          ...(filter.length ? { filter } : {}),
          ...(filterQuery ? { 'filter.query': filterQuery } : {}),
        },
      })
      .execute();

    return response.body.results;
  } catch (error) {
    console.log(error);
  }
}

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
  filterDays: string = '',
  sortValue: string = '',
  searchValue: string = ''
): Promise<ProductProjection[] | undefined> {
  try {
    const allCategories: Category[] = await getAllCategories();

    let categoryId = '';
    const filter: string[] = [];
    let filterQuery: string = '';
    let sort: string = '';
    const searchQuery = {
      'text.en': '',
    };

    if (subcategoryName) {
      categoryId = allCategories.find((item) => item.key === subcategoryName)?.id || '';
      filter.push(`categories.id:"${categoryId}"`);
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

    if (sortValue) {
      sort = sortValue;
    }

    if (searchValue) {
      searchQuery['text.en'] = searchValue;
    }

    const response: ClientResponse<ProductProjectionPagedQueryResponse> = await apiRootCredentials()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          ...(filter.length ? { filter } : {}),
          ...(filterQuery ? { 'filter.query': filterQuery } : {}),
          ...(sort ? { sort } : {}),
          ...(searchValue ? searchQuery : {}),
        },
      })
      .execute();

    return response.body.results;
  } catch (error) {
    console.log(error);
  }
}

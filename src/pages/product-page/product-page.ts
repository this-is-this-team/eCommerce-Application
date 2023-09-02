import './product-page.scss';
import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import Product from '../../components/product/product';
import getProductById from '../../services/getProductById';
import { ProductData } from '@commercetools/platform-sdk';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
  {
    pageName: 'Shop',
    pageHref: AppRoutesPath.SHOP,
  },
];

export default class ProductPage extends BaseComponent<'div'> {
  private productData: ProductData | null = null;
  private productId: string = '0b2e67b2-dfa9-4107-af01-052e4c3463eb'; // TODO FUNCTION TO GET ID FROM URL

  constructor() {
    super('div', ['product-page']);

    this.createMarkup();
  }

  private async getProductData(id: string): Promise<void> {
    try {
      const product = await getProductById(id);

      this.productData = product.masterData.current;
    } catch (err) {
      console.log(err); // TODO Redirect to page 404
    }
  }

  private async createMarkup(): Promise<void> {
    await this.getProductData(this.productId);

    const product = new Product(this.productData!).getElement();
    const productName = this.productData?.name.en || 'Unnamed tour';

    const breadcrumbs = new Breadcrumbs(breadcrumbsLinks, productName).getElement();
    const container = new BaseComponent('div', ['product-page__container']).getElement();

    container.append(product);

    this.node.append(breadcrumbs, container);
  }
}

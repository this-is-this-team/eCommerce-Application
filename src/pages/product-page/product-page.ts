import './product-page.scss';
import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import Product from '../../components/product/product';

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
  constructor(id: string) {
    super('div', ['product-page']);

    this.createMarkup(id);
  }

  private async createMarkup(id: string) {
    const product = new Product(id);
    await product.createMarkup(id);
    const productElement = product.getElement();

    const breadcrumbs = new Breadcrumbs(breadcrumbsLinks, product.getProductName()).getElement();
    const container = new BaseComponent('div', ['product-page__container']).getElement();

    container.append(productElement);

    this.node.append(breadcrumbs, container);
  }
}

import './product-page.scss';
import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import Product from '../../components/product/product';
import getProductById from '../../services/getProductById';
import { ProductData } from '@commercetools/platform-sdk';
import { changeUrlEvent } from '../../utils/change-url-event';
import Notification from '../../components/notification/notification';
import categories from '../../constants/categories';
import subcategories from '../../constants/subcategories';
import { ICategory } from '../../types/types';

export default class ProductPage extends BaseComponent<'div'> {
  private productData: ProductData | null = null;
  private productId: string = '';
  private breadcrumbsLinks: IBreadcrumbLink[] = [];
  private isPage: boolean;

  constructor() {
    super('div', ['product-page']);

    this.isPage = this.parseUrl();
    if (this.isPage) {
      this.createMarkup();
    } else {
      changeUrlEvent(AppRoutesPath.NOT_FOUND);
    }
  }

  private parseUrl(): boolean {
    const url: string = window.location.pathname;
    const parts: string[] = url.split('/').filter((part) => part !== '');

    if (parts.length === 4) {
      const categorySlug = parts[parts.length - 3];
      const subcategorySlug = parts[parts.length - 2];
      this.productId = parts[parts.length - 1];

      const currentCategory: ICategory | undefined = categories.find((item) => item.slug === categorySlug);
      const currentSubcategory: ICategory | undefined = subcategories[categorySlug]?.find(
        (item) => item.slug === subcategorySlug
      );

      if (!currentCategory || !currentSubcategory) return false;

      this.breadcrumbsLinks = [
        { pageName: 'Home', pageHref: AppRoutesPath.MAIN },
        { pageName: 'Shop', pageHref: AppRoutesPath.SHOP },
        { pageName: currentCategory.label, pageHref: `/shop/${categorySlug}` },
        { pageName: currentSubcategory.label, pageHref: `/shop/${categorySlug}/${subcategorySlug}` },
      ];

      return true;
    }

    if (parts.length === 3) {
      const categorySlug = parts[parts.length - 2];
      this.productId = parts[parts.length - 1];

      const currentCategory: ICategory | undefined = categories.find((item) => item.slug === categorySlug);

      if (!currentCategory) return false;

      this.breadcrumbsLinks = [
        { pageName: 'Home', pageHref: AppRoutesPath.MAIN },
        { pageName: 'Shop', pageHref: AppRoutesPath.SHOP },
        { pageName: currentCategory.label, pageHref: `/shop/${categorySlug}` },
      ];

      return true;
    }

    if (parts.length === 2) {
      this.productId = parts[parts.length - 1];

      this.breadcrumbsLinks = [
        { pageName: 'Home', pageHref: AppRoutesPath.MAIN },
        { pageName: 'Shop', pageHref: AppRoutesPath.SHOP },
      ];

      return true;
    }

    return true;
  }

  private async getProductData(id: string): Promise<void> {
    try {
      const product = await getProductById(id);

      this.productData = product.masterData.current;
    } catch (err) {
      if (err instanceof Error) new Notification('error', err.message).showNotification();

      changeUrlEvent(AppRoutesPath.NOT_FOUND);
    }
  }

  private async createMarkup(): Promise<void> {
    await this.getProductData(this.productId);

    const product = new Product(this.productData!).getElement();
    const productName = this.productData?.name.en || 'Unnamed tour';

    const breadcrumbs = new Breadcrumbs(this.breadcrumbsLinks, productName).getElement();
    const container = new BaseComponent('div', ['product-page__container']).getElement();

    container.append(product);

    this.node.append(breadcrumbs, container);
  }
}

import { type ProductProjection } from '@commercetools/platform-sdk';
import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import { ICategory } from '../../types/types';
import ProductList from '../../components/product-list/product-list';
import CategoryList from '../../components/category-list/category-list';
import getProducts from '../../services/getProducts';
import subcategories from '../../constants/subcategories';
import categories from '../../constants/categories';
import ShopHero from '../../components/shop-hero/shop-hero';
import { changeUrlEvent } from '../../utils/change-url-event';
import ShopFilters from '../../components/shop-flters/shop-filters';
import shopStore from '../../store/shop-store';
import './catalog-page.scss';
import ShopSort from '../../components/shop-sort/shop-sort';
import ShopSearch from '../../components/shop-search/shop-search';

export default class CatalogPage extends BaseComponent<'div'> {
  private products: ProductProjection[];
  private categorySlug: string;
  private subcategorySlug: string;
  private breadcrumbsLinks: IBreadcrumbLink[];
  private currentPage: string;
  private heroTitleText: string;
  private catalogSection: HTMLElement;

  constructor() {
    super('div', ['catalog-page']);

    this.products = [];
    this.categorySlug = '';
    this.subcategorySlug = '';
    this.breadcrumbsLinks = [{ pageName: 'Home', pageHref: AppRoutesPath.MAIN }];
    this.currentPage = 'Shop';
    this.heroTitleText = 'Shop All';
    this.catalogSection = new ProductList(this.products).getElement();

    shopStore.unsubscribe();
    this.renderPage();
    this.addSubscribtion();
  }

  private renderPage(): void {
    const isPage = this.parseUrl();

    if (!isPage) {
      changeUrlEvent(AppRoutesPath.NOT_FOUND);
    } else {
      this.renderBreadcrumbs();
      this.renderHeroSection();
      this.renderCategoryList();
      this.renderSearchPanel();
      this.renderControls();
      this.renderProductList();
    }
  }

  private parseUrl(): boolean {
    const url: string = window.location.pathname;
    const parts: string[] = url.split('/').filter((part) => part !== '');

    if (parts.length === 3) {
      this.categorySlug = parts[parts.length - 2];
      this.subcategorySlug = parts[parts.length - 1];

      const currentCategory: ICategory | undefined = categories.find((item) => item.slug === this.categorySlug);
      const currentsubCategory: ICategory | undefined = subcategories[this.categorySlug]?.find(
        (item) => item.slug === this.subcategorySlug
      );

      if (!currentCategory || !currentsubCategory) return false;

      this.breadcrumbsLinks = [
        { pageName: 'Home', pageHref: AppRoutesPath.MAIN },
        { pageName: 'Shop', pageHref: AppRoutesPath.SHOP },
        { pageName: currentCategory.label, pageHref: `/shop/${this.categorySlug}` },
      ];
      this.currentPage = currentsubCategory.label;
      this.heroTitleText = this.currentPage;

      return true;
    }

    if (parts.length === 2) {
      this.categorySlug = parts[parts.length - 1];

      const currentCategory: ICategory | undefined = categories.find((item) => item.slug === this.categorySlug);

      if (!currentCategory) return false;

      this.breadcrumbsLinks = [
        { pageName: 'Home', pageHref: AppRoutesPath.MAIN },
        { pageName: 'Shop', pageHref: AppRoutesPath.SHOP },
      ];
      this.currentPage = currentCategory.label;
      this.heroTitleText = this.currentPage;

      return true;
    }

    return true;
  }

  private renderBreadcrumbs(): void {
    const breadcrumbs: HTMLDivElement = new Breadcrumbs(this.breadcrumbsLinks, this.currentPage).getElement();
    this.node.append(breadcrumbs);
  }

  private renderHeroSection(): void {
    const heroSection: HTMLElement = new ShopHero(this.heroTitleText).getElement();
    this.node.append(heroSection);
  }

  private renderControls(): void {
    const shopControls: HTMLDivElement = new BaseComponent('div', ['shop-controls']).getElement();
    const container: HTMLDivElement = new BaseComponent('div', ['shop-controls__container']).getElement();
    const filtersElement: HTMLElement = new ShopFilters().getElement();
    const sortElement: HTMLElement = new ShopSort().getElement();

    container.append(filtersElement, sortElement);
    shopControls.append(container);

    this.node.append(shopControls);
  }

  private renderCategoryList(): void {
    let categoryList: ICategory[] = [];
    let titleCategoryEl: string = 'Categories';

    if (this.categorySlug) {
      categoryList = subcategories[this.categorySlug];
      titleCategoryEl = 'Subcategories';
    } else {
      categoryList = categories;
    }

    const categoryListElement: HTMLDivElement = new CategoryList(
      titleCategoryEl,
      categoryList,
      this.subcategorySlug ? this.subcategorySlug : this.categorySlug
    ).getElement();

    this.node.append(categoryListElement);
  }

  private renderSearchPanel(): void {
    const { searchValue } = shopStore.getState();

    const searchPanel = new ShopSearch(searchValue).getElement();

    this.node.append(searchPanel);
  }

  private async renderProductList(): Promise<void> {
    this.catalogSection.remove();
    const loadingElement = new BaseComponent('div', ['catalog-page__loading'], 'Loading...').getElement();
    this.node.append(loadingElement);

    const { filterPrice, filterDays, sortValue, searchValue } = shopStore.getState();

    this.products =
      (await getProducts(this.categorySlug, this.subcategorySlug, filterPrice, filterDays, sortValue, searchValue)) ||
      [];

    this.catalogSection = new ProductList(this.products).getElement();
    loadingElement.remove();

    this.node.append(this.catalogSection);
  }

  private addSubscribtion(): void {
    shopStore.subscribe(() => {
      this.renderProductList();
    });
  }
}

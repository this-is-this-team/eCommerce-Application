import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import './catalog-page.scss';
import ProductList from '../../components/product-list/product-list';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
];

export default class CatalogPage extends BaseComponent<'div'> {
  private breadcrumbs: HTMLElement;
  private heroSection: HTMLElement;
  private catalogSection: HTMLElement;

  constructor() {
    super('div', ['catalog-page']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks, 'Shop').getElement();
    this.heroSection = new BaseComponent('section', ['shop-hero']).getElement();
    this.renderHeroSection();

    this.catalogSection = new ProductList().getElement();

    this.node.append(this.breadcrumbs, this.heroSection, this.catalogSection);
  }

  private renderHeroSection(): void {
    const container: HTMLDivElement = new BaseComponent('div', ['shop-hero__container']).getElement();
    const wrapper: HTMLDivElement = new BaseComponent('div', ['shop-hero__wrapper']).getElement();
    const content: HTMLDivElement = new BaseComponent('div', ['shop-hero__content']).getElement();
    const title: HTMLHeadingElement = new BaseComponent('h2', ['shop-hero__title'], 'Shop All').getElement();
    const text: HTMLParagraphElement = new BaseComponent(
      'p',
      ['shop-hero__text'],
      'Satisfy your wanderlust with our collection of exclusive tours tailored to quench your thirst for exploration.'
    ).getElement();
    const imageBlock = new BaseComponent('div', ['shop-hero__image']).getElement();

    content.append(title, text);
    wrapper.append(content, imageBlock);
    container.append(wrapper);
    this.heroSection.append(container);
  }
}

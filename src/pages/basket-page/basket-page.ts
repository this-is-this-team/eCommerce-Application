import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import './basket-page.scss';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
];

export default class BasketPage extends BaseComponent<'div'> {
  private breadcrumbs: HTMLElement;
  private basketSection: HTMLElement;

  constructor() {
    super('div', ['basket-page']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks, 'Basket').getElement();

    this.basketSection = new BaseComponent('section', ['basket-section']).getElement();
    this.renderBasketSection();

    this.node.append(this.breadcrumbs, this.basketSection);
  }

  private renderBasketSection(): void {
    const container: HTMLElement = new BaseComponent('div', ['basket-section__container']).getElement();

    // TODO: implement the cart components and add to the container in the following basket-issues

    this.basketSection.append(container);
  }
}

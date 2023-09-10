import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import './basket-page.scss';
import BasketEmpty from '../../components/basket-empty/basket-empty';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
];

export default class BasketPage extends BaseComponent<'div'> {
  private breadcrumbs: HTMLElement;
  private basketSection: HTMLElement;
  private basketContent: HTMLElement;
  private isCart: boolean;

  constructor() {
    super('div', ['basket-page']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks, 'Basket').getElement();
    this.basketSection = new BaseComponent('section', ['basket-section']).getElement();

    this.isCart = false; // TODO: CHECK IS ITEMS IN A CART

    if (this.isCart) {
      this.basketContent = new BaseComponent('div').getElement(); // TODO: BASKET COMPONENT WITH ITEMS
    } else {
      this.basketContent = new BasketEmpty().getElement();
    }

    this.renderBasketSection();

    this.node.append(this.breadcrumbs, this.basketSection);
  }

  private renderBasketSection(): void {
    const basketSectionContainer = new BaseComponent('div', ['basket-section__container']).getElement();
    const basketSectionTitle = new BaseComponent('h3', ['basket-section__title'], 'Shopping Cart').getElement();

    basketSectionContainer.append(basketSectionTitle, this.basketContent);

    this.basketSection.append(basketSectionContainer);
  }
}

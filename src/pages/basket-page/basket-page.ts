import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import './basket-page.scss';
import Button from '../../components/button/button';
import { changeUrlEvent } from '../../utils/change-url-event';

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
    const basketSectionContainer = new BaseComponent('div', ['basket-section__container']).getElement();
    const basketSectionTitle = new BaseComponent(
      'h3',
      ['basket-section__title'],
      'Your Shopping Cart is Empty'
    ).getElement();

    const basketContent = new BaseComponent('div', ['basket-section__content']).getElement();
    const basketIcon = new BaseComponent('div', ['basket-section__icon']).getElement();
    const contentTitle = new BaseComponent(
      'h4',
      ['basket-section__content-title'],
      'Your Shopping Cart is Empty'
    ).getElement();
    const basketSubtitle = new BaseComponent(
      'p',
      ['basket-section__subtitle'],
      'Looks like you haven’t added anything yet, let’s get you started!'
    ).getElement();
    const basketBtn = new Button('button', 'Start Shopping', ['basket-section__button'], false, () =>
      changeUrlEvent(AppRoutesPath.SHOP)
    ).getElement();

    basketContent.append(basketIcon, contentTitle, basketSubtitle, basketBtn);
    basketSectionContainer.append(basketSectionTitle, basketContent);

    this.basketSection.append(basketSectionContainer);
  }
}

import { Cart } from '@commercetools/platform-sdk';
import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import BasketEmpty from '../../components/basket-empty/basket-empty';
import Notification from '../../components/notification/notification';
import userStore from '../../store/user-store';
import './basket-page.scss';
import getActiveCart from '../../services/getActiveCart';
import createUserCart from '../../services/createUserCart';
import createAnonymusCart from '../../services/createAnonymusCart';
import BasketItems from '../../components/basket-items/basket-items';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
];

export default class BasketPage extends BaseComponent<'div'> {
  sectionContainer: HTMLElement;
  private token: string | null;
  private cart: Cart | null;

  constructor() {
    super('div', ['basket-page']);
    this.sectionContainer = new BaseComponent('div', ['basket-section__container']).getElement();

    this.cart = null;
    this.token = null;

    this.renderBreadcrumbs();
    this.renderBasketSection();
    this.renderBasketItems();
  }

  private async getCart(): Promise<void> {
    const { isAuth } = userStore.getState();
    if (isAuth) {
      this.token = localStorage.getItem('token');
      if (!this.token) {
        new Notification('error', 'Something went wrong! Please try to log in or try again later.').showNotification();
        return;
      }

      try {
        this.cart = await getActiveCart(this.token);
      } catch {
        this.cart = await createUserCart(this.token);
      }
    } else {
      this.token = localStorage.getItem('tokenAnon');

      if (!this.token) {
        await createAnonymusCart();
        this.token = localStorage.getItem('tokenAnon');
        if (!this.token) {
          new Notification(
            'error',
            'Something went wrong! Please try to log in or try again later.'
          ).showNotification();
          return;
        }
      }

      this.cart = await getActiveCart(this.token);
    }
  }

  private renderBreadcrumbs(): void {
    const breadcrumbs = new Breadcrumbs(breadcrumbsLinks, 'Basket').getElement();

    this.node.append(breadcrumbs);
  }

  private async renderBasketSection(): Promise<void> {
    const basketSection = new BaseComponent('div', ['basket-section']).getElement();
    const basketSectionTitle = new BaseComponent('h3', ['basket-section__title'], 'Shopping Cart').getElement();

    this.sectionContainer.append(basketSectionTitle);
    basketSection.append(this.sectionContainer);

    this.node.append(basketSection);
  }

  private async renderBasketItems(): Promise<void> {
    const loadingElement = new BaseComponent('div', ['basket-page__loading'], 'Loading...').getElement();
    let basketContent: HTMLElement;

    try {
      this.sectionContainer.append(loadingElement);

      await this.getCart();

      if (this.cart && this.cart.lineItems.length > 0) {
        basketContent = new BasketItems(this.cart.lineItems).getElement();
      } else {
        basketContent = new BasketEmpty().getElement();
      }

      this.sectionContainer.append(basketContent);
    } catch (error) {
      if (error instanceof Error) {
        new Notification('error', error.message).showNotification();
      } else {
        console.error(error);
      }

      basketContent = new BasketEmpty().getElement();
      this.sectionContainer.append(basketContent);
    } finally {
      loadingElement.remove();
    }
  }
}

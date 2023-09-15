import { Cart } from '@commercetools/platform-sdk';
import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import BasketEmpty from '../../components/basket-empty/basket-empty';
import Notification from '../../components/notification/notification';
import BasketItems from '../../components/basket-items/basket-items';
import BasketTotal from '../../components/basket-total/basket-total';
import getCart from '../../services/basket/getCart';
import cartStore from '../../store/cart-store';
import './basket-page.scss';
import changeCartItemQuantity from '../../services/basket/changeCartItemQuantity';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
];

export default class BasketPage extends BaseComponent<'div'> {
  private cart: Cart | undefined;
  private basketMainSection: HTMLElement | undefined;
  private basketTotalSection: HTMLElement | undefined;

  constructor() {
    super('div', ['basket-page']);

    this.cart = undefined;

    this.renderBreadcrumbs();
    this.renderTitle();
    this.renderMainContent();
  }

  private renderBreadcrumbs(): void {
    const breadcrumbs = new Breadcrumbs(breadcrumbsLinks, 'Basket').getElement();

    this.node.append(breadcrumbs);
  }

  private renderTitle(): void {
    const basketTitleSection = new BaseComponent('section', ['basket-page__section']).getElement();
    const basketPageTitle = new BaseComponent('h3', ['basket-page__title'], 'Shopping Cart').getElement();

    basketTitleSection.append(basketPageTitle);

    this.node.append(basketTitleSection);
  }

  private onChangeQuantity = async (id: string, quantity: number): Promise<void> => {
    const loadingElement = new BaseComponent('div', ['basket-page__loading'], 'Loading...').getElement();
    (this.basketMainSection as HTMLElement).innerHTML = '';
    (this.basketTotalSection as HTMLElement).innerHTML = '';

    try {
      this.node.append(loadingElement);

      this.cart = await changeCartItemQuantity(id, quantity);
      cartStore.dispatch({ type: 'UPDATE_CART', cart: this.cart });

      if (this.cart && this.cart.lineItems.length > 0) {
        this.basketMainSection?.append(
          new BasketItems(this.cart.lineItems, (id, quantity) => this.onChangeQuantity(id, quantity)).getElement()
        );
        this.basketTotalSection?.append(new BasketTotal(this.cart).getElement());
      } else {
        this.basketMainSection?.append(new BasketEmpty().getElement());
      }
    } catch (error) {
      if (error instanceof Error) {
        new Notification('error', error.message).showNotification();
        if (error.message === 'invalid_token') {
          localStorage.removeItem('tokenAnon');
          localStorage.removeItem('token');
        }
      } else {
        console.error(error);
      }

      this.basketMainSection?.append(new BasketEmpty().getElement());
    } finally {
      loadingElement.remove();
    }
  };

  private async renderMainContent(): Promise<void> {
    const loadingElement = new BaseComponent('div', ['basket-page__loading'], 'Loading...').getElement();

    try {
      this.node.append(loadingElement);

      this.cart = await getCart();
      cartStore.dispatch({ type: 'UPDATE_CART', cart: this.cart });

      if (this.cart && this.cart.lineItems.length > 0) {
        this.basketMainSection = new BasketItems(this.cart.lineItems, (id, quantity) =>
          this.onChangeQuantity(id, quantity)
        ).getElement();
        this.basketTotalSection = new BasketTotal(this.cart).getElement();
        this.node.append(this.basketMainSection, this.basketTotalSection);
      } else {
        this.basketMainSection = new BasketEmpty().getElement();
        this.node.append(this.basketMainSection);
      }
    } catch (error) {
      if (error instanceof Error) {
        new Notification('error', error.message).showNotification();
        if (error.message === 'invalid_token') {
          localStorage.removeItem('tokenAnon');
          localStorage.removeItem('token');
        }
      } else {
        console.error(error);
      }

      this.basketMainSection = new BasketEmpty().getElement();
      this.node.append(this.basketMainSection);
    } finally {
      loadingElement.remove();
    }
  }
}

import { Cart, LineItem } from '@commercetools/platform-sdk';
import BaseStore, { IStore } from './base-store';

interface ICartState {
  cart: Cart | undefined;
  cartItems: LineItem[] | undefined;
}

interface ICartAction {
  type: string;
  cart?: Cart;
  cartItems?: LineItem[];
  cartItem?: LineItem;
}

const initialState: ICartState = {
  cart: undefined,
  cartItems: undefined,
};

const reducer = (state: ICartState, action: ICartAction): ICartState => {
  const newState: ICartState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    // 'UPDATE_CART' used when:
    // - loading site/reloading from index.ts,
    // - loading Basket Page,
    // - adding/removing products from Shop Page and Detailed Product Page
    case 'UPDATE_CART':
      if (action.cart) {
        newState.cart = action.cart;
        newState.cartItems = action.cart.lineItems;
      }
      return newState;
    // 'REMOVE_ITEM' used when:
    // - removing items from Basket Page
    case 'REMOVE_ITEM':
      if (action.cartItem) {
        newState.cartItems = state.cartItems?.filter((item) => item.id !== action.cartItem?.id);
      }
      // TODO: remember about full cart
      return newState;
    case 'REMOVE_ITEMS':
      newState.cart = undefined;
      newState.cartItems = undefined;
      return newState;
    default:
      return newState;
  }
};

const cartStore: IStore<ICartState, ICartAction> = new BaseStore(reducer, initialState);

export default cartStore;

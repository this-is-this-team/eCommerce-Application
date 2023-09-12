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
    case 'FETCH_CART':
      if (action.cart) {
        newState.cart = action.cart;
        newState.cartItems = action.cart.lineItems;
      }
      return newState;
    case 'ADD_ITEM':
      if (action.cartItem) {
        newState.cartItems?.push(action.cartItem);
      }
      // TODO: remember about full cart
      return newState;
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

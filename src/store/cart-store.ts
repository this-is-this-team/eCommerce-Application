import { Cart, CentPrecisionMoney, LineItem } from '@commercetools/platform-sdk';
import BaseStore, { IStore } from './base-store';

interface ICartState {
  cartItems: LineItem[] | undefined;
  cartTotalPrice: CentPrecisionMoney | undefined;
}

interface ICartAction {
  type: string;
  cart?: Cart;
  cartItems?: LineItem[];
  cartItem?: LineItem;
}

const initialState: ICartState = {
  cartItems: undefined,
  cartTotalPrice: undefined,
};

const reducer = (state: ICartState, action: ICartAction): ICartState => {
  const newState: ICartState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'FETCH_CART':
      if (action.cart) {
        newState.cartItems = action.cart.lineItems;
      }
      return newState;
    case 'ADD_ITEM':
      if (action.cartItem) {
        newState.cartItems?.push(action.cartItem);
      }
      // TODO: remember about total price
      return newState;
    case 'REMOVE_ITEM':
      if (action.cartItem) {
        newState.cartItems = state.cartItems?.filter((item) => item.id !== action.cartItem?.id);
      }
      // TODO: remember about total price
      return newState;
    case 'REMOVE_ITEMS':
      newState.cartItems = undefined;
      newState.cartTotalPrice = undefined;
      return newState;
    default:
      return newState;
  }
};

const cartStore: IStore<ICartState, ICartAction> = new BaseStore(reducer, initialState);

export default cartStore;

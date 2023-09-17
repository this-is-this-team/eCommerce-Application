import { Cart } from '@commercetools/platform-sdk';
import BaseStore, { IStore } from './base-store';

interface ICartState {
  cart: Cart | undefined;
}

interface ICartAction {
  type: string;
  cart?: Cart;
}

const initialState: ICartState = {
  cart: undefined,
};

const reducer = (state: ICartState, action: ICartAction): ICartState => {
  const newState: ICartState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_CART':
      if (action.cart) {
        newState.cart = action.cart;
      }
      return newState;
    case 'REMOVE_ITEMS':
      newState.cart = undefined;
      return newState;
    default:
      return newState;
  }
};

const cartStore: IStore<ICartState, ICartAction> = new BaseStore(reducer, initialState);

export default cartStore;

import BaseStore, { IStore } from './base-store';
import { Customer } from '@commercetools/platform-sdk';

interface IUserState {
  isAuth: boolean;
  customer: Customer | null;
}

interface IUserAction {
  type: string;
  isAuth?: boolean;
  customer?: Customer;
}

const initialState: IUserState = {
  isAuth: false,
  customer: null,
};

const reducer = (state: IUserState, action: IUserAction): IUserState => {
  const newState: IUserState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'SET_IS_AUTH':
      if (action.isAuth !== undefined) newState.isAuth = action.isAuth;
      return newState;
    case 'ADD_CUSTOMER':
      if (action.customer) newState.customer = action.customer;
      return newState;
    case 'REMOVE_CUSTOMER':
      newState.customer = null;
      return newState;
    default:
      return newState;
  }
};

const userStore: IStore<IUserState, IUserAction> = new BaseStore(reducer, initialState);

export default userStore;

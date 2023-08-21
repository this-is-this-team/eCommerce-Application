import BaseStore, { IStore } from './base-store';
import { Customer } from '@commercetools/platform-sdk';

interface IUserState {
  token: string;
  customer: Customer | null;
}

interface IUserAction {
  type: string;
  token?: string;
  customer?: Customer;
}

const initialState: IUserState = {
  token: '',
  customer: null,
};

const reducer = (state: IUserState, action: IUserAction): IUserState => {
  const newState: IUserState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_TOKEN':
      if (action.token) newState.token = action.token;
      return newState;
    case 'REMOVE_TOKEN':
      newState.token = '';
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

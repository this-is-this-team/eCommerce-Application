import BaseStore, { IStore } from './base-store';

interface IUserState {
  token: string;
  customer: object;
}

interface IUserAction {
  type: string;
  payload?: string;
}

const initialState: IUserState = {
  token: '',
  customer: {},
};

const reducer = (state: IUserState, action: IUserAction): IUserState => {
  const newState: IUserState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_TOKEN':
      if (action.payload) newState.token = action.payload;
      return newState;
    case 'REMOVE_TOKEN':
      newState.token = '';
      return newState;
    default:
      return newState;
  }
};

const userStore: IStore<IUserState, IUserAction> = new BaseStore(reducer, initialState);

export default userStore;

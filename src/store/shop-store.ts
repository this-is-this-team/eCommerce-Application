import BaseStore, { IStore } from './base-store';

interface IShopState {
  filterPrice: string;
  filterDays: string;
  sortValue: string;
  searchValue: string;
}

interface IShopAction {
  type: string;
  newFilterPrice?: string;
  newFilterDays?: string;
  newSortValue?: string;
  newSearchValue?: string;
}

const initialState: IShopState = {
  filterPrice: '',
  filterDays: '',
  sortValue: '',
  searchValue: '',
};

const reducer = (state: IShopState, action: IShopAction): IShopState => {
  const newState: IShopState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'SET_FILTER_PRICE':
      if (action.newFilterPrice) newState.filterPrice = action.newFilterPrice;
      return newState;
    case 'SET_FILTER_DAYS':
      if (action.newFilterDays) newState.filterDays = action.newFilterDays;
      return newState;
    case 'SET_SORT_VALUE':
      if (action.newSortValue !== undefined) newState.sortValue = action.newSortValue;
      return newState;
    case 'SET_SEARCH_VALUE':
      if (action.newSearchValue !== undefined) newState.searchValue = action.newSearchValue;
      return newState;
    case 'RESET_FILTER_PRICE':
      newState.filterPrice = '';
      return newState;
    case 'RESET_FILTER_DAYS':
      newState.filterDays = '';
      return newState;
    case 'RESET_ALL_FILTERS':
      newState.filterPrice = '';
      newState.filterDays = '';
      return newState;
    default:
      return newState;
  }
};

const shopStore: IStore<IShopState, IShopAction> = new BaseStore(reducer, initialState);

export default shopStore;

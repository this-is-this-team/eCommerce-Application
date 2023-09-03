import daysFilterOptions from '../../constants/daysFilterOptions';
import priceFilterOptions from '../../constants/priceFilterOptions';
import shopStore from '../../store/shop-store';
import BaseComponent from '../base-component';
import Button from '../button/button';
import Select from '../select/select';
import './shop-filters.scss';

export default class ShopFilters extends BaseComponent<'div'> {
  private formFilter: HTMLFormElement;
  private resetButton: HTMLButtonElement;

  constructor() {
    super('div', ['shop-filters']);

    this.formFilter = new BaseComponent('form', ['shop-filters__form']).getElement();
    this.resetButton = new Button('reset', 'Reset', ['button--reset'], this.checkDisableBtn(), () => {
      this.formFilter.reset();
      shopStore.dispatch({ type: 'RESET_ALL_FILTERS' });
    }).getElement();

    this.renderFilters();
    this.addSubscribtion();
  }

  private checkDisableBtn(): boolean {
    const { filterPrice, filterDays } = shopStore.getState();
    if (filterPrice || filterDays) {
      return false;
    }
    return true;
  }

  private renderFilters(): void {
    const container: HTMLDivElement = new BaseComponent('div', ['shop-filters__container']).getElement();
    const selectPrice: HTMLDivElement = new Select('price', priceFilterOptions).getElement();
    const selectDays: HTMLDivElement = new Select('days', daysFilterOptions).getElement();

    this.formFilter.append(selectPrice, selectDays, this.resetButton);
    container.append(this.formFilter);
    this.node.append(container);
  }

  private addSubscribtion(): void {
    shopStore.subscribe((state) => {
      if (state.filterPrice || state.filterDays) {
        this.resetButton.disabled = false;
      } else {
        this.resetButton.disabled = true;
      }
    });
  }
}

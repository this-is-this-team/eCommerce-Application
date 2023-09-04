import sortShopOptions from '../../constants/sortShopOptions';
import BaseComponent from '../base-component';
import Select from '../select/select';
import './shop-sort.scss';

export default class ShopSort extends BaseComponent<'div'> {
  constructor() {
    super('div', ['shop-sort']);

    this.renderSort();
  }

  private renderSort(): void {
    const selectSortLabel: HTMLSpanElement = new BaseComponent('span', [], 'Sort By:').getElement();
    const selectSort: HTMLDivElement = new Select('sort', sortShopOptions, ['select--sort']).getElement();

    this.node.append(selectSortLabel, selectSort);
  }
}

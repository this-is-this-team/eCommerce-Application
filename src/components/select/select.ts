import shopStore from '../../store/shop-store';
import BaseComponent from '../base-component';
import './select.scss';

interface IOption {
  label: string;
  value: string;
}

export default class SelectField extends BaseComponent<'div'> {
  private selectElement: HTMLSelectElement;

  constructor(name: string = '', options: IOption[], classes: string[] = []) {
    super('div', ['select-field', ...classes]);

    this.selectElement = new BaseComponent('select', ['select-field__select']).getElement();

    this.renderSelect(name, options);
    this.setListener();
  }

  private renderSelect(name: string, options: IOption[]): void {
    this.selectElement.id = name;
    this.selectElement.name = name;

    const optionsElements = options.map((option): HTMLOptionElement => {
      const optionEl = new BaseComponent('option', ['select-field__option'], option.label).getElement();
      optionEl.value = option.value;
      if (name === 'price' && shopStore.getState().filterPrice === option.value) {
        optionEl.selected = true;
      }
      if (name === 'days' && shopStore.getState().filterDays === option.value) {
        optionEl.selected = true;
      }
      if (name === 'sort' && shopStore.getState().sortValue === option.value) {
        optionEl.selected = true;
      }
      return optionEl;
    });

    this.selectElement.append(...optionsElements);

    this.node.append(this.selectElement);
  }

  private setListener(): void {
    this.selectElement.addEventListener('change', (event) => {
      event.preventDefault();
      if (event.currentTarget instanceof HTMLSelectElement && event.currentTarget.id === 'price') {
        shopStore.dispatch({ type: 'SET_FILTER_PRICE', newFilterPrice: event.currentTarget.value });
      }
      if (event.currentTarget instanceof HTMLSelectElement && event.currentTarget.id === 'days') {
        shopStore.dispatch({ type: 'SET_FILTER_DAYS', newFilterDays: event.currentTarget.value });
      }
      if (event.currentTarget instanceof HTMLSelectElement && event.currentTarget.id === 'sort') {
        shopStore.dispatch({ type: 'SET_SORT_VALUE', newSortValue: event.currentTarget.value });
      }
    });
  }
}

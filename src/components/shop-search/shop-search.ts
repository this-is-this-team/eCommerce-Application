import shopStore from '../../store/shop-store';
import BaseComponent from '../base-component';
import Button from '../button/button';
import './shop-search.scss';
import '../input/input.scss';

export default class ShopSearch extends BaseComponent<'div'> {
  private formSearch: HTMLFormElement;
  private searchInput: HTMLInputElement;
  private searchButton: HTMLButtonElement;
  private resetButton: HTMLDivElement;

  constructor(initialValue?: string) {
    super('div', ['shop-search']);

    this.formSearch = new BaseComponent('form', ['shop-search__form']).getElement();
    this.searchInput = new BaseComponent('input', ['form-field__input', 'shop-search__input']).getElement();
    this.searchButton = new Button('submit', 'Search', ['shop-search__button'], true).getElement();
    this.resetButton = new BaseComponent('div', ['shop-search__reset']).getElement();

    this.searchInput.id = 'search';
    this.searchInput.name = 'search';
    this.searchInput.placeholder = 'Search';

    if (initialValue) {
      this.searchInput.value = initialValue;
      this.searchButton.disabled = false;
      this.resetButton.classList.add('shop-search__reset--visible');
    }

    this.renderSearchPanel();
    this.setListeners();
  }

  private renderSearchPanel(): void {
    const container: HTMLDivElement = new BaseComponent('div', ['shop-search__container']).getElement();
    const inputWrapper: HTMLDivElement = new BaseComponent('div', ['shop-search__input-field']).getElement();

    inputWrapper.append(this.searchInput, this.resetButton);
    this.formSearch.append(inputWrapper, this.searchButton);
    container.append(this.formSearch);
    this.node.append(container);
  }

  private getSearchValue(): string | undefined {
    return new FormData(this.formSearch).get('search')?.toString();
  }

  private onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const searchValue = this.getSearchValue();

    if (searchValue !== undefined && searchValue !== shopStore.getState().searchValue) {
      shopStore.dispatch({ type: 'SET_SEARCH_VALUE', newSearchValue: searchValue });
    }
  }

  private resetSearch(): void {
    this.formSearch.reset();
    this.resetButton.classList.remove('shop-search__reset--visible');
    this.searchButton.disabled = true;

    if (shopStore.getState().searchValue !== '') {
      shopStore.dispatch({ type: 'SET_SEARCH_VALUE', newSearchValue: '' });
    }
  }

  private setListeners(): void {
    this.searchInput.addEventListener('input', (event) => {
      if (event.currentTarget instanceof HTMLInputElement && event.currentTarget.value) {
        this.searchButton.disabled = false;
        this.resetButton.classList.add('shop-search__reset--visible');
      } else {
        this.resetSearch();
      }
    });
    this.formSearch.addEventListener('submit', (event) => this.onSubmit(event));
    this.resetButton.addEventListener('click', () => this.resetSearch());
  }
}

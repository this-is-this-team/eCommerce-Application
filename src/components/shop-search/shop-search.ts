import shopStore from '../../store/shop-store';
import BaseComponent from '../base-component';
import Button from '../button/button';
import InputField from '../input/input';
import './shop-search.scss';

export default class ShopSearch extends BaseComponent<'div'> {
  private formSearch: HTMLFormElement;
  private searchButton: HTMLButtonElement;

  constructor() {
    super('div', ['shop-search']);

    this.formSearch = new BaseComponent('form', ['shop-search__form']).getElement();
    this.searchButton = new Button('submit', 'Search', ['shop-search__button'], false, () => {}).getElement();

    this.formSearch.addEventListener('submit', (event) => this.onSubmit(event));

    this.renderSearchPanel();
  }

  private renderSearchPanel(): void {
    const container: HTMLDivElement = new BaseComponent('div', ['shop-search__container']).getElement();
    const searchInput: HTMLDivElement = new InputField('test', 'search', 'Search', '', [
      'shop-search__input',
    ]).getElement();

    this.formSearch.append(searchInput, this.searchButton);
    container.append(this.formSearch);
    this.node.append(container);
  }

  private getSearchValue(): string | undefined {
    return new FormData(this.formSearch).get('search')?.toString();
  }

  private onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const searchValue = this.getSearchValue();

    if (searchValue !== undefined) {
      shopStore.dispatch({ type: 'SET_SEARCH_VALUE', newSearchValue: searchValue });
    }
  }
}

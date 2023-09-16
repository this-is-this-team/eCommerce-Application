import { LineItem } from '@commercetools/platform-sdk';
import BaseComponent from '../../components/base-component';
import Button from '../button/button';
import formatPrice from '../../utils/formatPrice';
import './basket-items.scss';

enum BasketItemQuantityAction {
  DEC = 'decrement',
  INC = 'increment',
}

export default class BasketItems extends BaseComponent<'section'> {
  private onChangeQuantity: (id: string, quantity: number) => void;

  constructor(items: LineItem[], onChangeQuantityCallback: (id: string, quantity: number) => void) {
    super('section', ['basket-items']);

    this.onChangeQuantity = onChangeQuantityCallback;

    this.renderBasketItems(items);
  }

  private renderBasketItems(items: LineItem[]): void {
    const basketItemsContainer = new BaseComponent('div', ['basket-items__container']).getElement();
    const table: HTMLTableElement = this.renderTable(items);

    basketItemsContainer.append(table);

    this.node.append(basketItemsContainer);
  }

  private renderTable(items: LineItem[]): HTMLTableElement {
    const table: HTMLTableElement = new BaseComponent('table', ['basket-items__table']).getElement();
    const tableHead: HTMLTableSectionElement = this.renderTableHead();
    const tableBody: HTMLTableSectionElement = this.renderTableBody(items);

    table.append(tableHead, tableBody);

    return table;
  }

  private renderTableHead(): HTMLTableSectionElement {
    const headers: string[] = ['Product', 'Price', 'Quantity', 'Total', ''];
    const tableHead: HTMLTableSectionElement = new BaseComponent('thead', ['basket-items__table-head']).getElement();
    const tableHeadRow: HTMLTableRowElement = new BaseComponent('tr', ['basket-items__table-row']).getElement();

    headers.forEach((headerText) => {
      const th: HTMLTableCellElement = new BaseComponent('th', ['basket-items__table-th']).getElement();
      th.textContent = headerText;
      tableHeadRow.append(th);
    });

    tableHead.append(tableHeadRow);

    return tableHead;
  }

  private renderTableBody(items: LineItem[]): HTMLTableSectionElement {
    const tableBody: HTMLTableSectionElement = new BaseComponent('tbody', ['basket-items__table-body']).getElement();

    items.forEach((item) => {
      const row: HTMLTableRowElement = new BaseComponent('tr', ['basket-items__table-row']).getElement();

      const infoCell = this.renderInfo(item);
      const priceCell = this.renderPrice(item);
      const quantityCell = this.renderQuantityField(item);
      const totalPriceCell = this.renderTotalPrice(item);
      const removeCell = this.renderRemoveBtn(item);

      row.append(infoCell, priceCell, quantityCell, totalPriceCell, removeCell);
      tableBody.append(row);
    });

    return tableBody;
  }

  private renderInfo(item: LineItem): HTMLTableCellElement {
    const infoElement: HTMLTableCellElement = new BaseComponent('td', [
      'basket-items__table-td',
      'basket-items__product',
    ]).getElement();
    const titleElement: HTMLSpanElement = new BaseComponent('span', ['basket-items__title'], item.name.en).getElement();
    const imageWrapper: HTMLDivElement = new BaseComponent('div', ['basket-items__image-wrapper']).getElement();
    const imageElement: HTMLImageElement = new BaseComponent('img', ['basket-items__image']).getElement();

    if (item.variant.images?.[0]?.url) {
      imageElement.src = item.variant.images?.[0]?.url;
      imageElement.alt = 'tour-image';
      imageWrapper.append(imageElement);
    } else {
      imageWrapper.classList.add('basket-items__image--placeholder');
    }

    infoElement.append(imageWrapper, titleElement);

    return infoElement;
  }

  private renderPrice(item: LineItem): HTMLTableCellElement {
    const priceField: HTMLTableCellElement = new BaseComponent('td', [
      'basket-items__table-td',
      'basket-items__table-td--price',
    ]).getElement();
    const pricesElement: HTMLDivElement = new BaseComponent('div', ['basket-items__prices']).getElement();
    const priceStandard: HTMLSpanElement = new BaseComponent('span', ['basket-items__price']).getElement();
    const priceDisc: HTMLSpanElement = new BaseComponent('span', [
      'basket-items__price',
      'basket-items__price--new',
    ]).getElement();

    if (item.price.value) {
      priceStandard.textContent = formatPrice(
        item.price.value.currencyCode,
        item.price.value.centAmount,
        item.price.value.fractionDigits
      );
      pricesElement.append(priceStandard);
    }

    if (item.price.discounted) {
      priceDisc.textContent = formatPrice(
        item.price.discounted.value.currencyCode,
        item.price.discounted.value.centAmount,
        item.price.discounted.value.fractionDigits
      );
      priceStandard.classList.add('basket-items__price--old');
      pricesElement.append(priceDisc);
    }

    priceField.append(pricesElement);

    return priceField;
  }

  private renderQuantityField(item: LineItem): HTMLTableCellElement {
    const maxQuantity: number = Number(item.variant.attributes?.[3].value);

    const quantityElement: HTMLTableCellElement = new BaseComponent('td', [
      'basket-items__table-td',
      'basket-items__table-td--quantity',
    ]).getElement();

    const quantityField: HTMLDivElement = new BaseComponent('div', ['basket-items__quantity']).getElement();
    const quantityFieldDec: HTMLButtonElement = new Button('button', '-', ['button--quantity'], false, () =>
      this.handleChangeItemQuantity(item, BasketItemQuantityAction.DEC)
    ).getElement();
    const quantityFieldNumber: HTMLSpanElement = new BaseComponent('span', [], `${item.quantity}`).getElement();
    const quantityFieldInc: HTMLButtonElement = new Button(
      'button',
      '+',
      ['button--quantity'],
      maxQuantity === item.quantity,
      () => this.handleChangeItemQuantity(item, BasketItemQuantityAction.INC)
    ).getElement();

    quantityField.append(quantityFieldDec, quantityFieldNumber, quantityFieldInc);

    quantityElement.append(quantityField);
    return quantityElement;
  }

  private renderTotalPrice(item: LineItem): HTMLTableCellElement {
    const priceElement: HTMLTableCellElement = new BaseComponent('td', [
      'basket-items__table-td',
      'basket-items__table-td--total-price',
    ]).getElement();
    const price: HTMLSpanElement = new BaseComponent('span', ['basket-items__price']).getElement();

    if (item.totalPrice.centAmount) {
      price.textContent = formatPrice(
        item.totalPrice.currencyCode,
        item.totalPrice.centAmount,
        item.totalPrice.fractionDigits
      );
      priceElement.append(price);
    }

    return priceElement;
  }

  private renderRemoveBtn(item: LineItem): HTMLTableCellElement {
    const removeField: HTMLTableCellElement = new BaseComponent('td', [
      'basket-items__table-td',
      'basket-items__table-td--remove',
    ]).getElement();
    const removeBtn: HTMLButtonElement = new Button('button', '', ['basket-items__remove']).getElement();
    const iconRemoveBtn: HTMLDivElement = new BaseComponent('div', ['basket-items__remove-icon']).getElement();
    const textRemoveBtn: HTMLSpanElement = new BaseComponent('span', [], 'Remove').getElement();

    const onClick = (id: string) => console.log(`TODO: implement in ISSUE #128, product id: ${id}`);

    removeBtn.addEventListener('click', () => onClick(item.id));

    removeBtn.append(iconRemoveBtn, textRemoveBtn);
    removeField.append(removeBtn);

    return removeField;
  }

  private handleChangeItemQuantity(item: LineItem, action: BasketItemQuantityAction): void {
    if (action === BasketItemQuantityAction.DEC) {
      this.onChangeQuantity(item.id, item.quantity - 1);
    } else {
      this.onChangeQuantity(item.id, item.quantity + 1);
    }
  }
}

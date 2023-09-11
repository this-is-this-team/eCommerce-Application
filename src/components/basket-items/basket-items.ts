import { LineItem } from '@commercetools/platform-sdk';
import BaseComponent from '../../components/base-component';
import formatPrice from '../../services/formatPrice';
import './basket-items.scss';

export default class BasketItems extends BaseComponent<'div'> {
  constructor(items: LineItem[]) {
    super('div', ['basket-items']);

    this.renderBasketItems(items);
  }

  private renderBasketItems(items: LineItem[]): void {
    console.log(items);

    const table: HTMLTableElement = this.renderTable(items);

    this.node.append(table);
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

      row.append(infoCell, priceCell);
      tableBody.append(row);
    });

    return tableBody;
  }

  private renderInfo(item: LineItem): HTMLTableCellElement {
    const infoElement: HTMLTableCellElement = new BaseComponent('td', [
      'basket-items__product',
      'basket-items__table-td',
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
    const priceElement: HTMLTableCellElement = new BaseComponent('td', [
      'basket-items__price',
      'basket-items__table-td',
    ]).getElement();

    if (item.variant.prices?.[0]?.value) {
      priceElement.textContent = formatPrice(
        item.variant.prices?.[0]?.value.currencyCode,
        item.variant.prices?.[0]?.value.centAmount,
        item.variant.prices?.[0]?.value.fractionDigits
      );
    }

    return priceElement;
  }
}

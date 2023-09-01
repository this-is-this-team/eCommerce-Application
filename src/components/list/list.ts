import BaseComponent from '../base-component';
import { ListDataType } from '../../types/types';
import './list.scss';

export default class List extends BaseComponent<'ul'> {
  constructor(data: ListDataType) {
    super('ul', ['list']);
    this.node.append(...this.createList(data));
  }

  private createList(data: ListDataType): HTMLElement[] {
    const listOfElements: HTMLElement[] = [];

    for (const key in data) {
      const newElement = new BaseComponent('li', ['list-item']).getElement();
      const newElementKey = new BaseComponent('p', ['list-item__key'], key).getElement();
      const newElementValue = new BaseComponent('p', ['list-item__value'], data[key]).getElement();

      newElement.append(newElementKey, newElementValue);

      listOfElements.push(newElement);
    }

    return listOfElements;
  }
}

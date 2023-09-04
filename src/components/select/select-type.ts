import BaseComponent from '../base-component';
import './select.scss';

export default class SelectTypeField extends BaseComponent<'div'> {
  private labelElement: HTMLLabelElement;
  private selectElement: HTMLSelectElement;

  constructor(name: string = '', classes: string[] = []) {
    super('div', ['form-field', ...classes]);

    this.labelElement = new BaseComponent('label', ['form-field__label'], 'Type').getElement();
    this.selectElement = new BaseComponent('select', ['form-field__input']).getElement();

    this.setAttributes(name);

    this.createSelectField();

    this.node.append(this.labelElement, this.selectElement);
  }

  public getValue(): string | undefined {
    return this.selectElement.value.trim();
  }

  public setValue(firstValue: boolean | undefined, secondValue: boolean | undefined): void {
    if (firstValue && secondValue) {
      this.selectElement.value = 'Billing, Shipping';
    } else if (firstValue) {
      this.selectElement.value = 'Billing';
    } else {
      this.selectElement.value = 'Shipping';
    }
  }

  private setAttributes(name: string = ''): void {
    this.selectElement.name = name;
    this.selectElement.id = name;
    this.labelElement.setAttribute('for', name);
  }

  private createSelectField(): void {
    const types = ['Billing', 'Shipping', 'Billing, Shipping'];
    types.forEach((type) => {
      const option = new BaseComponent('option', ['form-field__input']).getElement();
      option.value = type;
      option.text = type;
      this.selectElement.appendChild(option);
    });
  }
}

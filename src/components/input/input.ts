import BaseComponent from '../base-component';
import './input.scss';

export default class InputField extends BaseComponent {
  constructor(
    type: string = 'text',
    name: string = '',
    placeholder: string = '',
    label: string = '',
    classes: string[] = []
  ) {
    super('div', ['form-field', ...classes]);

    const labelElement = new BaseComponent('label', ['form-field__label'], label).getElement();
    const inputElement = new BaseComponent('input', ['form-field__input']).getElement();

    if (inputElement instanceof HTMLInputElement) {
      inputElement.type = type;
      inputElement.name = name;
      inputElement.required = true;
      inputElement.placeholder = placeholder;
    }

    this.node.append(labelElement, inputElement);
  }
}

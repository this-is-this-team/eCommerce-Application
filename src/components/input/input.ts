import BaseComponent from '../base-component';
import './input.scss';

export default class InputField extends BaseComponent<'div'> {
  private labelElement: HTMLLabelElement;
  private inputElement: HTMLInputElement;

  constructor(
    type: string = 'text',
    name: string = '',
    placeholder: string = '',
    label: string = '',
    classes: string[] = []
  ) {
    super('div', ['form-field', ...classes]);

    this.labelElement = new BaseComponent('label', ['form-field__label'], label).getElement();
    this.inputElement = new BaseComponent('input', ['form-field__input']).getElement();

    this.inputElement.type = type;
    this.inputElement.name = name;
    this.inputElement.required = true;
    this.inputElement.placeholder = placeholder;

    this.node.append(this.labelElement, this.inputElement);

    if (type === 'password') this.createPasswordCheckbox();
  }

  private createPasswordCheckbox() {
    this.node.classList.add('form-field-password');

    const checkboxBlock = new BaseComponent('div', ['form-field__check']).getElement();

    checkboxBlock.addEventListener('click', () => {
      this.inputElement.type = this.inputElement.type === 'password' ? 'text' : 'password';
      checkboxBlock.classList.toggle('password-visible');
    });

    this.node.append(checkboxBlock);
  }
}

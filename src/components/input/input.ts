import BaseComponent from '../base-component';
import formValidationRules from '../../constants/formValidationRules';
import './input.scss';

export default class InputField extends BaseComponent<'div'> {
  private labelElement: HTMLLabelElement;
  private inputElement: HTMLInputElement;
  private errorElement: HTMLSpanElement;

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
    this.errorElement = new BaseComponent('span', ['form-field__error']).getElement();

    this.inputElement.type = type;
    this.inputElement.name = name;
    this.inputElement.required = true;
    this.inputElement.placeholder = placeholder;

    this.node.append(this.labelElement, this.inputElement);

    if (type === 'password') this.createPasswordCheckbox();
  }

  public isValid(inputName: keyof typeof formValidationRules, value: string): boolean {
    const regex: RegExp = formValidationRules[inputName].rule;

    if (!regex.test(value)) {
      this.showError(inputName);
      this.inputElement.addEventListener('input', () => this.clearError());

      return false;
    }

    return true;
  }

  private showError(inputName: keyof typeof formValidationRules) {
    this.inputElement.classList.add('valid-error');
    this.errorElement.textContent = formValidationRules[inputName].errorText;
    this.node.append(this.errorElement);
  }

  private clearError() {
    this.inputElement.classList.remove('valid-error');
    this.errorElement.textContent = '';
    this.errorElement.remove();
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

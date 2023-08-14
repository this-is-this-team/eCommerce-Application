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

    this.setAttributes(type, name, placeholder);

    if (type === 'date') this.addMinMaxForInputDate();
    if (type === 'password') this.createPasswordCheckbox();
    if (type === 'checkbox') this.node.classList.add('form-field-checkbox');
    if (name === 'country') this.createCountryField();

    this.node.append(this.labelElement, this.inputElement);
  }

  public getValue(inputName: keyof typeof formValidationRules): string | undefined {
    const regex: RegExp = formValidationRules[inputName]?.rule;

    if (regex && !regex.test(this.inputElement.value.trim())) {
      this.showError(inputName);
      this.inputElement.addEventListener('input', () => this.clearError());

      return;
    }

    this.inputElement.removeEventListener('input', () => this.clearError());

    return this.inputElement.value.trim();
  }

  private setAttributes(type: string = 'text', name: string = '', placeholder: string = '') {
    this.inputElement.type = type;
    this.inputElement.name = name;
    this.inputElement.id = name;
    this.inputElement.placeholder = placeholder;
    this.labelElement.setAttribute('for', name);
  }

  private createCountryField() {
    this.node.classList.add('form-field-country');
    this.inputElement.value = 'US';
    this.inputElement.disabled = true;
  }

  private addMinMaxForInputDate() {
    this.inputElement.min = '1900-01-01';
    const thirteenYearsAgo: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 13));
    const formattedDate: string = `${thirteenYearsAgo.getFullYear()}-${(thirteenYearsAgo.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${thirteenYearsAgo.getDate().toString().padStart(2, '0')}`;
    this.inputElement.max = formattedDate;
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

    const checkboxBlock: HTMLDivElement = new BaseComponent('div', ['form-field__check']).getElement();

    checkboxBlock.addEventListener('click', () => {
      this.inputElement.type = this.inputElement.type === 'password' ? 'text' : 'password';
      checkboxBlock.classList.toggle('password-visible');
    });

    this.node.append(checkboxBlock);
  }
}

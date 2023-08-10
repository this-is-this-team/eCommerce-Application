import BaseComponent from '../base-component';
import './button.scss';

export default class Button extends BaseComponent {
  constructor(
    type: 'submit' | 'reset' | 'button' = 'button',
    text: string,
    classes: string[] = [],
    disabled: boolean = false,
    onClick: () => void = () => {}
  ) {
    super('button', ['button', ...classes], text);
    if (this.node instanceof HTMLButtonElement) {
      this.node.type = type;
      this.node.disabled = disabled;
      this.node.addEventListener('click', onClick);
    }
  }
}

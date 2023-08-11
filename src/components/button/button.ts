import BaseComponent from '../base-component';
import './button.scss';

export default class Button extends BaseComponent<'button'> {
  constructor(
    type: 'submit' | 'reset' | 'button' = 'button',
    text: string,
    classes: string[] = [],
    disabled: boolean = false,
    onClick: () => void = () => {}
  ) {
    super('button', ['button', ...classes], text);
    this.node.type = type;
    this.node.disabled = disabled;
    this.node.addEventListener('click', onClick);
  }
}

import BaseComponent from '../base-component';
import './hero-shop.scss';

export default class HeroShop extends BaseComponent<'section'> {
  constructor(titleText: string) {
    super('section', ['shop-hero']);

    this.drawSection(titleText);
  }

  private drawSection(titleText: string): void {
    const container: HTMLDivElement = new BaseComponent('div', ['shop-hero__container']).getElement();
    const wrapper: HTMLDivElement = new BaseComponent('div', ['shop-hero__wrapper']).getElement();
    const content: HTMLDivElement = new BaseComponent('div', ['shop-hero__content']).getElement();
    const title: HTMLHeadingElement = new BaseComponent('h2', ['shop-hero__title'], titleText).getElement();
    const text: HTMLParagraphElement = new BaseComponent(
      'p',
      ['shop-hero__text'],
      'Satisfy your wanderlust with our collection of exclusive tours tailored to quench your thirst for exploration.'
    ).getElement();
    const imageBlock = new BaseComponent('div', ['shop-hero__image']).getElement();

    if (titleText === 'Europe') {
      imageBlock.classList.add('shop-hero__image--europe');
    } else if (titleText === 'Asia') {
      imageBlock.classList.add('shop-hero__image--asia');
    } else if (titleText === 'Africa') {
      imageBlock.classList.add('shop-hero__image--africa');
    } else if (titleText === 'America') {
      imageBlock.classList.add('shop-hero__image--america');
    } else if (titleText === 'Hiking & Trekking') {
      imageBlock.classList.add('shop-hero__image--hiking');
    } else if (titleText === 'Sailing') {
      imageBlock.classList.add('shop-hero__image--sailing');
    } else if (titleText === 'Safari') {
      imageBlock.classList.add('shop-hero__image--africa');
    }

    content.append(title, text);
    wrapper.append(content, imageBlock);
    container.append(wrapper);
    this.node.append(container);
  }
}

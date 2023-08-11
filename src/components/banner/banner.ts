import BaseComponent from '../../components/base-component';
import Button from '../button/button';
import './banner.scss';

export default class Banner extends BaseComponent<'section'> {
  constructor(title: string, text: string) {
    super('section', ['banner']);

    const container = new BaseComponent('div', ['banner__container']).getElement();
    const bannerContent = new BaseComponent('div', ['banner__content']).getElement();
    const bannerTitle = new BaseComponent('h1', ['banner__title'], title).getElement();
    const bannerText = new BaseComponent('p', ['banner__text'], text).getElement();
    const bannerButton = new Button('button', 'Shop All', ['button--white'], true).getElement();
    bannerContent.append(bannerTitle, bannerText, bannerButton);
    container.append(bannerContent);

    this.node.append(container);
  }
}

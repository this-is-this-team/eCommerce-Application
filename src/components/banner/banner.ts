import BaseComponent from '../../components/base-component';
import { AppRoutesPath } from '../../router/types';
import { changeUrlEvent } from '../../utils/change-url-event';
import Button from '../button/button';
import './banner.scss';

export default class Banner extends BaseComponent<'section'> {
  constructor(title: string, text: string, classes: string[] = []) {
    super('section', ['banner', ...classes]);

    this.createMarkup(title, text);
  }

  private createMarkup(title: string, text: string): void {
    const container: HTMLDivElement = new BaseComponent('div', ['banner__container']).getElement();
    const bannerContent: HTMLDivElement = new BaseComponent('div', ['banner__content']).getElement();
    const bannerTitle: HTMLHeadingElement = new BaseComponent('h1', ['banner__title'], title).getElement();
    const bannerText: HTMLParagraphElement = new BaseComponent('p', ['banner__text'], text).getElement();
    const bannerButton: HTMLButtonElement = new Button('button', 'Shop All', ['button--white'], false, () =>
      changeUrlEvent(AppRoutesPath.SHOP)
    ).getElement();

    bannerContent.append(bannerTitle, bannerText, bannerButton);

    container.append(bannerContent);

    this.node.append(container);
  }
}

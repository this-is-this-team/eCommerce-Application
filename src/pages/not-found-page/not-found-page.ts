import BaseComponent from '../../components/base-component';
import Banner from '../../components/banner/banner';
import Button from '../../components/button/button';
import { changeUrlEvent } from '../../utils/change-url-event';
import { AppRoutesPath } from '../../router/types';
import { IBannerContent } from '../../types/interfaces';
import './not-found-page.scss';

interface ISectionContent {
  title: string;
  descr: string;
}

const bannerContent: IBannerContent = {
  title: 'Wanderlust Dreams: Unveil the World with Exclusive Tours',
  text: 'Satisfy your wanderlust with our collection of exclusive tours tailored to quench your thirst for exploration.',
};

const sectionContent: ISectionContent = {
  title: '404: Destination Not Found',
  descr: `Looks like this path hasn't been explored yet. Let's navigate you back to familiar terrain.`,
};

export default class NotFoundPage extends BaseComponent<'div'> {
  private notFoundSection: HTMLElement;
  private bannerSection: HTMLElement;

  constructor() {
    super('div', ['not-found-page']);

    this.notFoundSection = new BaseComponent('section', ['not-found-section']).getElement();
    this.renderSignupSection();

    this.bannerSection = new Banner(bannerContent.title, bannerContent.text).getElement();

    this.node.append(this.notFoundSection, this.bannerSection);
  }

  private renderSignupSection(): void {
    const container: HTMLElement = new BaseComponent('div', ['not-found-section__container']).getElement();

    const notFoundWrapper = new BaseComponent('div', ['not-found-section__wrapper']).getElement();
    const notFoundTitle = new BaseComponent('h1', ['not-found-section__title'], sectionContent.title).getElement();
    const notFoundDescr = new BaseComponent('h3', ['not-found-section__descr'], sectionContent.descr).getElement();
    const notFoundBtn = new Button('button', 'Back to home page', ['button'], false, () =>
      changeUrlEvent(AppRoutesPath.MAIN)
    ).getElement();

    notFoundWrapper.append(notFoundTitle, notFoundDescr, notFoundBtn);

    container.append(notFoundWrapper);

    this.notFoundSection.append(container);
  }
}

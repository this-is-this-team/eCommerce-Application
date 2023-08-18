import BaseComponent from '../../components/base-component';
import Banner from '../../components/banner/banner';
import { IBannerContent } from '../../types/interfaces';
import './main-page.scss';

const bannerContent: IBannerContent = {
  title: 'Wanderlust Dreams: Unveil the World with Exclusive Tours',
  text: 'Satisfy your wanderlust with our collection of exclusive tours tailored to quench your thirst for exploration.',
};

export default class MainPage extends BaseComponent<'div'> {
  private bannerSection: HTMLElement;
  private temporarySection: HTMLElement;

  constructor() {
    super('div', ['main-page']);

    this.bannerSection = new Banner(bannerContent.title, bannerContent.text, ['banner--main-page']).getElement();
    this.temporarySection = new BaseComponent('section', ['temporary-section'], 'Opening soon').getElement();

    this.node.append(this.bannerSection, this.temporarySection);
  }
}

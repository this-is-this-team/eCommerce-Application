import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import './about-us-page.scss';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
];

export default class AboutUsPage extends BaseComponent<'div'> {
  private breadcrumbs: HTMLElement;
  private aboutUsSection: HTMLElement;

  constructor() {
    super('div', ['about-us-page']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks, 'About Us').getElement();

    this.aboutUsSection = new BaseComponent('section', ['about-us-section']).getElement();
    this.renderAboutUsSection();

    this.node.append(this.breadcrumbs, this.aboutUsSection);
  }

  private renderAboutUsSection(): void {
    const container: HTMLElement = new BaseComponent('div', ['about-us-section__container']).getElement();

    // TODO: implement the about-us components and add to the container in the following about-us-issues

    this.aboutUsSection.append(container);
  }
}

import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import AboutUsList from '../../components/about-us/about-us-list';
import './about-us-page.scss';
import AboutUsCollaboration from '../../components/about-us/about-us-collaboration';

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

    this.aboutUsSection = new BaseComponent('section', ['about-us-page__section']).getElement();
    this.renderAboutUsSection();

    this.node.append(this.breadcrumbs, this.aboutUsSection);
  }

  private renderAboutUsSection(): void {
    const container: HTMLElement = new BaseComponent('div', ['about-us-page__container']).getElement();
    const sectionTitle = new BaseComponent(
      'h1',
      ['about-us-page__title'],
      'Discover Our Team: Meet the Faces'
    ).getElement();
    const sectionSubtitle = new BaseComponent('h2', ['about-us-page__subtitle'], 'Behind ').getElement();
    sectionSubtitle.insertAdjacentHTML('beforeend', '<span>this is this.</span>');

    const aboutUsList = new AboutUsList().getElement();
    const aboutUsCollaboration = new AboutUsCollaboration().getElement();

    container.append(sectionTitle, sectionSubtitle, aboutUsList, aboutUsCollaboration);

    // TODO: implement the about-us components and add to the container in the following about-us-issues

    this.aboutUsSection.append(container);
  }
}

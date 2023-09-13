import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import AboutUsList from '../../components/about-us/about-us-list';
import AboutUsCollaboration from '../../components/about-us/about-us-collaboration';
import AboutUsRSSchool from '../../components/about-us/about-us-rsschool-link';
import './about-us-page.scss';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
];

export default class AboutUsPage extends BaseComponent<'div'> {
  private breadcrumbs: HTMLElement;
  private aboutUsContainer: HTMLElement;

  constructor() {
    super('div', ['about-us-page']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks, 'About Us').getElement();

    this.aboutUsContainer = new BaseComponent('div', ['about-us-page__container']).getElement();
    this.renderAboutUsSection();

    this.node.append(this.breadcrumbs, this.aboutUsContainer);
  }

  private renderAboutUsSection(): void {
    const sectionTitle = new BaseComponent(
      'h1',
      ['about-us-page__title'],
      'Discover Our Team: Meet the Faces Behind'
    ).getElement();
    sectionTitle.insertAdjacentHTML('beforeend', '<span> this is this.</span>');

    const aboutUsList = new AboutUsList().getElement();
    const aboutUsCollaboration = new AboutUsCollaboration().getElement();
    const aboutUsRSSchool = new AboutUsRSSchool().getElement();

    this.aboutUsContainer.append(sectionTitle, aboutUsList, aboutUsCollaboration, aboutUsRSSchool);
  }
}

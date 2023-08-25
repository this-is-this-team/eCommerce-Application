import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import SignupForm from '../../components/form/signup-form';
import Banner from '../../components/banner/banner';
import { IBannerContent, IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';
import './signup-page.scss';

const breadcrumbsLinks: IBreadcrumbLink[] = [
  {
    pageName: 'Home',
    pageHref: AppRoutesPath.MAIN,
  },
];

const bannerContent: IBannerContent = {
  title: 'Discover the World: Book Unforgettable Journeys Today!',
  text: 'Our expertly crafted itineraries take you beyond the ordinary, unveiling the hidden gems of captivating destinations across the globe.',
};

export default class SignupPage extends BaseComponent<'div'> {
  private breadcrumbs: HTMLElement;
  private signupSection: HTMLElement;
  private bannerSection: HTMLElement;

  constructor() {
    super('div', ['signup-page']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks, 'Create Account').getElement();

    this.signupSection = new BaseComponent('section', ['signup-section']).getElement();
    this.renderSignupSection();

    this.bannerSection = new Banner(bannerContent.title, bannerContent.text).getElement();

    this.node.append(this.breadcrumbs, this.signupSection, this.bannerSection);
  }

  private renderSignupSection(): void {
    const container: HTMLElement = new BaseComponent('div', ['signup-section__container']).getElement();

    const signupForm = new SignupForm().getElement();

    container.append(signupForm);

    this.signupSection.append(container);
  }
}

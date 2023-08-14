import BaseComponent from '../../base-component';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import SignupForm from '../../form/signup-form';
import Banner from '../../banner/banner';
import './signup-page.scss';

const breadcrumbsLinks = [
  {
    pageName: 'Home',
    pageHref: '/',
  },
  {
    pageName: 'Create Account',
  },
];

const bannerContent = {
  title: 'Discover the World: Book Unforgettable Journeys Today!',
  text: 'Our expertly crafted itineraries take you beyond the ordinary, unveiling the hidden gems of captivating destinations across the globe.',
};

export default class SignupPage extends BaseComponent<'main'> {
  private breadcrumbs: HTMLElement;
  private signupSection: HTMLElement;
  private bannerSection: HTMLElement;

  constructor() {
    super('main', ['signup-main']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks).getElement();

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

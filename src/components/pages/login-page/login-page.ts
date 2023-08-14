import BaseComponent from '../../base-component';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import LoginForm from '../../form/login-form';
import Banner from '../../banner/banner';
import './login-page.scss';

const breadcrumbsLinks = [
  {
    pageName: 'Home',
    pageHref: '/',
  },
  {
    pageName: 'Log In',
  },
];

const bannerContent = {
  title: 'Discover the World: Book Unforgettable Journeys Today!',
  text: 'Our expertly crafted itineraries take you beyond the ordinary, unveiling the hidden gems of captivating destinations across the globe.',
};

export default class LoginPage extends BaseComponent<'main'> {
  private breadcrumbs: HTMLElement;
  private loginSection: HTMLElement;
  private bannerSection: HTMLElement;

  constructor() {
    super('main', ['signup-main']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks).getElement();

    this.loginSection = new BaseComponent('section', ['login-section']).getElement();
    this.renderSignupSection();

    this.bannerSection = new Banner(bannerContent.title, bannerContent.text).getElement();

    this.node.append(this.breadcrumbs, this.loginSection, this.bannerSection);
  }

  private renderSignupSection(): void {
    const container: HTMLElement = new BaseComponent('div', ['login-section__container']).getElement();

    const signupForm: HTMLDivElement = new LoginForm().getElement();

    container.append(signupForm);

    this.loginSection.append(container);
  }
}

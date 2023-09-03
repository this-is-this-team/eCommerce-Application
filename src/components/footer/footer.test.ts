import Footer from './footer';

describe('Footer', () => {
  const footer = new Footer().getElement();

  it('renders without crashing', () => {
    expect(footer).toBeDefined();
  });

  it('contains footer information', () => {
    const footerInformation: HTMLElement | null = footer.querySelector('.footer__information');

    expect(footerInformation).toBeTruthy();
  });

  it('contains a link to the login page', () => {
    const loginLink: HTMLElement | null = footer.querySelector('.menu__link[href="/login"]');

    expect(loginLink).toBeTruthy();
  });

  it('contains a link to the signUp page', () => {
    const registrationLink: HTMLElement | null = footer.querySelector('.menu__link[href="/registration"]');

    expect(registrationLink).toBeTruthy();
  });

  it('renders correct number of menu items', () => {
    const menuItems = footer.querySelectorAll('.menu__item');

    expect(menuItems.length).toBe(15);
  });
});

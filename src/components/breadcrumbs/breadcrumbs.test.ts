import Breadcrumbs from './breadcrumbs';
import { IBreadcrumbLink } from '../../types/interfaces';
import { AppRoutesPath } from '../../router/types';

describe('Breadcrumbs component', () => {
  const breadcrumbLinks: IBreadcrumbLink[] = [
    { pageName: 'Home', pageHref: AppRoutesPath.MAIN },
    { pageName: 'Login', pageHref: AppRoutesPath.LOGIN },
  ];

  const breadcrumbs: HTMLDivElement = new Breadcrumbs(breadcrumbLinks, 'Test').getElement();

  it('should render correct html', () => {
    const expectedHTML =
      '<div class="breadcrumbs"><div class="breadcrumbs__container"><div class="breadcrumbs__links"><a class="link link--breadcrumbs" href="/">Home</a><a class="link link--breadcrumbs" href="/login">Login</a><p class="breadcrumbs__current">Test</p></div></div></div>';

    expect(breadcrumbs.outerHTML).toContain(expectedHTML);
  });

  it('should render correct links amount', () => {
    const linksElement: HTMLDivElement | null = breadcrumbs.querySelector('.breadcrumbs__links');

    expect(linksElement?.childNodes.length).toEqual(breadcrumbLinks.length + 1);
  });

  it('should render correct currentPage', () => {
    const currentPage: HTMLParagraphElement | null = breadcrumbs.querySelector('.breadcrumbs__current');

    expect(currentPage?.textContent).toBe('Test');
  });
});

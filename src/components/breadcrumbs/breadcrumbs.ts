import BaseComponent from '../base-component';
import Link from '../link/link';
import './breadcrumbs.scss';

interface IBreadcrumbLink {
  pageName: string;
  pageHref?: string;
}

export default class Breadcrumbs extends BaseComponent<'div'> {
  constructor(links: IBreadcrumbLink[]) {
    super('div', ['breadcrumbs']);

    this.renderBreadcrumbs(links);
  }

  renderBreadcrumbs(links: IBreadcrumbLink[]) {
    const container: HTMLDivElement = new BaseComponent('div', ['breadcrumbs__container']).getElement();
    const linksElement: HTMLDivElement = new BaseComponent('div', ['breadcrumbs__links']).getElement();
    const activeLinks: IBreadcrumbLink[] = links.slice(0, links.length - 1);
    const activeLinksElements: HTMLAnchorElement[] = activeLinks.map((link) =>
      new Link('Home', ['link--breadcrumbs'], link.pageHref).getElement()
    );
    const currentPage: HTMLParagraphElement = new BaseComponent(
      'p',
      ['breadcrumbs__current'],
      links.at(-1)?.pageName
    ).getElement();

    linksElement.append(...activeLinksElements, currentPage);

    container.append(linksElement);

    this.node.append(container);
  }
}

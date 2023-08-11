import BaseComponent from '../base-component';
import Link from '../link/link';
import './breadcrumbs.scss';

interface breadcrumbLink {
  pageName: string;
  pageHref?: string;
}

export default class Breadcrumbs extends BaseComponent<'div'> {
  constructor(links: breadcrumbLink[]) {
    super('div', ['breadcrumbs']);

    this.renderBreadcrumbs(links);
  }

  renderBreadcrumbs(links: breadcrumbLink[]) {
    const container = new BaseComponent('div', ['breadcrumbs__container']).getElement();
    const linksElement = new BaseComponent('div', ['breadcrumbs__links']).getElement();
    const activeLinks = links.slice(0, links.length - 1);
    const activeLinksElements = activeLinks.map((link) =>
      new Link('Home', ['link--breadcrumbs'], link.pageHref).getElement()
    );
    const currentPage = new BaseComponent('p', ['breadcrumbs__current'], links.at(-1)?.pageName).getElement();

    linksElement.append(...activeLinksElements, currentPage);

    container.append(linksElement);

    this.node.append(container);
  }
}

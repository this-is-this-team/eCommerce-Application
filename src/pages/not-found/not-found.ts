import BaseComponent from '../../components/base-component';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';

const breadcrumbsLinks = [
  {
    pageName: 'Home',
    pageHref: '/',
  },
  {
    pageName: 'Not_Found',
  },
];

export default class NotFoundPage extends BaseComponent<'div'> {
  private breadcrumbs: HTMLElement;

  constructor() {
    super('div', ['not-found-main']);

    this.breadcrumbs = new Breadcrumbs(breadcrumbsLinks).getElement();

    this.node.append(this.breadcrumbs);
  }
}

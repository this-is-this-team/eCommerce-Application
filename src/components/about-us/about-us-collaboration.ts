import BaseComponent from '../base-component';
import aboutUsMethods from '../../constants/aboutUsMethods';
import './about-us.scss';

export default class AboutUsCollaboration extends BaseComponent<'section'> {
  constructor() {
    super('section', ['about-us-collaboration']);
    this.renderAboutUsCollaboration();
  }

  private renderAboutUsCollaboration = (): void => {
    const title = new BaseComponent('h2', ['about-us-collaboration__title'], 'Collaboration').getElement();
    const blockquote = new BaseComponent('blockquote', ['about-us-collaboration__blockquote']).getElement();
    blockquote.insertAdjacentHTML(
      'afterbegin',
      `
        <p>"Great things in business are never done alone, they’re done by a team"</p>
        <footer>— <cite>Steve Jobs</cite></footer>
      `
    );

    const methods = new BaseComponent('div', ['about-us-methods']).getElement();
    const methodsTitle = new BaseComponent(
      'h4',
      ['about-us-methods__title'],
      'Our effective collaboration methods:'
    ).getElement();
    const methodsWrapp = new BaseComponent('ul', ['about-us-methods__list']).getElement();

    aboutUsMethods.forEach((obj, index) => {
      const methodsItem = new BaseComponent('li', ['about-us-methods-item']).getElement();
      const methodsItemIndex = new BaseComponent(
        'span',
        ['about-us-methods-item__index'],
        String(index + 1)
      ).getElement();
      const methodsItemTextWrapp = new BaseComponent('div', ['about-us-methods-item-wrapp']).getElement();
      const methodsItemTitle = new BaseComponent('p', ['about-us-methods-item__title'], obj.title).getElement();
      const methodsItemDescr = new BaseComponent('p', ['about-us-methods-item__descr'], obj.description).getElement();

      methodsItemTextWrapp.append(methodsItemTitle, methodsItemDescr);
      methodsItem.append(methodsItemIndex, methodsItemTextWrapp);

      methodsWrapp.append(methodsItem);
    });

    methods.append(methodsTitle, methodsWrapp);

    this.node.append(title, blockquote, methods);
  };
}

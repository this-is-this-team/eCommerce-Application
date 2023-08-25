import BaseComponent from '../base-component';
import './product-card.scss';

export default class ProductCard extends BaseComponent<'div'> {
  constructor(title: string, description: string, image?: string) {
    super('div', ['product-card']);

    this.createMarkup(title, description, image);
  }

  private createMarkup(title: string, description: string, image?: string) {
    const cardMedia = new BaseComponent('div', ['product-card__media']).getElement();
    const cardImage: HTMLImageElement = new BaseComponent('img', ['product-card__image']).getElement();
    if (image) {
      cardImage.src = image;
      cardMedia.append(cardImage);
    }

    const cardContent = new BaseComponent('div', ['product-card__content']).getElement();
    const cardTitle = new BaseComponent('h4', ['product-card__title'], title).getElement();
    const cardDescription = new BaseComponent('p', ['product-card__description'], description).getElement();

    cardContent.append(cardTitle, cardDescription);

    this.node.append(cardMedia, cardContent);
  }
}

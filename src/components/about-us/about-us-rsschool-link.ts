import BaseComponent from '../base-component';
import './about-us.scss';

export default class AboutUsRSSchool extends BaseComponent<'div'> {
  constructor() {
    super('div', ['about-us-rsschool']);
    this.renderAboutUsRsschool();
  }

  private renderAboutUsRsschool(): void {
    const rsschoolLink = new BaseComponent('a', ['about-us-rsschool__link']).getElement();
    rsschoolLink.href = 'https://rs.school/js/';
    rsschoolLink.target = '_blank';

    const rsschoolText = new BaseComponent(
      'h4',
      ['about-us-rsschool__text'],
      'The project is being developed as part of the final task of the course JavaScript/Front-end (2023Q1) from the RS School.'
    ).getElement();

    this.node.append(rsschoolLink, rsschoolText);
  }
}

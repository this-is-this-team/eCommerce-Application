import aboutUsMembers from '../../constants/aboutUsMembers';
import BaseComponent from '../base-component';
import AboutUsMember from './about-us-member';
import './about-us.scss';

export default class AboutUsList extends BaseComponent<'section'> {
  constructor() {
    super('section', ['about-us-list']);
    this.renderAboutUsList();
  }

  private renderAboutUsList = (): void => {
    aboutUsMembers.forEach((obj) => this.node.append(new AboutUsMember(obj).getElement()));
  };
}

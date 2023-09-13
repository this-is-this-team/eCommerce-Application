import BaseComponent from '../base-component';
import { IAboutUsMember } from '../../types/interfaces';
import './about-us.scss';

export default class AboutUsMember extends BaseComponent<'div'> {
  constructor(member: IAboutUsMember) {
    super('div', ['about-us-member']);
    this.renderAboutUsMember(member);
  }

  private renderAboutUsMember = (member: IAboutUsMember): void => {
    const memberHeader = new BaseComponent('div', ['about-us-member__header']).getElement();
    const memberHeaderImg = new BaseComponent('div', ['about-us-member__img', member.imgClass]).getElement();
    const memberHeaderWrapp = new BaseComponent('div', ['about-us-member__header-wrapp']).getElement();
    const memberHeaderName = new BaseComponent('h3', ['about-us-member__title'], member.name).getElement();
    const memberHeaderRole = new BaseComponent('p', ['about-us-member__role'], member.role).getElement();
    memberHeaderWrapp.append(memberHeaderName, memberHeaderRole);
    memberHeader.append(memberHeaderImg, memberHeaderWrapp);

    const memberAbout = new BaseComponent('div', ['about-us-member__about']).getElement();
    const memberAboutLabel = new BaseComponent('span', ['about-us-member__label'], 'About').getElement();
    const memberAboutText = new BaseComponent('p', ['about-us-member__text'], member.about).getElement();
    memberAbout.append(memberAboutLabel, memberAboutText);

    const memberContributions = new BaseComponent('div', ['about-us-member__contributions']).getElement();
    const memberContributionsLabel = new BaseComponent(
      'span',
      ['about-us-member__label'],
      'Contributions'
    ).getElement();
    const memberContributionsList = new BaseComponent('ul', ['about-us-member__contributions-list']).getElement();
    member.contributions.forEach((contribution) => {
      memberContributionsList.append(new BaseComponent('li', [], contribution).getElement());
    });
    memberContributions.append(memberContributionsLabel, memberContributionsList);

    const memberGithubLink = new BaseComponent('a', ['about-us-member__link'], 'GitHub Profile').getElement();
    memberGithubLink.href = member.link;
    memberGithubLink.target = '_blank';

    this.node.append(memberHeader, memberAbout, memberContributions, memberGithubLink);
  };
}

import { IAboutUsMember } from '../types/interfaces';

const aboutUsMembers: IAboutUsMember[] = [
  {
    name: 'Andrew Suponev',
    role: 'Team Lead, Front-End Developer',
    imgClass: 'andrew',
    about: `Since childhood I loved to stay up late and create websites using basic HTML and CSS. But, unfortunately, after graduation, my life path and IT missed each other. Now I'm 28 years old, I dream be a web developer and contribute to society by doing what I love.`,
    contributions: [
      'Configured project setup',
      'Implemented interaction with commercetools',
      'Create Signup Page',
      'Created Catalog page',
    ],
    link: 'https://github.com/elsuppo',
  },
  {
    name: 'Yauheni Baltsevich',
    role: 'Front-End Developer',
    imgClass: 'yauheni',
    about:
      'My main goal is to become a Software Engeener. Currently, I live for permanent residence in Poland, it was here that I firmly decided that I would become a Software Engeneer, since this is a profession in which I definitely see myself.',
    contributions: ['Сonfigured Jest', 'Configured TypeScript', 'Created Signin Page', 'Created Detailed Product page'],
    link: 'https://github.com/eugenebalts',
  },
  {
    name: 'Maksim Lisianskii',
    role: 'Front-End Developer',
    imgClass: 'maksim',
    about: `I'm middle Front-end Developer living in Saint-Petersburg. I'm currently learning TypeScript and React and I enjoy making beautiful web sites on HTML,CSS and JavaScript.`,
    contributions: ['Configured Bundler', 'Implemented Routing', 'Created Account Page', 'Created Adresses Page'],
    link: 'https://github.com/MaxLisyanskiy',
  },
];

export default aboutUsMembers;

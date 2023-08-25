import { AppRoutesPath } from '../../../router/types';
import { IMenuItems } from '../../../types/types';

const menuItems: IMenuItems[] = [
  {
    title: 'Shop',
    href: AppRoutesPath.ANCHOR,
    innerItems: [
      {
        title: 'Shop All',
        href: AppRoutesPath.ANCHOR,
      },
      {
        title: 'Best Sellers',
        href: AppRoutesPath.ANCHOR,
      },
      {
        title: 'New Tours',
        href: AppRoutesPath.ANCHOR,
      },
    ],
  },
  {
    title: 'Categories',
    href: AppRoutesPath.ANCHOR,
    innerItems: [
      {
        title: 'Exotic',
        href: AppRoutesPath.ANCHOR,
      },
    ],
  },
  {
    title: 'About Us',
    href: AppRoutesPath.ANCHOR,
  },
];

export default menuItems;

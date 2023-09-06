import { AppRoutesPath } from '../../../router/types';
import { IMenuItems } from '../../../types/types';

const menuItems: IMenuItems[] = [
  {
    title: 'Shop',
    href: AppRoutesPath.SHOP,
    innerItems: [
      {
        title: 'Shop All',
        href: AppRoutesPath.SHOP,
      },
      {
        title: 'Best Sellers',
        href: AppRoutesPath.SHOP,
      },
      {
        title: 'New Tours',
        href: AppRoutesPath.SHOP,
      },
    ],
  },
  {
    title: 'Categories',
    href: AppRoutesPath.SHOP,
    innerItems: [
      {
        title: 'Europe',
        href: '/shop/europe',
      },
      {
        title: 'Asia',
        href: '/shop/asia',
      },
      {
        title: 'America',
        href: '/shop/america',
      },
      {
        title: 'Africa',
        href: '/shop/africa',
      },
    ],
  },
  {
    title: 'About Us',
    href: AppRoutesPath.ANCHOR,
  },
];

export default menuItems;

import { ICategory } from '../types/types';

const subcategories: { [key: string]: ICategory[] } = {
  europe: [
    {
      slug: '',
      label: 'All Tours',
      url: '/shop',
    },
    {
      slug: 'europe',
      label: 'All in Europe',
      url: '/shop/europe',
    },
    {
      slug: 'hiking-trekking-eu',
      label: 'Hiking & Trekking',
      url: '/shop/europe/hiking-trekking-eu',
    },
    {
      slug: 'explorer-eu',
      label: 'Explorer',
      url: '/shop/europe/explorer-eu',
    },
    {
      slug: 'safari-eu',
      label: 'Safari',
      url: '/shop/europe/safari-eu',
    },
    {
      slug: 'sailing-eu',
      label: 'Sailing',
      url: '/shop/europe/sailing-eu',
    },
  ],
  asia: [
    {
      slug: '',
      label: 'All Tours',
      url: '/shop',
    },
    {
      slug: 'asia',
      label: 'All in Asia',
      url: '/shop/asia',
    },
    {
      slug: 'hiking-trekking-as',
      label: 'Hiking & Trekking',
      url: '/shop/asia/hiking-trekking-as',
    },
    {
      slug: 'explorer-as',
      label: 'Explorer',
      url: '/shop/asia/explorer-as',
    },
    {
      slug: 'safari-as',
      label: 'Safari',
      url: '/shop/asia/safari-as',
    },
    {
      slug: 'sailing-as',
      label: 'Sailing',
      url: '/shop/asia/sailing-as',
    },
  ],
  america: [
    {
      slug: '',
      label: 'All Tours',
      url: '/shop',
    },
    {
      slug: 'america',
      label: 'All in America',
      url: '/shop/america',
    },
    {
      slug: 'hiking-trekking-am',
      label: 'Hiking & Trekking',
      url: '/shop/america/hiking-trekking-am',
    },
    {
      slug: 'explorer-am',
      label: 'Explorer',
      url: '/shop/america/explorer-am',
    },
    {
      slug: 'safari-am',
      label: 'Safari',
      url: '/shop/america/safari-am',
    },
    {
      slug: 'sailing-am',
      label: 'Sailing',
      url: '/shop/america/sailing-am',
    },
  ],
  africa: [
    {
      slug: '',
      label: 'All Tours',
      url: '/shop',
    },
    {
      slug: 'africa',
      label: 'All in Africa',
      url: '/shop/africa',
    },
    {
      slug: 'hiking-trekking-af',
      label: 'Hiking & Trekking',
      url: '/shop/africa/hiking-trekking-af',
    },
    {
      slug: 'explorer-af',
      label: 'Explorer',
      url: '/shop/africa/explorer-af',
    },
    {
      slug: 'safari-af',
      label: 'Safari',
      url: '/shop/africa/safari-af',
    },
    {
      slug: 'sailing-af',
      label: 'Sailing',
      url: '/shop/africa/sailing-af',
    },
  ],
};

export default subcategories;

import { ProductProjection } from '@commercetools/platform-sdk';
import ProductCard from './product-card';

describe('ProductCard', () => {
  const mockProduct: ProductProjection = {
    id: '440872b3-7de4-4d35-992f-80221313c0ce',
    version: 13,
    productType: {
      typeId: 'product-type',
      id: '31b96cba-837c-4f7b-be29-45fb85dbea58',
    },
    name: {
      en: 'Wildlife of the Rockies',
    },
    categories: [
      {
        typeId: 'category',
        id: '818991f4-c138-4839-ad69-09809dda6beb',
      },
    ],
    categoryOrderHints: {},
    slug: {
      en: 'america---safari-am---Wildlife-of-the-Rockies',
    },
    metaTitle: {
      en: 'Wildlife of the Rockies',
    },
    metaDescription: {
      en: "Experience North America's diverse wildlife in the Rocky Mountains.",
    },
    variants: [],
    masterVariant: {
      attributes: [
        {
          name: 'rating',
          value: '4.6',
        },
        {
          name: 'reviews',
          value: '70',
        },
        {
          name: 'days',
          value: '6',
        },
        {
          name: 'inStock',
          value: '19',
        },
        {
          name: 'location',
          value: 'Banff, Jasper National Parks, Canada',
        },
        {
          name: 'shortDescription',
          value: "Experience North America's diverse wildlife in the Rocky Mountains.",
        },
        {
          name: 'adventureStyle',
          value: 'Safari',
        },
        {
          name: 'aboutTour',
          value:
            "Route: Depart from Denver, USA, and venture into the Rocky Mountains to observe North America's diverse wildlife. Group Size: Intimate group of 6-8 wildlife enthusiasts. Activities: Wildlife tracking, guided hikes, observing bighorn sheep and elk, learning about Rocky Mountain ecosystems.",
        },
      ],
      assets: [],
      images: [
        {
          url: 'https://firebasestorage.googleapis.com/v0/b/aillery.appspot.com/o/images%2F43%2Fphoto-1682685796002-e05458d61f07.jpg?alt=media&token=18a7f29d-e9be-4694-bc3e-a56f31e70a77',
          dimensions: {
            w: 2071,
            h: 1381,
          },
        },
      ],
      prices: [
        {
          id: '3ce8271a-a18c-4850-aebd-20ae95525ead',
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount: 165000,
            fractionDigits: 2,
          },
          country: 'US',
        },
      ],
      key: 'tour43',
      sku: 'tour-43',
      id: 1,
    },
    searchKeywords: {},
    hasStagedChanges: false,
    published: true,
    taxCategory: {
      typeId: 'tax-category',
      id: 'ed35c239-a7a5-45c8-a820-3f464a87aa8d',
    },
    priceMode: 'Embedded',
    createdAt: '2023-08-30T12:42:27.667Z',
    lastModifiedAt: '2023-09-08T19:38:26.588Z',
  };
  const productCard = new ProductCard(mockProduct).getElement();

  it('should be defined', () => {
    expect(productCard).toBeDefined();
  });
  it('should have the correct title text', () => {
    const titleElement = productCard.querySelector('.product-card__title');
    expect(titleElement?.textContent).toBe('Wildlife of the Rockies');
  });
  it('should have a button with the correct class', () => {
    const buttonElement = productCard.querySelector('.product-card__button');
    expect(buttonElement?.classList.contains('button--cart')).toBe(true);
  });
});

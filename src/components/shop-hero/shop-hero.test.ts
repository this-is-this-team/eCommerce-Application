import ShopHero from './shop-hero';

describe('ShopHero', () => {
  const shopHero: HTMLElement = new ShopHero('Europe').getElement();

  it('should be defined', () => {
    expect(shopHero).toBeDefined();
  });
  it('should have the correct title text', () => {
    const titleElement = shopHero.querySelector('.shop-hero__title');
    expect(titleElement?.textContent).toBe('Europe');
  });
  it('should have the correct image class', () => {
    const imageBlock = shopHero.querySelector('.shop-hero__image');
    expect(imageBlock?.classList.contains('shop-hero__image--europe')).toBe(true);
  });
});

import PromoCodesList from './promo-codes-list';

describe('PromoCodesList Component', () => {
  const promoCodesList = new PromoCodesList().getElement();

  it('should render without errors', () => {
    expect(promoCodesList).toBeDefined();
  });

  it('should have the correct tag name', () => {
    expect(promoCodesList.tagName).toBe('UL');
  });

  it('should have the "promo-codes-list" class', () => {
    expect(promoCodesList.classList.contains('promo-codes-list')).toBe(true);
  });

  it('should render promo code items', () => {
    const promoCodeItems = promoCodesList.querySelectorAll('.promo-codes-item');
    expect(promoCodeItems.length).toBeGreaterThan(0);
  });

  it('should handle copy promo code', () => {
    const clipboardMock = {
      writeText: jest.fn(),
    };
    Object.defineProperty(global.navigator, 'clipboard', {
      value: clipboardMock,
    });

    const promoCodeItem = promoCodesList.querySelector('.promo-codes-item')!;
    const copyButton: HTMLButtonElement | null = promoCodeItem.querySelector('.promo-codes-item__button');

    copyButton!.click();

    expect(clipboardMock.writeText).toHaveBeenCalled();
  });
});

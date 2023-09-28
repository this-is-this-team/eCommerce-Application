import PromoCodes from './promo-codes';

describe('PromoCodes', () => {
  const promoCodes = new PromoCodes().getElement();

  it('should render without errors', () => {
    expect(promoCodes).toBeDefined();
  });

  it('should have the correct tag name', () => {
    expect(promoCodes.tagName).toBe('SECTION');
  });

  it('should have the "promo-codes" class', () => {
    expect(promoCodes.classList.contains('promo-codes')).toBe(true);
  });

  it('should render a title', () => {
    const title = promoCodes.querySelector('.promo-codes__title');
    expect(title).toBeDefined();
    expect(title?.textContent).toBe('Your Passport to Savings: Travel Promo Deals');
  });

  it('should render a PromoCodesList', () => {
    const promoCodesList = promoCodes.querySelector('.promo-codes__container .promo-codes-list');
    expect(promoCodesList).toBeDefined();
  });
});

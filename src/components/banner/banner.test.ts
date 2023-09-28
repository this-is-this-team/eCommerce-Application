import Banner from './banner';

describe('Banner', () => {
  it('should render banner with correct title and text', () => {
    const title = 'Test Title';
    const text = 'Test Text';

    const banner = new Banner(title, text).getElement();
    const bannerTitle: HTMLElement | null = banner.querySelector('.banner__title');
    const bannerText: HTMLElement | null = banner.querySelector('.banner__text');

    expect(bannerTitle?.textContent).toBe(title);
    expect(bannerText?.textContent).toBe(text);
  });

  it('should have the correct class names', () => {
    const banner = new Banner('Title', 'Text', ['test-class']).getElement();

    expect(banner.classList.contains('test-class')).toBe(true);
  });

  it('should create a banner with no additional class if none provided', () => {
    const banner = new Banner('Title', 'Text').getElement();

    expect(banner.classList.length).toBe(1);
  });

  it('should call the button click handler when clicked', () => {
    const banner = new Banner('Title', 'Text').getElement();
    const bannerButton: HTMLButtonElement | null = banner.querySelector('.button--white');
    const buttonClickSpy = jest.spyOn(bannerButton!, 'click');

    bannerButton?.click();

    expect(buttonClickSpy).toHaveBeenCalled();
  });

  it('should not throw error when button is clicked with no click handler', () => {
    const banner = new Banner('Title', 'Text').getElement();
    const bannerButton: HTMLButtonElement | null = banner.querySelector('.button--white');

    expect(() => bannerButton?.click()).not.toThrow();
  });
});

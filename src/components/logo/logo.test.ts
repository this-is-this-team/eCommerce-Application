import Logo from './logo';

describe('Logo', () => {
  const logo: HTMLElement = new Logo().getElement();

  it('should be defined', () => {
    expect(logo).toBeDefined();
  });

  it('should have the correct tagName', () => {
    expect(logo.tagName).toBe('H1');
  });

  it('should child-element have the correct tagName', () => {
    expect(logo.children[0].tagName).toBe('A');
  });

  it('should have the "logo" class', () => {
    expect(logo.classList.contains('logo')).toBe(true);
  });
});

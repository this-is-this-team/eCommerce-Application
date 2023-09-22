import Sup from './sup';

describe('Sup', () => {
  const sup: HTMLElement = new Sup('Sub text', ['sup-test-class']).getElement();

  it('should render correct html-element', () => {
    expect(sup.outerHTML).toBe('<sup class="sup sup-test-class">Sub text</sup>');
  });
  it('should render correct textContent', () => {
    expect(sup.textContent).toBe('Sub text');
  });
  it('should render correct classList', () => {
    expect(sup.classList.contains('sup-test-class')).toBe(true);
  });
});

import Sup from './sup';

describe('Sup', () => {
  const sup: Sup = new Sup('Sub text', ['sup-test-class']);

  it('should render correct html-element', () => {
    expect(sup.getElement().outerHTML).toBe('<sup class="sup sup-test-class">Sub text</sup>');
  });
  it('should render correct textContent', () => {
    expect(sup.getElement().textContent).toBe('Sub text');
  });
  it('should render correct classList', () => {
    expect(sup.getElement().classList.contains('sup-test-class')).toBe(true);
  });
});

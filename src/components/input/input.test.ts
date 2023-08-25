import Input from './input';

describe('Input', () => {
  const inputComponent: Input = new Input('password', 'Test Input', 'Test Placeholder', 'Test Label', [
    'input-test-class',
  ]);

  it('should render correct html', () => {
    const expectedHTML =
      '<div class="form-field input-test-class form-field-password"><div class="form-field__check"></div><label class="form-field__label" for="Test Input">Test Label</label><input class="form-field__input" type="password" name="Test Input" id="Test Input" placeholder="Test Placeholder"></div>';

    expect(inputComponent.getElement().outerHTML).toContain(expectedHTML);
  });

  it('should render correct textContent', () => {
    const label: HTMLElement | null = inputComponent.getElement().querySelector('.form-field__label');
    expect(label?.textContent).toBe('Test Label');
  });

  it('should render correct textContent', () => {
    const input = inputComponent.getElement().querySelector('input');
    expect(input?.getAttribute('type')).toBe('password');
  });

  it('should render correct textContent', () => {
    const input = inputComponent.getElement().querySelector('input');
    expect(input?.getAttribute('placeholder')).toBe('Test Placeholder');
  });
});

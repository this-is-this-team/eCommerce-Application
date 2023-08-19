import Button from './button';

describe('Button', () => {
  const button: Button = new Button('button', 'Test Button', ['btn-test-class'], true, () => {
    console.log('Button is clicked!');
  });

  it('should render correct html-element', () => {
    expect(button.getElement().outerHTML).toBe(
      '<button class="button btn-test-class" type="button" disabled="true">Test Button</button>'
    );
  });
  it('should render correct textContent', () => {
    expect(button.getElement().textContent).toBe('Test Button');
  });
  it('should render correct classList', () => {
    expect(button.getElement().classList.contains('btn-test-class')).toBe(true);
  });
  it('should button is disabled', () => {
    const mockCallBack: jest.Mock = jest.fn();
    button.getElement().click();
    expect(mockCallBack.mock.calls.length).not.toEqual(1);
  });
  test('Console log should have been called', () => {
    const logSpy: jest.SpyInstance = jest.spyOn(global.console, 'log');
    button.getElement().disabled = false;
    button.getElement().click();
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Button is clicked!');
  });
});

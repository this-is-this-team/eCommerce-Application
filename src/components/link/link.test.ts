import Link from './link';
import { AppRoutesPath } from '../../router/types';

describe('Link', () => {
  const link: Link = new Link('Hello', ['link-test-class'], AppRoutesPath.LOGIN);

  it('should render correct html-element', () => {
    expect(link.getElement().outerHTML).toBe('<a class="link link-test-class" href="/login">Hello</a>');
  });
  it('should render correct textContent', () => {
    expect(link.getElement().textContent).toBe('Hello');
  });
  it('should render correct classList', () => {
    expect(link.getElement().classList.contains('link-test-class')).toBe(true);
  });
  it('should render correct href', () => {
    expect(link.getElement().href).toBe('http://localhost/login');
  });
  it('should change url', () => {
    link.getElement().click();
    expect(window.location.pathname).toBe('/login');
  });
  it('should trigger a new custom event', () => {
    const dispatchEventSpy: jest.SpyInstance = jest.spyOn(window, 'dispatchEvent');
    link.getElement().click();
    expect(dispatchEventSpy.mock.calls[0][0].bubbles).toEqual(true);
  });
});

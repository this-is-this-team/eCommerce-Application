import { ListDataType } from '../../types/types';
import List from './list';

describe('List', () => {
  const mockObj: ListDataType = {
    name: 'John',
    lastName: 'Deer',
    country: 'US',
  };

  const list = new List(mockObj).getElement();

  it('should be defined', () => {
    expect(list).toBeDefined();
  });

  it('should root-element have the correct tagName', () => {
    expect(list.tagName).toBe('UL');
  });

  it('should child-element have the correct tagName', () => {
    expect(list.children[0].tagName).toBe('LI');
  });

  it('should have the correct presence of children nodes', () => {
    expect(list.childNodes.length).toBe(3);
  });
});

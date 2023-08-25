import Notification from './notification';

const TEST_DURATION: number = 1000;

describe('Notification', () => {
  const notification: Notification = new Notification('success', 'Test Notification Text', TEST_DURATION);

  it('should have correct type propeprty', () => {
    expect(notification).toHaveProperty('type', 'success');
  });

  it('should have correct message propeprty', () => {
    expect(notification).toHaveProperty('message', 'Test Notification Text');
  });

  it('should have correct duration propeprty', () => {
    expect(notification).toHaveProperty('duration', TEST_DURATION);
  });
});

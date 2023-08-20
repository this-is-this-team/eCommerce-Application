import 'toastify-js/src/toastify.css';
import Toastify from 'toastify-js';
import './notification.scss';

export default class Notification {
  private message: string;
  private type: 'error' | 'success';

  constructor(type: 'error' | 'success', message: string) {
    this.message = message;
    this.type = type;
  }

  public showNotification(): void {
    Toastify({
      className: `custom-toast custom-toast_${this.type}`,
      text: this.message,
      duration: 5000,
      gravity: 'top',
      close: true,
    }).showToast();
  }
}

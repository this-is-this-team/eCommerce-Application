import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './notification.scss';

const BASE_DURATION: number = 5000;

export default class Notification {
  private message: string;
  private type: 'error' | 'success' | 'warning';
  private duration: number;

  constructor(type: 'error' | 'success' | 'warning', message: string, duration: number = BASE_DURATION) {
    this.message = message;
    this.type = type;
    this.duration = duration;
  }

  public showNotification(): void {
    Toastify({
      className: `custom-toast custom-toast_${this.type}`,
      text: this.message,
      duration: this.duration,
      gravity: 'bottom',
      close: true,
    }).showToast();
  }
}

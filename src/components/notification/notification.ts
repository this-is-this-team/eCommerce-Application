import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './notification.scss';

const BASE_DURATION: number = 5000;

export default class Notification {
  private message: string;
  private type: 'error' | 'success';
  private duration: number;

  constructor(type: 'error' | 'success', message: string, duration: number = BASE_DURATION) {
    this.message = message;
    this.type = type;
    this.duration = duration;
  }

  public showNotification(): void {
    Toastify({
      className: `custom-toast custom-toast_${this.type}`,
      text: this.message,
      duration: this.duration,
      gravity: 'top',
      close: true,
    }).showToast();
  }
}

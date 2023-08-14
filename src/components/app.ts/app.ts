import Header from '../header/header';
import Footer from '../footer/footer';

export default class App {
  private readonly body: HTMLBodyElement | null = document.querySelector('body');
  private readonly header: HTMLHeadElement = new Header().getElement();
  private readonly footer: HTMLElement = new Footer().getElement();

  drawView() {
    if (this.body) {
      this.body.append(this.header, this.footer);
    }
  }
}

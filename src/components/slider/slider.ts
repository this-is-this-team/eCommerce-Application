import Swiper from 'swiper';
import BaseComponent from '../base-component';
import { Image } from '@commercetools/platform-sdk';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import './slider.scss';

export default class ProductSlider extends BaseComponent<'div'> {
  private images: Image[];

  constructor(images: Image[]) {
    super('div', ['product__slider']);
    this.images = images;

    this.createMarkup();
  }

  private createMarkup(): void {
    const sliderView = new BaseComponent('div', ['swiper', 'swiper-view']).getElement();
    const swiperViewWrapper = new BaseComponent('div', ['swiper-wrapper']).getElement();

    const sliderBtnNext = new BaseComponent('div', ['swiper-button-next']).getElement();
    const sliderBtnPrev = new BaseComponent('div', ['swiper-button-prev']).getElement();

    const sliderList = new BaseComponent('div', ['swiper', 'swiper-list']).getElement();
    const swiperListWrapper = new BaseComponent('div', ['swiper-wrapper']).getElement();

    for (let i = 0; i < this.images.length; i++) {
      const imageViewContainer = new BaseComponent('div', ['swiper-slide']).getElement();
      const imageView = new BaseComponent('img').getElement();
      imageView.src = this.images[i].url;

      const imageListContainer = new BaseComponent('div', ['swiper-slide']).getElement();
      const imageList = new BaseComponent('img').getElement();
      imageList.src = this.images[i].url;

      imageViewContainer.append(imageView);
      imageListContainer.append(imageList);

      swiperViewWrapper.append(imageViewContainer);
      swiperListWrapper.append(imageListContainer);
    }

    sliderView.append(swiperViewWrapper, sliderBtnNext, sliderBtnPrev);
    sliderList.append(swiperListWrapper);

    this.node.append(sliderView, sliderList);

    const swiperList = new Swiper(sliderList, {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper(sliderView, {
      loop: true,
      spaceBetween: 24,
      modules: [Navigation, Thumbs],
      navigation: {
        nextEl: sliderBtnNext,
        prevEl: sliderBtnPrev,
      },
      thumbs: {
        swiper: swiperList,
      },
    });
  }
}

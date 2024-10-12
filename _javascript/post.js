import { basic, initSidebar, initTopbar } from './modules/layouts';
import {
  loadImg,
  imgPopup,
  initLocaleDatetime,
  initClipboard,
  toc
} from './modules/plugins';

loadImg();
toc();
imgPopup();
initSidebar();
initLocaleDatetime();
initClipboard();
initTopbar();
basic();

class Slider {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.slides = this.container.querySelector('.slides');
    this.dots = this.container.querySelector('.dots');
    this.currentIndex = 0;
    this.totalSlides = this.container.querySelectorAll('.slide').length;

    this.createDots();
    this.updateSlidePosition();
  }

  createDots() {
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.onclick = () => this.currentSlide(i + 1);
      this.dots.appendChild(dot);
    }
  }

  currentSlide(n) {
    if (n >= 1 && n <= this.totalSlides) {
      this.currentIndex = n - 1;
      this.updateSlidePosition();
    }
  }

  updateSlidePosition() {
    this.slides.style.transform = `translateX(${-this.currentIndex * 100}%)`;
    this.updateDots();
  }

  updateDots() {
    const dots = this.container.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
}

// Initialize sliders
const slider1 = new Slider('slider1');
const slider2 = new Slider('slider2');
const slider3 = new Slider('slider3');
const slider4 = new Slider('slider4');
import { throttle } from '../utils/dom-utils.js';

class NavigationManager {
  constructor() {
    this.header = null;
    this.introSection = null;
    this.navHamburger = null;
    this.navList = null;
    this.navLinks = null;
    this.logoLink = null;
  }

  init() {
    // 요소들 초기화
    this.header = document.querySelector('header');
    this.introSection = document.querySelector('.intro--section');
    this.navHamburger = document.querySelector('.nav--hamburger');
    this.navList = document.querySelector('.nav--list');
    this.navLinks = document.querySelectorAll('.nav--link');
    this.logoLink = document.getElementById('logo-link');

    if (!this.header || !this.introSection) {
      console.warn('네비게이션 초기화: 필수 요소를 찾을 수 없습니다.');
      return;
    }

    this.adjustSectionPadding();
    this.setupEventListeners();
  }

  adjustSectionPadding() {
    if (!this.header || !this.introSection) return;

    const setIntroSectionPadding = () => {
      const headerHeight = this.header.offsetHeight;
      this.introSection.style.paddingTop = `${headerHeight}px`;
    };

    // 초기 패딩 설정
    setIntroSectionPadding();

    // 스로틀링된 리사이즈 이벤트 핸들러로 성능 최적화
    const throttledResize = throttle(setIntroSectionPadding, 100);
    window.addEventListener('resize', throttledResize);
  }

  setupEventListeners() {
    // 햄버거 메뉴 클릭 이벤트
    if (this.navHamburger && this.navList) {
      this.navHamburger.addEventListener('click', () => {
        this.navList.classList.toggle('active');
      });
    }

    // 메뉴 항목 클릭 이벤트
    if (this.navLinks && this.navList) {
      this.navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          this.navList.classList.remove('active');
          this.smoothScroll(e);
        });
      });
    }

    // 로고 링크 클릭 이벤트
    if (this.logoLink) {
      this.logoLink.addEventListener('click', this.smoothScroll.bind(this));
    }

    // 모바일에서 메뉴 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', (e) => {
      if (this.navList && this.navList.classList.contains('active') && !this.navList.contains(e.target) && !this.navHamburger.contains(e.target)) {
        this.navList.classList.remove('active');
      }
    });
  }

  smoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection && this.header) {
      const headerOffset = this.header.offsetHeight;
      window.scrollTo({
        top: targetSection.offsetTop - headerOffset,
        behavior: 'smooth',
      });
    }
  }
}

export function initNavigation() {
  const navigationManager = new NavigationManager();
  navigationManager.init();
}

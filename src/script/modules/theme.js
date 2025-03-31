// 테마 관련 이미지 임포트
import darkModeIcon from '../../assets/images/dark-mode-icon.svg';
import lightModeIcon from '../../assets/images/light-mode-icon.svg';
import { waitForElement } from '../utils/dom-utils.js';

class ThemeManager {
  constructor() {
    this.themeToggle = null;
    this.buttonText = null;
    this.buttonIcon = null;
    this.currentTheme = localStorage.getItem('theme') || 'light';
  }

  async init() {
    try {
      // 컨테이너가 로드될 때까지 대기
      const container = await waitForElement('#theme-toggle-container');
      this.createToggleButton(container);
      this.setupEventListeners();
      this.applyTheme(this.currentTheme);
    } catch (error) {
      console.error('테마 컨테이너 초기화 오류:', error);
    }
  }

  createToggleButton(container) {
    // 버튼 HTML 생성
    const buttonHTML = `
      <button class="nav--button" id="theme-toggle" aria-label="테마 모드 전환">
        <img src="${this.currentTheme === 'dark' ? darkModeIcon : lightModeIcon}" class="nav--button-icon" alt="테마 모드 아이콘">
        <span class="nav--button-text">${this.currentTheme === 'dark' ? 'Dark' : 'Light'}</span>
      </button>
    `;
    container.innerHTML = buttonHTML;

    // 버튼 요소 참조 저장
    this.themeToggle = document.getElementById('theme-toggle');
    this.buttonText = this.themeToggle.querySelector('.nav--button-text');
    this.buttonIcon = this.themeToggle.querySelector('.nav--button-icon');
  }

  setupEventListeners() {
    if (!this.themeToggle) return;

    this.themeToggle.addEventListener('click', () => {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(newTheme);
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;

    // UI 업데이트
    if (this.buttonText && this.buttonIcon) {
      this.buttonText.textContent = theme === 'dark' ? 'Dark' : 'Light';
      this.buttonIcon.src = theme === 'dark' ? darkModeIcon : lightModeIcon;
    }
  }
}

export function initTheme() {
  const themeManager = new ThemeManager();
  themeManager.init();
}

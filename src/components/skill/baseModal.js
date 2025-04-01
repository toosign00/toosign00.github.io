// src/script/components/BaseModal.js
export class BaseModal {
  constructor() {
    this.modal = null;
    this.overlay = null;
    this.scrollPosition = 0;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  // 기본 오버레이 생성
  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal--overlay';
    document.body.appendChild(this.overlay);

    // 오버레이 클릭 이벤트
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
  }

  // 스크롤 위치 저장 및 고정
  lockScroll() {
    this.scrollPosition = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${this.scrollPosition}px`;
  }

  // 스크롤 복원
  unlockScroll() {
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';

    window.scrollTo({
      top: this.scrollPosition,
      behavior: 'instant',
    });
  }

  // ESC 키 이벤트
  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  // 포커스 트랩 설정 (접근성)
  setupFocusTrap() {
    if (!this.modal) return;

    // 포커스 가능한 모든 요소 가져오기
    const focusableElements = this.modal.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // 포커스 트랩 설정
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });

    // 초기 포커스 설정
    firstElement.focus();
  }

  // 모달 열기 기본 메서드
  open() {
    this.lockScroll();
    this.createOverlay();
    document.addEventListener('keydown', this.handleKeyDown);

    // 자식 클래스에서 구현
    this.createModal();
    this.setupFocusTrap();

    // 트랜지션을 위한 타이밍
    requestAnimationFrame(() => {
      this.overlay.classList.add('open');
      this.modal.classList.add('open');
    });
  }

  // 모달 생성 메서드 (자식 클래스에서 오버라이드)
  createModal() {
    console.warn('createModal 메서드를 자식 클래스에서 구현해야 합니다.');
  }

  // 모달 닫기
  close() {
    if (!this.modal) return;

    this.modal.classList.remove('open');
    if (this.overlay) this.overlay.classList.remove('open');

    setTimeout(() => {
      if (this.modal) this.modal.remove();
      if (this.overlay) this.overlay.remove();

      this.unlockScroll();
      document.removeEventListener('keydown', this.handleKeyDown);

      this.modal = null;
      this.overlay = null;
    }, 300); // 트랜지션 시간과 맞춤
  }
}

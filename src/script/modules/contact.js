class ContactForm {
  constructor() {
    this.form = null;
    this.emailInput = null;
    this.submitButton = null;
    this.emailjsServiceId = 'Portfolio_Email_Form';
    this.emailjsTemplateId = 'template_7a418yv';
    this.emailjsUserId = '_fLh71BSAA_4dy3Bh';
  }

  init() {
    // EmailJS 초기화
    if (window.emailjs) {
      window.emailjs.init(this.emailjsUserId);
    } else {
      console.error('EmailJS 라이브러리를 찾을 수 없습니다.');
      return;
    }

    this.form = document.getElementById('emailForm');
    if (!this.form) {
      console.warn('연락처 폼 초기화: 폼 요소를 찾을 수 없습니다.');
      return;
    }

    this.emailInput = this.form.querySelector('[name="reply_to"]');
    this.submitButton = this.form.querySelector('.submit--btn');

    if (!this.emailInput || !this.submitButton) {
      console.warn('연락처 폼 초기화: 필수 입력 필드를 찾을 수 없습니다.');
      return;
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    // 이메일 입력 필드 유효성 실시간 검사
    this.emailInput.addEventListener('input', () => {
      const email = this.emailInput.value;
      if (email && !this.isValidEmail(email)) {
        this.emailInput.setCustomValidity('올바른 이메일 형식이 아닙니다.');
      } else {
        this.emailInput.setCustomValidity('');
      }
    });
  }

  isValidEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const email = this.emailInput.value;

    // 이메일 유효성 검사
    if (!this.isValidEmail(email)) {
      this.emailInput.setCustomValidity('올바른 이메일 형식이 아닙니다.');
      this.emailInput.reportValidity();
      return;
    }

    this.emailInput.setCustomValidity('');

    // Loading 상태 표시
    this.submitButton.disabled = true;
    this.submitButton.innerHTML = '<i class="bi bi-hourglass"></i> 전송중...';

    try {
      await window.emailjs.sendForm(this.emailjsServiceId, this.emailjsTemplateId, this.form, this.emailjsUserId);

      alert('이메일이 성공적으로 전송되었습니다!');
      this.form.reset();
    } catch (error) {
      console.error('이메일 전송 오류:', error);
      alert('전송 실패: ' + (error.text || '알 수 없는 오류가 발생했습니다.'));
    } finally {
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = '보내기 <i class="bi bi-send"></i>';
    }
  }
}

export function initContact() {
  const contactForm = new ContactForm();
  contactForm.init();
}

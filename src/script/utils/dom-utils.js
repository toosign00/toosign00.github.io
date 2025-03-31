/**
 * 특정 선택자의 요소가 DOM에 나타날 때까지 대기하는 유틸리티 함수
 * @param {string} selector - 대기할 요소의 CSS 선택자
 * @param {number} timeout - 최대 대기 시간 (ms)
 * @returns {Promise<HTMLElement>} 찾은 요소
 */
export function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    // 이미 요소가 존재하는 경우
    const element = document.querySelector(selector);
    if (element) {
      return resolve(element);
    }

    // 타임아웃 설정
    const timeoutId = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`요소를 찾을 수 없습니다: ${selector}`));
    }, timeout);

    // DOM 변화 감지
    const observer = new MutationObserver((mutations, obs) => {
      const element = document.querySelector(selector);
      if (element) {
        obs.disconnect();
        clearTimeout(timeoutId);
        resolve(element);
      }
    });

    // 문서 전체 관찰 시작
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}

/**
 * 디바운스 함수 - 연속된 이벤트 중 마지막 이벤트만 처리
 * @param {Function} func - 실행할 함수
 * @param {number} wait - 대기 시간 (ms)
 * @returns {Function} 디바운스된 함수
 */
export function debounce(func, wait = 300) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 스로틀 함수 - 일정 시간 간격으로 이벤트 처리
 * @param {Function} func - 실행할 함수
 * @param {number} limit - 최소 실행 간격 (ms)
 * @returns {Function} 스로틀된 함수
 */
export function throttle(func, limit = 300) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

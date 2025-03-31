class TypeWriter {
  constructor(element) {
    this.element = element;
    this.typingTimeout = null;
  }

  type(text, speed = 10) {
    // 이미 같은 텍스트가 표시중이면 초기화
    if (this.element.textContent === text) {
      this.element.textContent = '';
    }

    // 진행 중인 타이핑이 있다면 중지
    clearTimeout(this.typingTimeout);
    this.element.textContent = '';

    // 타이핑할 현재 문자의 위치
    let index = 0;

    // 한 글자씩 타이핑하는 함수
    const typeChar = () => {
      if (index < text.length) {
        this.element.textContent += text.charAt(index);
        index++;
        this.typingTimeout = setTimeout(typeChar, speed);
      }
    };

    // 타이핑 시작
    typeChar();
  }
}

class SkillsManager {
  constructor() {
    // 스킬 설명 데이터
    this.skillDescriptions = {
      'html-box': 'HTML5 문서 구조를 이해하며, 시멘틱 코드를 사용하고, SEO 적용을 고려하여 최적화한 경험이 있습니다.',
      'css-box': 'Media Query, CSS3, Flex-box와 CSS Grid에 능숙하며, CSS 방법론을 사용해 재사용성과 유지보수성을 고려한 코드를 작성할 수 있습니다.',
      'tailwind-box': 'Tailwind CSS를 활용해 빠르고 효율적으로 UI를 구성하며, 디자인 시스템을 적용하여 일관된 스타일을 유지할 수 있습니다.',
      'js-box':
        'JavaScript ES6 이상 문법과 DOM 조작을 활용해 동적 웹페이지를 구현하며, Stack, Queue, Event Loop, Heap 등의 동작 원리와 비동기 처리(Callback, async/await, Promise)에 대한 이해를 갖추고 있습니다.',
      'node-box': 'Node.js와 Express.js를 활용해 서버를 구축하고, npm으로 라이브러리를 관리하며, MongoDB와의 연동이 가능합니다.',
      'git-box':
        'Git을 활용한 버전 관리와 branch, merge, rebase를 통한 협업에 능숙하며, 다양한 브랜치 전략(Git flow, Trunk-based)을 적용할 수 있습니다.',
      'github-box':
        'GitHub를 사용해 원격 저장소를 관리하고, 애자일 방법론을 기반으로 한 스크럼마스터 경험이 있으며, Pull Request 기반의 코드 리뷰와 브랜치 보호 규칙을 통해 팀 협업을 효과적으로 주도했습니다.',
      design: 'Figma와 Adobe 디자인 툴을 활용하며, UI/UX 디자인 프로세스에 대한 이해를 바탕으로 사용자 중심의 디자인을 구현할 수 있습니다.',
    };

    this.typewriter = null;
    this.descriptionElement = null;
  }

  init() {
    this.descriptionElement = document.querySelector('.skill--description-text');

    if (!this.descriptionElement) {
      console.warn('스킬 매니저 초기화: 설명 요소를 찾을 수 없습니다.');
      return;
    }

    this.typewriter = new TypeWriter(this.descriptionElement);
    this.setupSkillBoxes();
    this.setupAccessibility();
  }

  setupSkillBoxes() {
    // 일반 스킬 박스 이벤트
    Object.keys(this.skillDescriptions).forEach((id) => {
      if (id === 'design') return; // 디자인은 따로 처리

      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('click', () => this.typewriter.type(this.skillDescriptions[id]));
      }
    });

    // 디자인 스킬 박스 이벤트
    document.querySelectorAll('.design-box').forEach((box) => {
      box.addEventListener('click', () => this.typewriter.type(this.skillDescriptions['design']));
    });
  }

  setupAccessibility() {
    // 스킬 박스에 키보드 접근성 추가
    const allSkillBoxes = [
      ...Object.keys(this.skillDescriptions)
        .filter((id) => id !== 'design')
        .map((id) => document.getElementById(id)),
      ...document.querySelectorAll('.design-box'),
    ].filter(Boolean);

    allSkillBoxes.forEach((box) => {
      // 키보드 포커스 가능하도록 설정
      if (!box.hasAttribute('tabindex')) {
        box.setAttribute('tabindex', '0');
      }

      // 엔터 키 처리
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          box.click();
        }
      });

      // 스크린 리더를 위한 ARIA 속성 추가
      box.setAttribute('role', 'button');
      box.setAttribute('aria-label', `${box.textContent.trim()} 스킬 설명 보기`);
    });
  }
}

export function initSkills() {
  const skillsManager = new SkillsManager();
  skillsManager.init();
}

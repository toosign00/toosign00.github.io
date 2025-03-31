import { projects } from '../data/projects-data.js';
import { formatDateForDatetime } from '../utils/date-utils.js';

// ProjectModal 클래스
class ProjectModal {
  constructor() {
    this.modal = null;
    this.overlay = null;
    this.scrollPosition = 0;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  create(projectId) {
    const project = projects[projectId];

    if (!project) {
      console.error(`프로젝트 ID를 찾을 수 없습니다: ${projectId}`);
      return;
    }

    // Overlay 생성
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // Modal 생성
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'projectModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modalTitle');

    modal.innerHTML = `
      <div class="modal--header">
        <h2 class="modal--title" id="modalTitle">
          ${project.title} 
          <time class="modal--text-date" datetime="${formatDateForDatetime(project.duration)}">${project.duration}</time>
        </h2>
        <div class="modal--buttons">
          ${
            project.github
              ? `
            <a href="${project.github.url}" target="_blank" class="modal--button" aria-label="${project.github.ariaLabel}">
              <i class="bi bi-github"></i>
            </a>
          `
              : ''
          }
          ${
            project.deploy
              ? `
            <a href="${project.deploy.url}" target="_blank" class="modal--button" aria-label="${project.deploy.ariaLabel}">
              <i class="bi bi-link-45deg"></i>
            </a>
          `
              : ''
          }
          <button class="modal--button" aria-label="모달 닫기">
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
      <img src="${project.images[0].url}" alt="${project.images[0].alt}" class="modal--image">
      <div class="modal--skills">
        ${project.technologies.map((tech) => `<img src="${tech.imgSrc}" alt="${tech.alt} 아이콘" class="modal--skill-icon">`).join('')}
      </div>
      <div class="modal--content">
        <div class="modal--row">
          <p class="modal--label">Type</p>
          <p class="modal--desc">${project.type === 'Team' ? project.teamDetail : project.type}</p>
        </div>
        <div class="modal--row">
          <p class="modal--label">Role</p>
          <p class="modal--desc">${project.role}</p>
        </div>
        <div class="modal--row">
          <p class="modal--label">Details</p>
          <p class="modal--desc">${project.description}</p>
        </div>
      </div>
    `;

    this.modal = modal;
    this.overlay = overlay;

    // 스크롤 위치 저장
    this.scrollPosition = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${this.scrollPosition}px`;

    // DOM에 추가
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    // 트랜지션을 위한 타이밍
    requestAnimationFrame(() => {
      overlay.classList.add('open');
      modal.classList.add('open');
    });

    // 이벤트 리스너 추가
    document.addEventListener('keydown', this.handleKeyDown);
    this.addEventListeners();

    // 포커스 트랩 설정 (접근성)
    this.setupFocusTrap();
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  addEventListeners() {
    const closeButton = this.modal.querySelector('.bi-x').parentElement;
    closeButton.addEventListener('click', () => this.close());

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
  }

  setupFocusTrap() {
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
        // 시프트 + 탭 - 첫 요소에서 마지막으로
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // 탭 - 마지막 요소에서 첫 요소로
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });

    // 초기 포커스 설정
    firstElement.focus();
  }

  close() {
    if (!this.modal) return;

    const scrollPosition = this.scrollPosition;

    this.modal.classList.remove('open');
    this.overlay.classList.remove('open');

    setTimeout(() => {
      this.modal.remove();
      this.overlay.remove();

      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';

      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'instant',
        });
      });

      document.removeEventListener('keydown', this.handleKeyDown);
      this.modal = null;
      this.overlay = null;
    }, 300);
  }

  open(projectId) {
    if (this.modal) {
      this.close();
    }
    this.create(projectId);
  }
}

// ProjectsManager 클래스
class ProjectsManager {
  constructor() {
    this.projectsGrid = document.querySelector('.projects--grid');
    this.projectModal = new ProjectModal();
  }

  init() {
    if (!this.projectsGrid) {
      console.warn('프로젝트 매니저 초기화: 프로젝트 그리드를 찾을 수 없습니다.');
      return;
    }

    this.renderProjects();
    this.setupEventListeners();
  }

  createProjectCard(projectId, project) {
    return `
      <article class="project--item" data-project-id="${projectId}" tabindex="0">
        <div class="project--thumbnail">
          <img src="${project.images[0].url}" alt="${project.title} 프로젝트 썸네일" loading="lazy">
        </div>
        <div class="project--info">
          <div class="project--title-wrapper">
            <h3 class="project--title">${project.title}</h3>
            <p class="project--type-icon">${project.type}</p>
          </div>
          <time class="project--duration" datetime="${formatDateForDatetime(project.duration)}">${project.duration}</time>
          <p class="project--description">${project.summary}</p>
          <div class="project--tags">
            ${this.createTechnologyTags(project.technologies)}
          </div>
        </div>
      </article>
    `;
  }

  createTechnologyTags(technologies) {
    return technologies.map((tech) => `<img src="${tech.imgSrc}" alt="${tech.alt}" title="${tech.name}">`).join('');
  }

  renderProjects() {
    const projectsHTML = Object.entries(projects)
      .map(([id, project]) => this.createProjectCard(id, project))
      .join('');

    this.projectsGrid.innerHTML = projectsHTML;
  }

  setupEventListeners() {
    // 직접 이벤트 리스너 사용 (이벤트 위임 대신)
    this.projectsGrid.addEventListener('click', (e) => {
      const projectItem = e.target.closest('.project--item');
      if (projectItem) {
        const projectId = projectItem.dataset.projectId;
        this.projectModal.open(projectId);
      }
    });

    // 키보드 접근성
    this.projectsGrid.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('project--item')) {
        e.preventDefault();
        const projectId = e.target.dataset.projectId;
        console.log('키보드로 선택한 프로젝트 ID:', projectId); // 디버깅용
        this.projectModal.open(projectId);
      }
    });

    // 프로젝트 카드에 ARIA 역할 추가
    const projectItems = this.projectsGrid.querySelectorAll('.project--item');
    projectItems.forEach((item) => {
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `${item.querySelector('.project--title').textContent} 프로젝트 상세 보기`);
    });
  }
}

export function initProjects() {
  const projectsManager = new ProjectsManager();
  projectsManager.init();
}

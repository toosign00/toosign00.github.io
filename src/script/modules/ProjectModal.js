  import { BaseModal } from './BaseModal.js';
import { formatDateForDatetime } from '../utils/date-utils.js';

export class ProjectModal extends BaseModal {
  constructor(projects) {
    super();
    this.projects = projects;
    this.currentProjectId = null;
  }

  open(projectId) {
    this.currentProjectId = projectId;
    super.open();
  }

  createModal() {
    const project = this.projects[this.currentProjectId];
    if (!project) {
      console.error(`프로젝트 ID를 찾을 수 없습니다: ${this.currentProjectId}`);
      return;
    }

    // 모달 요소 생성
    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.id = 'projectModal';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-labelledby', 'modalTitle');

    // 모달 내용 생성
    this.modal.innerHTML = `
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

    document.body.appendChild(this.modal);

    // 닫기 버튼 이벤트
    const closeButton = this.modal.querySelector('.bi-x').parentElement;
    closeButton.addEventListener('click', () => this.close());
  }
}

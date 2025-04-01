// src/script/components/ProjectsManager.js
import { ProjectModal } from './ProjectModal.js';
import { formatDateForDatetime } from '../utils/date-utils.js';

export class ProjectsManager {
  constructor(projects) {
    this.projects = projects;
    this.projectsGrid = document.querySelector('.projects--grid');
    this.projectModal = new ProjectModal(projects);
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
    const projectsHTML = Object.entries(this.projects)
      .map(([id, project]) => this.createProjectCard(id, project))
      .join('');

    this.projectsGrid.innerHTML = projectsHTML;
  }

  setupEventListeners() {
    // 프로젝트 아이템 클릭 이벤트
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

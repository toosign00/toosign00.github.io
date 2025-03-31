// 모듈 임포트
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initSkills } from './modules/skills.js';
import { initProjects } from './modules/projects.js';
import { initContact } from './modules/contact.js';

// 모든 모듈 초기화 함수를 호출
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initSkills();
  initProjects();
  initContact();
});

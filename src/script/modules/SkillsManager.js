import { SkillModal } from './skillModal.js';

export class SkillsManager {
  constructor(skillDetails) {
    this.skillDetails = skillDetails;
    this.skillModal = new SkillModal(skillDetails);
    this.selectedSkillCard = null;
  }

  init() {
    this.initTabs();
    this.initSkillCards();
    this.animateCards();
    this.optimizeGrid();
  }

  initTabs() {
    const tabs = document.querySelectorAll('.skills--tab');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // 기존 활성 탭 제거
        document.querySelectorAll('.skills--tab').forEach((t) => t.classList.remove('active'));
        // 기존 활성 콘텐츠 제거
        document.querySelectorAll('.skills--content').forEach((c) => c.classList.remove('active'));

        // 새 탭 활성화
        tab.classList.add('active');

        // 해당 콘텐츠 활성화
        const targetId = `${tab.dataset.target}-skills`;
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  initSkillCards() {
    const skillCards = document.querySelectorAll('.skill--card');

    // 스킬 카드 클릭 이벤트 (모달 열기)
    skillCards.forEach((card) => {
      card.addEventListener('click', () => {
        // 기존 활성 카드 제거
        document.querySelectorAll('.skill--card').forEach((c) => c.classList.remove('active'));

        // 새 카드 활성화
        card.classList.add('active');
        this.selectedSkillCard = card;

        // 스킬 상세 정보 모달로 표시
        const skillId = card.dataset.skill;
        this.skillModal.open(skillId);
      });
    });
  }

  animateCards() {
    const cards = document.querySelectorAll('.skill--card');

    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';

      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 80 * index); // 각 카드마다 시간차를 두고 애니메이션
    });
  }

  optimizeGrid() {
    // 반응형 그리드 레이아웃 처리를 위한 추가 기능
    const handleResize = () => {
      const gridContainers = document.querySelectorAll('.skills--grid');
      const windowWidth = window.innerWidth;

      gridContainers.forEach((grid) => {
        // 화면 너비에 따른 추가적인 클래스 적용 가능
        if (windowWidth < 576) {
          grid.classList.add('mobile-grid');
        } else {
          grid.classList.remove('mobile-grid');
        }
      });
    };

    // 초기 실행 및 리사이즈 이벤트 리스너 추가
    handleResize();
    window.addEventListener('resize', handleResize);
  }
}

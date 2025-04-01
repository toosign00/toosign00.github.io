// src/script/components/SkillModal.js
import { BaseModal } from './baseModal.js';

export class SkillModal extends BaseModal {
  constructor(skillDetails) {
    super();
    this.skillDetails = skillDetails;
    this.currentSkillId = null;
  }

  open(skillId) {
    this.currentSkillId = skillId;
    super.open();
  }

  createModal() {
    const skillInfo = this.skillDetails[this.currentSkillId];
    if (!skillInfo) {
      console.error(`스킬 ID를 찾을 수 없습니다: ${this.currentSkillId}`);
      return;
    }

    // 모달 요소 생성
    this.modal = document.createElement('div');
    this.modal.className = 'skill--modal';
    this.modal.id = 'skill--modal';

    // 모달 내용 생성
    const modalContent = document.createElement('div');
    modalContent.className = 'modal--content';

    modalContent.innerHTML = `
      <span class="close--button">&times;</span>
      <div class="modal--header">
        <h3 class="modal--title">${skillInfo.title}</h3>
      </div>
      <div class="modal--body">
        <div class="modal--section">
          <h4 class="modal--section-title">
            <i class="bi bi-star-fill"></i> 주요 경험
          </h4>
          <div class="modal--section-content">
            <ul>
              ${skillInfo.experience.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="modal--section">
          <h4 class="modal--section-title">
            <i class="bi bi-code-square"></i> 적용 사례
          </h4>
          <div class="modal--section-content">
            <ul>
              ${skillInfo.applications.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
        
        <div class="modal--section">
          <h4 class="modal--section-title">
            <i class="bi bi-lightbulb"></i> 학습 중인 영역
          </h4>
          <div class="modal--section-content">
            <ul>
              ${skillInfo.learning.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;

    this.modal.appendChild(modalContent);
    document.body.appendChild(this.modal);

    // 닫기 버튼 이벤트
    const closeButton = this.modal.querySelector('.close--button');
    closeButton.addEventListener('click', () => this.close());

    // 모달 표시
    setTimeout(() => {
      this.modal.classList.add('show');
    }, 10);
  }
}

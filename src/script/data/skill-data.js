// 아이콘 이미지 임포트
import htmlIcon from '../../assets/images/html-5-logo.svg';
import cssIcon from '../../assets/images/css-3-logo.svg';
import jqueryIcon from '../../assets/images/jquery-logo.svg';
import tailwindIcon from '../../assets/images/tailwind-css-logo.svg';
import jsIcon from '../../assets/images/javascript-logo.svg';
import reactIcon from '../../assets/images/react-logo.svg';
import typescriptIcon from '../../assets/images/typescript-logo.svg';
import nodejsIcon from '../../assets/images/nodejs-logo.svg';
import mongodbIcon from '../../assets/images/mongodb-logo.svg';
import ejsIcon from '../../assets/images/ejs-logo.svg';
import gsapIcon from '../../assets/images/gsap-logo.svg';
import gitIcon from '../../assets/images/git-logo.svg';
import gitHubIcon from '../../assets/images/github-logo.svg';
import figmaIcon from '../../assets/images/figma-logo.svg';

// 통합된 skills 객체 정의
export const skills = {
  html: {
    name: 'HTML5',
    imgSrc: htmlIcon,
    alt: 'HTML5',
    title: 'HTML5 역량',
    experience: [
      '시맨틱 태그를 활용한 접근성 높은 웹사이트 구조화',
      'ARIA 속성 활용으로 스크린 리더 사용자 경험 최적화',
      'Schema.org 마크업을 통한 검색 엔진 최적화',
      '웹 표준과 크로스 브라우징을 고려한 마크업 개발',
    ],
    applications: [
      '포트폴리오 웹사이트: 시맨틱 구조와 접근성 기준 준수',
      '쇼핑몰 프로젝트: 상품 정보의 구조화된 데이터 마크업',
      '뉴스 웹사이트: 기사 콘텐츠의 SEO 최적화 마크업',
    ],
    learning: [
      'Canvas API를 활용한 인터랙티브 요소 구현',
      'Web Components를 활용한 재사용 가능한 UI 요소 개발',
      '마이크로데이터와 JSON-LD를 활용한 고급 SEO 기법',
    ],
  },
  css: {
    name: 'CSS3',
    imgSrc: cssIcon,
    alt: 'CSS3',
    title: 'CSS3 역량',
    experience: [
      'Flexbox와 Grid를 활용한 복잡한 레이아웃 구성',
      '반응형 웹 디자인을 통한 다양한 디바이스 지원',
      'CSS 애니메이션과 트랜지션을 활용한 인터랙티브 요소 구현',
      'SCSS를 활용한 모듈화된 스타일시트 관리',
    ],
    applications: [
      '대시보드 UI: 그리드 레이아웃을 활용한 데이터 시각화',
      '포트폴리오 사이트: 스크롤 기반 애니메이션 구현',
      '모바일 웹앱: 터치 인터랙션을 위한 반응형 UI 구현',
    ],
    learning: ['CSS Houdini API를 활용한 커스텀 렌더링', 'CSS 변수를 활용한 다이나믹 테마 시스템', 'CSS Grid Level 2 명세의 신규 기능 활용'],
  },
  jquery: {
    name: 'jQuery',
    imgSrc: jqueryIcon,
    alt: 'jQuery',
    title: 'jQuery 역량',
    experience: [],
    applications: [],
    learning: [],
  },
  tailwindCSS: {
    name: 'Tailwind CSS',
    imgSrc: tailwindIcon,
    alt: 'Tailwind CSS',
    title: 'Tailwind CSS 역량',
    experience: [
      '유틸리티 퍼스트 방식의 UI 개발로 생산성 향상',
      '디자인 시스템과 일관된 스타일링 구현',
      '컴포넌트 추출을 통한 재사용 가능한 UI 패턴 개발',
      'PurgeCSS를 통한 프로덕션 최적화',
    ],
    applications: [
      '관리자 대시보드: 일관된 디자인 시스템 적용',
      '랜딩 페이지: 반응형 레이아웃과 애니메이션 구현',
      '블로그 플랫폼: 커스텀 테마 시스템 구축',
    ],
    learning: ['JIT 컴파일러를 활용한 동적 유틸리티 생성', '커스텀 플러그인 개발을 통한 기능 확장', 'Headless UI와의 통합을 통한 접근성 개선'],
  },
  javascript: {
    name: 'JavaScript',
    imgSrc: jsIcon,
    alt: 'JavaScript',
    title: 'JavaScript 역량',
    experience: [
      'ES6+ 문법을 활용한 모던 JavaScript 개발',
      'Promise, async/await를 활용한 비동기 프로그래밍',
      'DOM API를 활용한 동적 UI 구현',
      'localStorage, sessionStorage를 활용한 데이터 관리',
    ],
    applications: [
      '할 일 관리 앱: 상태 관리 및 로컬 스토리지 연동',
      '대시보드: 차트 라이브러리 연동 및 데이터 시각화',
      '이커머스 사이트: 장바구니 기능 및 결제 플로우 구현',
    ],
    learning: ['함수형 프로그래밍 패러다임 적용', 'TypeScript를 활용한 타입 안정성 확보', 'Web Worker를 활용한 멀티스레딩 처리'],
  },
  react: {
    name: 'React',
    imgSrc: reactIcon,
    alt: 'React',
    title: 'React 역량',
    experience: [
      '함수형 컴포넌트와 Hooks를 활용한 상태 관리',
      '컴포넌트 재사용성과 합성 패턴 적용',
      'Context API를 활용한 전역 상태 관리',
      '커스텀 훅을 통한 로직 재사용',
    ],
    applications: [
      '쇼핑 애플리케이션: 상품 목록 및 장바구니 기능 구현',
      '분석 대시보드: 데이터 시각화 및 필터링 기능 구현',
      '소셜 미디어 앱: 실시간 피드 및 인터랙션 구현',
    ],
    learning: ['React Query를 활용한 서버 상태 관리', 'React Server Components 아키텍처 적용', 'Suspense와 Concurrent Mode를 활용한 성능 최적화'],
  },
  typescript: {
    name: 'TypeScript',
    imgSrc: typescriptIcon,
    alt: 'TypeScript',
    title: 'TypeScript 역량',
    experience: [
      '정적 타입 시스템을 통한 코드 안정성 향상',
      '인터페이스와 타입 정의를 통한 명확한 API 설계',
      '제네릭을 활용한 유연한 컴포넌트 구현',
      '타입 가드와 타입 좁히기를 통한 안전한 코드 작성',
    ],
    applications: [
      '대규모 프로젝트: 타입 시스템을 통한 버그 방지',
      '라이브러리 개발: 타입 정의를 통한 사용자 경험 개선',
      'API 클라이언트: 강력한 타입 추론으로 개발 생산성 향상',
    ],
    learning: ['고급 타입 유틸리티와 조건부 타입 활용', 'TypeScript 컴파일러 API 학습', 'TypeScript와 함께하는 함수형 프로그래밍 패턴'],
  },
  nodejs: {
    name: 'Node.js',
    imgSrc: nodejsIcon,
    alt: 'Node.js',
    title: 'Node.js 역량',
    experience: [
      'Express.js 프레임워크를 활용한 RESTful API 개발',
      '미들웨어 패턴을 활용한 요청 처리 및 라우팅',
      'MongoDB와의 연동을 통한 데이터 관리',
      '인증 및 권한 관리 시스템 구현',
    ],
    applications: ['REST API: CRUD 작업과 데이터 검증', '인증 서비스: JWT 기반 사용자 인증 시스템', '데이터 동기화: 외부 API 연동 및 데이터 처리'],
    learning: ['GraphQL API 개발 및 쿼리 최적화', '마이크로서비스 아키텍처 설계 및 구현', 'WebSocket을 활용한 실시간 통신 구현'],
  },
  mongodb: {
    name: 'MongoDB',
    imgSrc: mongodbIcon,
    alt: 'MongoDB',
    title: 'MongoDB 역량',
    experience: [],
    applications: [],
    learning: [],
  },
  ejs: {
    name: 'EJS',
    imgSrc: ejsIcon,
    alt: 'EJS',
    title: 'EJS 역량',
    experience: [],
    applications: [],
    learning: [],
  },
  gsap: {
    name: 'GSAP',
    imgSrc: gsapIcon,
    alt: 'GSAP',
    title: 'GSAP 역량',
    experience: [],
    applications: [],
    learning: [],
  },
  git: {
    name: 'Git',
    imgSrc: gitIcon,
    alt: 'Git',
    title: 'Git 활용 역량',
    experience: [
      'Git Flow 브랜치 전략을 통한 체계적인 버전 관리',
      '복잡한 충돌 해결 및 안전한 병합 전략',
      '리베이스, 체리픽 등 고급 Git 명령어 활용',
      '커밋 히스토리 관리 및 효과적인 메시지 작성',
    ],
    applications: [
      '팀 프로젝트: 브랜치 전략 수립 및 코드 리뷰 프로세스 구축',
      '개인 저장소: 체계적인 버전 관리와 문서화',
      '오픈소스 기여: 포크 및 풀 리퀘스트 워크플로우',
    ],
    learning: ['Git Hooks를 활용한 자동화 워크플로우', '서브모듈을 활용한 복잡한 프로젝트 구조 관리', 'Git의 내부 작동 원리 이해 및 고급 기능 활용'],
  },
  github: {
    name: 'GitHub',
    imgSrc: gitHubIcon,
    alt: 'GitHub',
    title: 'GitHub 활용 역량',
    experience: [
      'Pull Request와 코드 리뷰를 통한 협업',
      '이슈 트래킹과 프로젝트 보드를 활용한 작업 관리',
      '마일스톤 및 라벨을 활용한 작업 분류',
      'GitHub Pages를 활용한 정적 사이트 배포',
    ],
    applications: [
      '오픈소스 기여: 이슈 해결 및 풀 리퀘스트 생성',
      '협업 프로젝트: 코드 리뷰 문화 정착 및 품질 관리',
      '개인 프로젝트: 자동화된 워크플로우 구축',
    ],
    learning: [
      'GitHub Actions를 활용한 CI/CD 파이프라인 구축',
      'GitHub API를 활용한 커스텀 통합 도구 개발',
      '코드스페이스를 활용한 개발 환경 표준화',
    ],
  },
  figma: {
    name: 'Figma',
    imgSrc: figmaIcon,
    alt: 'Figma',
    title: 'Figma 활용 역량',
    experience: [
      '디자인 시안 분석 및 개발 구현',
      '프로토타입 상호작용 이해 및 적용',
      '컴포넌트 및 오토 레이아웃 활용',
      '디자이너와의 효율적인 협업 및 피드백 교환',
    ],
    applications: ['포트폴리오 사이트: 디자인 시안에서 실제 구현', '모바일 앱 UI: 컴포넌트 기반 개발 접근법', '대시보드: 디자인 시스템 일관성 유지'],
    learning: ['디자인 시스템 구축 및 개발 적용', 'Figma API를 활용한 디자인-개발 워크플로우 자동화', '플러그인 활용을 통한 생산성 향상 기법'],
  },
};

// 내보내기
export default skills;

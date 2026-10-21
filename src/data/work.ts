import { LuMicroscope, LuWorkflow } from "react-icons/lu";
import type { ProjectItem } from "../types/projectType";

// 바이언스 재직 중 담당한 제품. 배운 점이 아니라 실제 수행 내용과 결과를 기준으로 서술한다.
const workItems: ProjectItem[] = [
  {
    kind: "work",
    title: "VIENCE PATHO VIEWER",
    description: "기가픽셀급 병리 슬라이드(WSI)를 브라우저에서 검토·분석하는 AI 플랫폼",
    bgColor: "rgba(252, 81, 133, 0.35)",
    textColor: "rgba(252, 81, 133, 1)",
    icon: LuMicroscope,
    company: "바이언스 (VIENCE)",
    position: "연구개발 프론트엔드 개발자",
    date: "2025.09 - 2026.09",
    tech: [
      "React 19",
      "TypeScript",
      "OpenSeadragon",
      "onnxruntime-web",
      "D3",
      "ECharts",
      "AG Grid",
      "WebGL",
      "Tailwind CSS",
      "Vitest",
    ],
    info: "기가픽셀급 병리 슬라이드를 브라우저에서 검토하고 AI 분석 결과를 함께 판독하는 임상 연구용 플랫폼. QC Dashboard, Worksheet, AI Assistant 모듈을 단독으로 기획·설계·개발했고, Viewer의 AI 분석 레이어를 전담했습니다.",
    highlights: [
      "onnxruntime-web 기반 브라우저 추론 파이프라인을 구축해 8개월간 운영한 뒤, 모델 다운로드 용량과 WASM 단일 스레드가 임상 사용성의 병목임을 확인하고 서버 추론 전환을 주도",
      "ROI 좌표 계약을 유지해 추론 위치가 바뀌어도 오버레이·차트 등 결과 소비 계층은 수정 없이 재사용",
      "모델 세션 싱글턴 캐싱과 in-flight 요청 병합으로 ROI 재지정 시마다 발생하던 모델 재로딩을 최초 1회로 축소",
      "어시스턴트 응답을 블록 목록으로 전달하는 Server-Driven UI 계약을 설계해, 블록 5종과 표 컬럼 타입 7종 조합만으로 프론트 수정 없이 새 요약 화면 추가 가능",
    ],
    role: [
      {
        title: "Viewer · AI 결과 검토 인터페이스 (AI 분석 레이어 전담)",
        tasks: [
          {
            name: null,
            details: [
              "HoVer-Net, FCOS 모델을 onnxruntime-web으로 브라우저에서 직접 추론하는 파이프라인 구축 및 8개월 운영 후 서버 추론 전환 주도",
              "기가픽셀 슬라이드 전체가 아닌 ROI 단위로 추론 범위를 제한해 연산량 최적화",
              "세포 윤곽 폴리곤을 WebGL 오버레이(타입 5종 색상 구분)로 렌더링하고 형태 지표 차트 4종 구현, 윤곽 ↔ 차트 양방향 선택 연동",
              "팬/줌 중 프레임 드랍을 프로파일링으로 원인 특정 후 디바운스와 렌더 스킵으로 해결",
            ],
          },
        ],
      },
      {
        title: "QC Dashboard · 데이터 품질 판별과 분석",
        tasks: [
          {
            name: null,
            details: [
              "품질 지표 8종을 한 화면에서 대조하는 다차원 분석 화면 설계: ECharts 평행좌표 위에 D3로 직접 구현한 Violin Plot(KDE 직접 계산) 오버레이",
              "그리드·차트·이미지 갤러리가 단일 선택 상태를 공유하는 linked brushing 구조 설계. 어느 뷰에서 선택해도 전체 동기화",
              "상태 10종 기반 필터 체계로 대시보드 리뉴얼. 의심 슬라이드는 OpenSeadragon 모달에서 DZI 스트리밍으로 정밀 판독하는 검수 흐름 구현",
            ],
          },
        ],
      },
      {
        title: "Worksheet · 의사결정형 대시보드",
        tasks: [
          {
            name: null,
            details: [
              "다수 Case를 개별로 열어봐야 했던 업무 흐름을 탐색 → 비교 → Viewer 진입까지 화면 전환 없이 이어지는 단일 허브로 재설계",
              "다중 필터 + 키워드 검색 + 자연어 검색(LLM 에이전트 연동)을 합성 가능한 파이프라인으로 구현하고 AI 판단 근거를 그리드 컬럼으로 노출",
              "필터와 선택 상태를 서버에 저장·복원해 재접속 시 작업을 그대로 이어받는 세션 연속성 확보",
            ],
          },
        ],
      },
      {
        title: "AI Assistant · 대화형 업무 허브",
        tasks: [
          {
            name: null,
            details: [
              "로그인 후 첫 화면을 AI Assistant 랜딩으로 재정의. 좌측 채팅과 우측 컨텍스트 뷰(기본 대시보드 ↔ 어시스턴트 생성 요약 패널)가 대화 흐름에 따라 전환되는 2컬럼 구조 설계·구현",
              "Server-Driven UI 응답 계약 설계: 블록 5종 + 표 컬럼 타입 7종",
              "위젯 4종을 레지스트리 기반 반응형 그리드로 구성하고 데이터 Provider 공유로 API 중복 호출 제거",
              "CSS 변수 디자인 토큰을 Tailwind에 매핑하고 Vitest + Testing Library 테스트 기반 도입",
            ],
          },
        ],
      },
    ],
  },
  {
    kind: "work",
    title: "VIENCE CANVAS",
    description: "노코드 데이터 분석 워크플로우 플랫폼의 시각화 에디터와 이미지 분석 모듈",
    bgColor: "rgba(63, 193, 201, 0.35)",
    textColor: "rgba(63, 193, 201, 1)",
    icon: LuWorkflow,
    company: "바이언스 (VIENCE)",
    position: "연구개발 프론트엔드 개발자",
    date: "2026.02 - 2026.04",
    tech: ["React 18", "TypeScript", "Vega-Lite", "OpenCV.js", "OpenSeadragon"],
    info: "비개발자가 대용량 데이터를 분석하는 노코드 워크플로우 제품. 시각화 에디터(Chart Editor)와 클라이언트 사이드 이미지 분석 모듈(Data Analyzer)을 기획부터 설계, 개발까지 담당했습니다.",
    highlights: [
      "Vega-Lite JSON 스펙 ↔ GUI 노드 트리 양방향 실시간 변환 에디터를 자체 노드 타입 시스템으로 설계·구현해 비개발자도 차트를 편집 가능",
      "자연어 → 차트 스펙 생성 AI Assistant 파이프라인 구축. 멀티턴 대화로 \"방금 차트를 막대로 바꿔줘\" 같은 연속 수정 지원",
      "서버 왕복 없이 브라우저에서 세포 이미지를 분석하는 OpenCV.js 파이프라인 구현. 4096px 초과 이미지는 타일 분할로 처리해 UI 프리징 없이 동작",
    ],
    role: [
      {
        title: "Chart Editor · 노코드 시각화 에디터",
        tasks: [
          {
            name: null,
            details: [
              "비개발자가 JSON 스펙을 다룰 수 없는 문제를 해결하기 위해 Vega-Lite 스펙 ↔ GUI 노드 트리 양방향 실시간 변환 에디터를 자체 노드 타입 시스템으로 설계·구현",
              "자연어 → 차트 스펙 생성 AI Assistant 파이프라인 구축, 멀티턴 대화 기반 연속 수정 지원",
              "Vega 표현식 토크나이저를 직접 구현해 사용자가 컬럼명만 입력하면 되도록 진입 장벽 완화",
            ],
          },
        ],
      },
      {
        title: "Data Analyzer · 클라이언트 사이드 이미지 분석 모듈",
        tasks: [
          {
            name: null,
            details: [
              "서버 왕복 없이 브라우저에서 세포 이미지를 분석하는 OpenCV.js 파이프라인 구현 (이진화 → 윤곽 추출 → 형태 특징 8종 계산)",
              "4096px 초과 이미지를 타일 분할(오버랩 적용, 경계 중복 제거)로 처리하고 이벤트 루프 양보로 UI 프리징 방지. 16-bit 이미지 자동 정규화 지원",
              "3-패널 비교 뷰를 OpenSeadragon 딥줌 기반으로 고도화. 차트 ↔ 세포 윤곽 양방향 하이라이팅으로 탐색적 분석 흐름 구현",
            ],
          },
        ],
      },
    ],
  },
];

export default workItems;

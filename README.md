# 📝 프로젝트 개발 가이드 (Development Guide)

이 문서는 프로젝트의 초기 설정, 환경 변수 구성, 아키텍처 및 실행 스크립트에 대한 가이드를 제공합니다.

---

## 🛠 1. VS Code 에디터 초기 세팅

팀 내 동일한 개발 환경 유지를 위해 아래 설정을 반드시 완료해 주세요.

### 1.1 확장 프로그램 (Extensions)

- **파일 위치**: `.vscode/extensions.json`
- **설정 내용**: `ESLint`, `Prettier` 등 필수 플러그인을 자동 설치하도록 제안합니다.
- **설치 방법**:
  - **온라인**: VS Code 우측 하단의 알림창을 통해 자동 설치를 진행합니다.
  - **오프라인**: 인터넷 연결이 제한된 경우, `docs/vscode-plugin` 폴더 내의 `.vsix` 파일들을 마우스 우클릭하여 **[VSIX에서 설치]** 메뉴를 통해 수동 설치합니다.

### 1.2 에디터 설정 (Settings)

- **파일 위치**: `.vscode/settings.json`
- **설정 내용**: 프로젝트 전체의 코드 스타일과 에디터 동작을 통일합니다.

### 1.3 환경 파일 복사

- 소스 다운로드 후 **최초 1회** 수행이 필요합니다.
- `docs/.env.development.local` 파일을 `env/` 폴더로 복사합니다.
  > ⚠️ **주의**: `.env.development.local`은 Git 관리 대상에서 제외되며, 로컬 개발 서버 URL 재정의 등 개인별 맞춤 설정을 위해 사용됩니다.

---

## 🌐 2. 환경 변수 (Environment Variables)

### 2.1 폴더 구성

- `env/.env`: **운영** 환경 기준
- `env/.env.development`: **개발** 환경 기준
- `env/.env.stage`: **스테이징** 환경 기준
- `env/.env.publish`: **퍼블리싱** 전용 환경

### 2.2 주요 속성 설명

| 속성명                     | 설명                                                               |
| :------------------------- | :----------------------------------------------------------------- |
| `ENABLE_PROXY_LOG`         | Vite Proxy 사용 시 터미널에 Request/Response 로그 표기 (로컬 전용) |
| `VITE_LOCAL_DEVELOP`       | 로컬 개발용 특수 동작 설정 (예: SSO 로그인 우회 등)                |
| `VITE_MAIN_PAGE`           | 메인 페이지 경로 (고정값)                                          |
| `VITE_API_PREFIX`          | 서버 API URI Prefix (수정 시 `.env` 파일에서 일괄 관리)            |
| `VITE_API_URL`             | Vite Proxy 사용을 위해 빈 값으로 고정                              |
| `VITE_LOCAL_API_URL`       | 로컬 개발 시 실제 호출할 대상 서버 URL                             |
| `VITE_SERVER_CONTEXT_PATH` | WAR 배포 시 Root가 아닌 특정 Context Path 기반 배포 경로 정의      |

---

## 📚 3. 주요 라이브러리 및 문서 (v2026 기준)

| 라이브러리          | 버전   | 공식 문서 URL                                                                       |
| :------------------ | :----- | :---------------------------------------------------------------------------------- |
| **Node.js**         | 22.x   | [Link](https://nodejs.org/docs/latest-v22.x/api/)                                   |
| **Vite**            | 7.2.4  | [Link](https://vite.dev/guide/)                                                     |
| **React**           | 18.3.1 | [Link](https://react.dev/reference/react)                                           |
| **React Router**    | 7.13.0 | [Link](https://reactrouter.com/home)                                                |
| **Zustand**         | 5.0.11 | [Link](https://zustand-demo.pmnd.rs/)                                               |
| **AG Grid**         | 35.1.0 | [Link](https://www.ag-grid.com/react-data-grid/getting-started/)                    |
| **Ant Design**      | 6.2.3  | [Link](https://ant.design/components/overview/)                                     |
| **Yup**             | 1.7.x  | [Link](https://github.com/jquense/yup)                                              |
| **Axios**           | 1.13.x | [Link](https://axios-http.com/docs/intro)                                           |
| **React Quill New** | 3.8.3  | [Link](https://www.google.com/search?q=https://github.com/gtgalone/react-quill-new) |

---

## 🏗 4. 기본 아키텍처

### 4.1 빌드 구조

- **Vite 기반 SPA**: SSR이 필요하지 않은 프로젝트 특성에 맞춰 Vite를 채택하여 빌드 속도와 개발 편의성을 극대화했습니다.
- **배포**: 빌드 결과물(`dist/` 폴더)은 Nginx 서버의 정적 파일 경로로 복사하여 배포합니다.
- **npm 대체**: 필요시 npm 대신 yarn, pnpm 같은 TOOL을 사용하셔도 무관합니다.

### 4.2 개발 패턴

- **상태 관리**: `useState` 대신 **Zustand Store**를 사용하여 전역/지역 상태를 관리합니다.
- **폼 유효성**: **Yup** 라이브러리를 통해 스키마 기반 검증을 수행합니다.
- **불변성 관리**: **Immer** 및 **use-immer**를 Zustand와 조합하여 상태 업데이트 로직을 단순화합니다.
- **타입스크립트**: 타입은 가능하면 any로만 사용하는 것을 추천드리며 기본적으로 any로 타입을 정의하지 않아도 되게끔 기본설정이 되어있습니다. 필요한 경우만 타입을 정의해서 사용하면 됩니다. 타입이 주는 장점은 code-assist, 정적 체크 2가지 큰 장점이 존재하지만 코드 가독성, 타입 변경시 스 수정에 대한 비용을 생각하면 사용하지 않는게 더 이득이 큽니다. 유지보수를 위한(중요한 비지니스 컴포넌트) 타입을 정의하는게 아니면 추천하지 않습니다.

### 4.3 공통 컴포넌트 (`src/components/common`)

- `AppButton`, `AppTextInput`, `AppSelect`, `AppTable` 등 표준화된 컴포넌트 제공.
- 상세 사용법은 각 컴포넌트 파일의 가이드 페이지를 참고하세요.

---

## 🚀 5. 실행 스크립트

터미널에서 아래 명령어를 사용하여 프로젝트를 실행하거나 빌드할 수 있습니다.

```bash
# 1. 로컬 개발 서버 실행
npm run dev

# 2. 퍼블리싱 모드 실행
npm run dev:publish

# 3. 프로젝트 빌드 (dist 폴더 생성)
npm run build

# 4. 빌드 수행 (문법 오류 체크 무시)
npm run build:pass
```

## 📂 6. 주요 폴더 및 파일 구조

### 📂 Root Directories

- **`/(Root)`**
  - `.prettierrc` / `eslint.config.js`: 코드 스타일 및 린트 설정
  - `vite.config.ts`: 로컬 Proxy 서버 설정 및 기본 빌드 설정
  - `index.html`: 최종 빌드되는 Template HTML 파일
- **`docs/`**
  - `nginx.conf`: Nginx Proxy 설정 (서버/프론트 도메인 교체 설정 포함)
  - `.env.development.local`: 로컬 개발용 환경 변수 원본 (복사해서 사용)
- **`env/`**: 각 환경별 설정 파일 모음
- **`public/`**: 빌드 시 정적 반영되는 리소스 폴더

### 📂 Source Code (`src/`)

- **`components/`**: UI 컴포넌트 (`common`: 공통, `layout`: 레이아웃, `modal`: 모달)
- **`config/`**: 전역 설정 및 상수
  - `Code.ts`(코드), `CommonConstant.ts`(상수), `Config.ts`(전역객체), `ModalType.ts`
- **`page/`**: 메뉴와 매핑되는 실제 화면 페이지 파일 모음
- **`store/`**: Zustand 상태 관리
  - `common/`: 공통 스토어
  - `slice/`: form, list 등 기능별 slice
  - `useAppStore.ts`: 전역 데이터 / `useUiStore.ts`: 전역 UI 제어
- **`data/`**: 메뉴 구성 데이터 및 테이블 예제 샘플 데이터
- **`routes/`**: 페이지 라우팅 및 권한 설정
- **`services/`**: 공통 유틸 서비스 및 비즈니스 로직
- **`resources/`**: SCSS 스타일, 이미지, 폰트 파일
- **`utils/`**: 프로젝트 공용 유틸리티 함수
- **`hooks/`**: 공통 Custom Hooks
- **`guide/`**: 개발 참고용 공통 컴포넌트 가이드
- **`publish/`**: 퍼블리싱 단계 결과물 관리

## 🧭 개발 가이드 메뉴 구조 (Guide Menu List)

| 상위 분류               | 타이틀 (Menu Title)                       | 메뉴 경로 (Menu Path)                                     |
| :---------------------- | :---------------------------------------- | :-------------------------------------------------------- |
| **공통 가이드**         | 버튼                                      | `/guides/dev/GuideButton`                                 |
|                         | 네비게이션                                | `/guides/dev/GuideNavigate`                               |
|                         | 토스트                                    | `/guides/dev/GuideToastService`                           |
|                         | 로딩바                                    | `/guides/dev/GuideLoadingBar`                             |
|                         | 에러 case                                 | `/guides/dev/GuideError`                                  |
|                         | ApiService                                | `/guides/dev/GuideApiService`                             |
|                         | alert, confirm 모달                       | `/guides/dev/GuideAlertConfirmModal`                      |
|                         | ModalService                              | `/guides/dev/GuideModalService`                           |
|                         | CodeService                               | `/guides/dev/GuideCodeService`                            |
| **input 가이드**        | textinput, searchinput                    | `/guides/dev/GuideAppTextInput`                           |
|                         | editor                                    | `/guides/dev/GuideAppTextEditor`                          |
|                         | checkbox, radio                           | `/guides/dev/GuideAppCheckbox`                            |
|                         | select                                    | `/guides/dev/GuideAppSelect`                              |
|                         | code-select                               | `/guides/dev/GuideAppCodeSelect`                          |
|                         | date-picker                               | `/guides/dev/GuideAppDatePicker`                          |
|                         | date-picker2                              | `/guides/dev/GuideAppDatePicker2`                         |
|                         | time-picker                               | `/guides/dev/GuideAppTimePicker`                          |
|                         | date-range-picker                         | `/guides/dev/GuideAppRangeDatePicker`                     |
|                         | date-range-picker2                        | `/guides/dev/GuideAppRangeDatePicker2`                    |
| **immer, zustand, yup** | immer 라이브러리 object case              | `/guides/dev/GuideImmer1`                                 |
|                         | immer 라이브러리 list case                | `/guides/dev/GuideImmer2`                                 |
|                         | zustand create                            | `/guides/dev/GuideZustandCreateFunction`                  |
|                         | zustand createStore                       | `/guides/dev/GuideZustandCreateStoreFunction`             |
|                         | zustand 내부 속성 변경 방법 예시          | `/guides/dev/GuideZustandNestedPropsUpdate`               |
|                         | zustand + immer                           | `/guides/dev/GuideZustandImmer`                           |
|                         | zustand + immer middleware                | `/guides/dev/GuideZustandImmerMiddleware`                 |
|                         | store 간의 소통 방법                      | `/guides/dev/GuideZustandStoreCommunication`              |
|                         | zustand slice 예시1                       | `/guides/dev/GuideZustandSliceCase1`                      |
|                         | zustand slice 예시2                       | `/guides/dev/GuideZustandSliceCase2`                      |
|                         | yup 예시1                                 | `/guides/dev/GuideYupCase1`                               |
|                         | yup 예시2                                 | `/guides/dev/GuideYupCase2`                               |
|                         | yup 예시3                                 | `/guides/dev/GuideYupCase3`                               |
|                         | yup 예시4                                 | `/guides/dev/GuideYupCase4`                               |
| **table**               | table basic                               | `/guides/dev/GuideTableBasic`                             |
|                         | table click                               | `/guides/dev/GuideTableClick`                             |
|                         | table select(only single)                 | `/guides/dev/GuideTableOnlySingleSelect`                  |
|                         | table select                              | `/guides/dev/GuideTableSelect`                            |
|                         | table select2                             | `/guides/dev/GuideTableSelect2`                           |
|                         | table selectable                          | `/guides/dev/GuideTableSeletable`                         |
|                         | table-code-use                            | `/guides/dev/GuideTableCodeLabel`                         |
|                         | table-button                              | `/guides/dev/GuideTableButton`                            |
|                         | table-store-use1                          | `/guides/dev/GuideTableUseStore1`                         |
|                         | table-store-use2                          | `/guides/dev/GuideTableUseStore2`                         |
|                         | table-batch-basic                         | `/guides/dev/GuideTableBatchBasic`                        |
|                         | table-batch-basic2                        | `/guides/dev/GuideTableBatchBasic2`                       |
|                         | table batch 행추가/삭제                   | `/guides/dev/GuideTableBatchAddDelete`                    |
| **개발 패턴 가이드**    | table 검색1(store)                        | `/guides/dev-pattern/GuidePatternTable1`                  |
|                         | table 검색2(immer)                        | `/guides/dev-pattern/GuidePatternTable2`                  |
|                         | table 검색3                               | `/guides/dev-pattern/GuidePatternTable3`                  |
|                         | form case 1 (store)                       | `/guides/dev-pattern/GuidePatternForm1`                   |
|                         | form case 2 (immer)                       | `/guides/dev-pattern/GuidePatternForm2`                   |
|                         | 테이블 batch 패턴 1                       | `/guides/dev-pattern/GuidePatternTableBatch1`             |
|                         | 테이블 batch 패턴 2                       | `/guides/dev-pattern/GuidePatternTableBatch2`             |
|                         | 테이블 batch 패턴 3                       | `/guides/dev-pattern/GuidePatternTableBatch3`             |
|                         | 테이블 batch 패턴 4                       | `/guides/dev-pattern/GuidePatternTableBatch4`             |
| **추가 개발 가이드**    | 검색 모달 인터페이스                      | `/guides/dev-pattern/GuideSearchModal1`                   |
|                         | 검색 모달 인터페이스(store)               | `/guides/dev-pattern/GuideSearchModal2`                   |
|                         | 목록+폼모달(store + list선택연동)         | `/guides/dev-pattern/GuidePatternListWidthFormModalCase1` |
|                         | 목록+폼모달(store + 상세ID)               | `/guides/dev-pattern/GuidePatternListWidthFormModalCase2` |
|                         | 목록+폼모달(useImmer + list선택연동)      | `/guides/dev-pattern/GuidePatternListWidthFormModalCase3` |
|                         | 목록+폼(store + list선택연동)             | `/guides/dev-pattern/GuidePatternListWidthFormCase1`      |
|                         | 목록+폼(store + 상세ID)                   | `/guides/dev-pattern/GuidePatternListWidthFormCase2`      |
|                         | 테이블간 선택 행 이동 case                | `/guides/dev-pattern/GuidePatternTwoListBatchCase1`       |
|                         | 2 list edit : applyTransaction            | `/guides/dev-pattern/GuidePatternTwoListBatchCase2`       |
|                         | 2 list edit : only store                  | `/guides/dev-pattern/GuidePatternTwoListBatchCase3`       |
|                         | 추가패턴 가이드1(좌측목록, 우측 폼, 목록) | `/guides/dev-pattern/EtcGuide1`                           |
|                         | 사용자 input(id base로 인터페이스)        | `/guides/dev/GuideAppUserInput`                           |

---

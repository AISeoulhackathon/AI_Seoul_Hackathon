# CLAUDE.md

> 2026 서울AI디지털배움터 청년 AI 해커톤 **기획 저장소**의 최상위 가이드다.
> Codex는 [AGENTS.md](./AGENTS.md), Cursor는 [.cursor/rules/planning-harness.mdc](./.cursor/rules/planning-harness.mdc)를 통해 이 문서를 참조한다.
> 상위 디렉터리의 `~/CLAUDE.md`(koreainvestment-gw용 KIS·HANDOFF 규칙)는 이 저장소에 적용하지 않는다. 충돌하면 이 문서를 따른다.
> 최종 수정: 2026-11-02

## 0. 세션 시작과 종료

### 시작 시

1. [docs/planning/work-plan.md](./docs/planning/work-plan.md) — 현재 단계, 미결정, 다음 할 일
2. [docs/hackathon/brief.md](./docs/hackathon/brief.md) — 해커톤 정보 정본 (트랙·핵심 가치·문제 근거)
3. 작업과 관련된 `docs/ideas/`, `docs/research/`, `docs/decisions/`, `docs/mvp/`

### 종료 시

- 단계·아이디어 상태·미결정이 바뀌었으면 `docs/planning/work-plan.md`를 갱신한다.
- 팀이 실제로 채택한 결정(트랙 선택, 아이디어 선정, 범위 확정)은 `docs/decisions/YYYYMMDD-<topic>.md`로 남긴다.
- 문서를 바꿨으면 `node scripts/harness-check.mjs`를 실행해 통과시킨다.

## 1. 프로젝트

| 항목 | 값 |
| --- | --- |
| 목적 | 해커톤 아이디어 발굴 → 평가·선정 → MVP 명세 → 발표 준비 |
| 현재 단계 | 기획 (아이디에이션·후보 구체화) |
| 결과물 스택 | **미정** — MVP 명세가 `approved` 되기 전까지 기술 스택·API·DB를 정하지 않는다 |

## 2. 핵심 정책

### 2-1. 판단 기준

모든 아이디어는 해커톤 핵심 가치로 판단한다. 정본은 [brief.md](./docs/hackathon/brief.md), 채점은 [rubric.md](./docs/evaluation/rubric.md)를 따른다.

- **실용성(Utility)** — 기술 과시가 아니라 시민이 즉시 쓰고 효용을 느끼는가
- **디지털 포용(Inclusion)** — 고령자·1인가구·장애인·소상공인 등 정보 약자가 도움 없이 쓸 수 있는 문턱 낮은 인터페이스인가
- **시민 체감(Impact)** — 일상에서 바뀌는 것이 눈에 보이는가
- **지속 가능성** — 데모로 끝나지 않고 서울시 시정·디지털배움터 현장에 연계될 수 있는가

### 2-2. 근거 규칙

- 통계·수치·제도명·기관명에는 출처를 단다. `brief.md`의 수치는 주최측 제공 근거로 인용할 수 있다.
- 출처를 확인하지 못한 사실은 지어내지 않고 `확인 필요`로 표시해 `docs/research/` 조사 대상으로 남긴다.
- 사용할 공공데이터·API는 실제 존재와 접근 조건을 확인하기 전까지 `확인 상태: 미확인`으로 둔다.

### 2-3. 미결정 다루기

- 심사 기준·배점, 일정, 제출물 형식, 팀 구성, 트랙 선택은 주최측 공지나 팀 합의 전까지 확정하지 않는다.
- 미결정은 `work-plan.md`의 미결정 표나 각 문서의 `미결정` 섹션에 남긴다.

### 2-4. 기획 파이프라인

```text
docs/note/        브레인스토밍·회의 메모 (임시, 근거 아님)
   ↓ 쓸 만한 것만 카드로
docs/research/    문제·사용자·데이터 조사 카드 (출처 필수)
docs/ideas/       아이디어 카드 IDEA_XX  draft → scored → shortlisted → selected | dropped
   ↓ rubric 채점·비교
docs/decisions/   팀이 채택한 결정 (트랙·아이디어 선정·범위)
   ↓
docs/mvp/         선정 아이디어의 MVP 명세 + 데모 시나리오  draft → approved
   ↓
docs/pitch/       발표 구성·스크립트
```

- 아이디어 상태 전이와 각 단계의 조건은 [docs/README.md](./docs/README.md)를 따른다.
- `selected`는 팀 결정이다. 에이전트는 비교·추천까지만 하고 `selected`로 바꾸지 않는다 — 사용자가 선정을 지시하면 decision 문서와 함께 바꾼다.
- `dropped` 카드는 지우지 않고 사유를 남긴다. 다른 아이디어의 재료가 된다.

### 2-5. 대회 준비·구현 경계

[공고·FAQ](./docs/hackathon/announcement-faq.md)의 사전 준비 범위를 모든 에이전트 작업에 적용한다.

- 본선 전에는 문제 정의·기능 기획·사용자 시나리오·발표 구성·디자인·개발 계획 문서를 준비한다. 계정·저장소·배포 환경·라이브러리 설치·빈 스캐폴딩은 허용 범위다.
- **핵심 기능 코딩은 2026-11-21 본선 현장 개발 시간에만 진행한다.** `approved`여도 사전 구현은 금지한다. commit 기록을 숨기거나 다시 작성해 사전 개발을 당일 개발로 보이게 하지 않는다.
- 현재 저장소의 `approved` 전 구현 금지 정책도 유지한다. 환경 세팅 허용을 서비스 기능 구현 허용으로 확대하지 않는다.
- 마라톤 후보의 AI 수집·추출, 통제 구간 지도 표시, 우회 경로 계산은 핵심 기능에 해당하는 것으로 취급한다. 사전에는 설계·자료 조사만 수행한다.
- 모의 해커톤은 본선 주제의 핵심 코드를 만들거나 재사용하지 않는 별개 연습 주제로 진행한다.
- MVP·발표 준비 시 작동 프로토타입, 기획·기대효과서 PDF, GitHub 소스, 접근성을 반영한 시연 발표자료를 모두 확인한다.
- 참가 인원은 5~6명, 개발 범위는 6시간 기준으로 계획한다. 공식 배점이 확인되기 전 내부 rubric을 공식 점수표로 표현하지 않는다.

## 3. 슬래시 커맨드

| 커맨드 | 용도 |
| --- | --- |
| `/ideate <트랙> [개수]` | 트랙별 아이디어 발산 → `draft` 카드 생성 |
| `/research <주제>` | 문제·사용자·데이터 조사 카드 작성 |
| `/score <IDEA_XX\|all>` | rubric로 채점 → `scored` |
| `/compare` | `scored` 이상 카드 비교표·추천 (선정은 하지 않음) |
| `/mvp <IDEA_XX>` | `selected` 카드의 MVP 명세 초안 |

## 4. 금지

- 출처 없는 통계·수치·제도·데이터셋 만들기
- 팀 결정 없이 `selected`·`approved`로 바꾸거나 트랙을 확정하기
- MVP 명세 `approved` 전 구현 코드 작성
- 실명·연락처 등 개인정보, 시크릿·토큰 커밋
- 하네스 규칙 삭제·완화로 검사 통과시키기
- `main` 직접 push

## 5. 검사

```bash
node scripts/harness-check.mjs
```

규칙 목록은 [docs/rules/harness.md](./docs/rules/harness.md)에 있다.

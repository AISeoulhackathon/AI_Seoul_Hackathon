# AGENTS.md

> Codex·Cursor 진입점. 정책의 단일 원천은 [CLAUDE.md](./CLAUDE.md)와 `docs/`다.
> 이 문서는 공통 정책을 복제하지 않고 참조 순서와 리뷰 기준만 정의한다.

## 작업 전 확인 순서

1. [docs/planning/work-plan.md](./docs/planning/work-plan.md)
2. [CLAUDE.md](./CLAUDE.md)
3. [docs/README.md](./docs/README.md)
4. [docs/hackathon/brief.md](./docs/hackathon/brief.md)
5. 요청과 관련된 `docs/ideas/`, `docs/research/`, `docs/decisions/`, `docs/mvp/`

분석·리뷰만 요청받으면 읽기 전용으로 수행한다.

## 작업 규칙

- 근거·미결정·상태 전이는 CLAUDE.md §2를 따른다.
- 문서를 바꾸면 `node scripts/harness-check.mjs`를 통과시킨다.
- Git 작업은 [docs/rules/git-conventions.md](./docs/rules/git-conventions.md)를 따른다.

## Review guidelines (PR 리뷰)

- 한국어로 작성하고 심각도를 표시한다: 🔴 must-fix / 🟡 제안 / 🟢 참고
- 🔴 항상 차단
  - 출처 없는 통계·수치, 존재가 확인되지 않은 데이터셋·API를 사실처럼 서술 (CLAUDE.md §2-2)
  - decision 문서 없이 `selected`·`approved` 전환 (CLAUDE.md §2-4)
  - 개인정보·시크릿 커밋, 하네스 규칙 삭제·완화
- 🟡 기획 품질
  - 정보 약자 관점이 빠진 인터페이스 (아이디어 카드의 `문턱 낮은 인터페이스` 체크 근거 부족)
  - 점수와 근거가 맞지 않는 채점, 해커톤 기간에 데모가 어려운 MVP 범위
- 하네스 검사로 잡히는 항목은 규칙 ID(R-XX)를 함께 적는다 ([docs/rules/harness.md](./docs/rules/harness.md)).
- 문제가 없으면 LGTM 요약만 남긴다.

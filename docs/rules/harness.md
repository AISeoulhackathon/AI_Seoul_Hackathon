# 하네스 규칙

> `node scripts/harness-check.mjs`가 검사하는 규칙. 규칙을 지우거나 완화해서 통과시키지 않는다 — 바꿔야 하면 decision 문서로 남긴다.

| ID | 대상 | 규칙 |
| --- | --- | --- |
| R-01 | 저장소 | 필수 문서(CLAUDE·AGENTS·brief·공고 FAQ·work-plan·rubric·인덱스·템플릿)가 있다 |
| R-02 | `ideas/IDEA_XX.md` | 파일명이 `IDEA_XX` 형식이고 frontmatter `id`와 같으며 중복이 없다 |
| R-03 | 아이디어 | frontmatter 필수 필드가 채워져 있고 `track`·`status`·`updated`가 허용값이다 |
| R-04 | 아이디어 | 템플릿의 필수 섹션이 모두 있다 |
| R-05 | 아이디어 | `scored`·`shortlisted`·`selected`면 평가 6개 기준이 1~5 정수이고 근거가 있다 |
| R-06 | 아이디어 | `selected`면 `decision`이 실제 `docs/decisions/*.md` 문서를 가리킨다 |
| R-07 | 아이디어 | `dropped`면 `dropped_reason`이 있다 |
| R-08 | `ideas/README.md` | 모든 카드가 인덱스에 있고 상태가 일치한다 |
| R-09 | `research/RES_XX.md` | `id`가 파일명과 같고 `## 출처`에 항목이 하나 이상 있다 |
| R-10 | `mvp/MVP_XX.md` | `id`가 파일명과 같고, `status`가 허용값이며, `idea`가 `selected` 카드다 |

| R-11 | `mvp/MVP_XX.md` | `대회 준비·제출 체크` 섹션이 있고 비어 있지 않다. 준비 경계·제출물 충족 여부는 수동 리뷰한다 |

`<...>`로 남은 템플릿 자리표시자는 빈 값으로 본다.

검사기가 잡지 못하는 것 — 출처의 진위, 점수와 근거의 정합, 인터페이스가 정말 문턱이 낮은지 — 은 PR 리뷰에서 본다 ([AGENTS.md](../../AGENTS.md)).

## 공고·FAQ 기반 수동 리뷰

- [CLAUDE.md §2-5](../../CLAUDE.md#2-5-대회-준비구현-경계)의 사전 핵심 기능 코딩 금지, 현장 6시간 범위, 5~6인 팀 요건을 확인한다.
- MVP 승인만으로 사전 핵심 기능 구현을 허용하지 않는다. 날짜만으로 현장 개발 시작을 자동 판정하지 않는다.
- 제출물 4종과 접근성 시연 계획을 확인한다. R-11은 섹션 존재만 검사하며 내용 충족·commit 준수 여부를 보증하지 않는다.

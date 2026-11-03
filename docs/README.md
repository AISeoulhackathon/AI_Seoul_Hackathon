# Docs

> 해커톤 기획 문서 진입점.

## 문서 지도

| 경로 | 용도 | 근거로 쓸 수 있나 |
| --- | --- | --- |
| `hackathon/brief.md` | 해커톤 정보 정본 (트랙·핵심 가치·주최측 문제 근거) | 예 |
| `hackathon/announcement-faq.md` | 2026-11-02 사용자 제공 공고·FAQ 정리, 사전 준비·제출 요건 | 예 (공유본, 웹 원문 독립 확인 전) |
| `planning/work-plan.md` | 현재 단계·미결정·다음 할 일 | 예 |
| `note/` | 브레인스토밍·회의 메모 | 아니오 |
| `research/` | 문제·사용자·데이터 조사 카드 `RES_XX` | 예 (출처 있는 항목만) |
| `ideas/` | 아이디어 카드 `IDEA_XX`와 인덱스 | 상태에 따름 |
| `evaluation/rubric.md` | 채점 기준 | 예 |
| `decisions/` | 팀이 채택한 결정 | 예 |
| `mvp/` | 선정 아이디어의 MVP 명세 `MVP_XX` | `approved`만 |
| `pitch/` | 발표 구성·스크립트 | — |
| `rules/` | 하네스·Git 규칙 | 예 |

## 아이디어 상태 전이

```text
draft ──/score──▶ scored ──/compare 후 후보 압축──▶ shortlisted ──팀 결정──▶ selected
  └────────────────────────────┴──────────────────────────┴──────▶ dropped (사유 기록)
```

| 상태 | 들어가는 조건 |
| --- | --- |
| `draft` | 필수 섹션이 있는 카드 |
| `scored` | 평가표 6개 기준 모두 1~5점 + 근거 |
| `shortlisted` | `/compare` 결과로 후보에 남김 |
| `selected` | 팀 결정 + `decision` 필드에 `docs/decisions/` 문서 경로 |
| `dropped` | `dropped_reason` 필드에 사유 |

## 파일 규칙

- 아이디어: `ideas/IDEA_XX.md` (`_template.md` 복사, 다음 빈 번호). 만들거나 상태를 바꾸면 `ideas/README.md` 인덱스도 갱신한다.
- 조사: `research/RES_XX.md` (`_template.md` 복사).
- 결정: `decisions/YYYYMMDD-<topic>.md` (`_template.md` 복사).
- MVP 명세: `mvp/MVP_XX.md` (`_template.md` 복사). `idea` 필드에 `selected` 카드 ID.
- 메모: `note/YYYYMMDD-<topic>.md`. 형식 자유.

# Git 컨벤션

## 브랜치

- `main` 직접 push 금지. 작업은 브랜치 → PR로 올린다.
- 이름: `<type>/<short-description>` (영문 kebab-case)

| type | 용도 |
| --- | --- |
| `idea` | 아이디어 카드 추가·수정 |
| `research` | 조사 카드 |
| `decision` | 결정 기록·상태 전환 |
| `mvp` | MVP 명세 |
| `pitch` | 발표 자료 |
| `chore` | 하네스·규칙·구조 |

예: `idea/welfare-batch-1`, `decision/select-track`

## 커밋

```text
<type>: <요약>
```

예: `idea: 복지 트랙 아이디어 4건 추가`, `decision: IDEA_03 선정`

## PR 전

```bash
node scripts/harness-check.mjs
```

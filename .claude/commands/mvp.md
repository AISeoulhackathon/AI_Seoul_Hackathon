---
description: selected 아이디어의 MVP 명세 초안을 만든다
argument-hint: <IDEA_XX>
---

`$ARGUMENTS`의 MVP 명세 초안을 쓴다.

1. 카드가 `selected`인지 확인한다. 아니면 멈추고 선정 결정이 먼저 필요하다고 알린다.
2. 카드·관련 RES·decision 문서를 읽고 `docs/mvp/_template.md`를 복사해 다음 빈 번호로 `MVP_XX.md`를 만든다 (`status: draft`).
3. [공고·FAQ](docs/hackathon/announcement-faq.md)의 사전 준비 제한과 제출물 4종을 명세에 반영한다. `approved` 이후에도 핵심 기능 코딩은 본선 당일 현장에서만 가능하다. 핵심 흐름은 6시간 내 구현 가능한 하나로 좁힌다. 데모 시나리오의 각 단계에 심사 포인트(U·I·C·S)를 표시한다.
4. 데이터·외부 연동이 `미확인`이면 데모용 대안(목업·샘플)을 함께 적는다. 기술 스택은 미결정 표에 옵션만 적고 정하지 않는다.
5. `node scripts/harness-check.mjs`를 통과시키고, `approved` 전에 팀이 정해야 할 것을 정리해 알려 준다.

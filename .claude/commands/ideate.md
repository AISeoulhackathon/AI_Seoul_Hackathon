---
description: 트랙별 아이디어를 발산해 draft 카드로 만든다
argument-hint: <welfare|small-biz|youth-jobs|free> [개수=3]
---

트랙 `$ARGUMENTS`로 해커톤 아이디어를 발산한다.

1. `docs/hackathon/brief.md`에서 해당 트랙의 문제 근거를, `docs/ideas/README.md`에서 기존 아이디어를 읽는다. 기존 카드와 겹치는 아이디어는 만들지 않는다.
2. 후보를 개수의 2배 이상 떠올린 뒤, 아래 질문으로 걸러 요청 개수만 남긴다.
   - 정보 약자(고령자·1인가구·장애인·소상공인 등)가 앱 설치·가입 없이 쓸 수 있나
   - AI가 빠지면 효용이 사라지나 (AI가 핵심인가)
   - 해커톤 기간에 핵심 흐름 하나를 데모할 수 있나
   - 서울시 부서·디지털배움터 현장에 이어질 곳이 있나
3. 남은 아이디어마다 `docs/ideas/_template.md`를 복사해 다음 빈 번호로 `IDEA_XX.md`를 만들고 `status: draft`, `updated`는 오늘 날짜로 채운다. 평가 표는 비워 둔다.
4. 통계·제도·데이터셋은 brief 인용이나 실제 출처만 쓴다. 모르면 `확인 필요`로 표시하고 데이터 표의 확인 상태를 `미확인`으로 둔다.
5. `docs/ideas/README.md` 인덱스에 행을 추가하고 `node scripts/harness-check.mjs`를 통과시킨다.
6. 만든 카드를 한 줄씩 요약하고, 근거 보강이 필요한 카드를 알려 준다.

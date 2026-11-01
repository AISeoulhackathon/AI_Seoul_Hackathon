---
description: rubric으로 아이디어를 채점해 scored로 바꾼다
argument-hint: <IDEA_XX | all>
---

`$ARGUMENTS` 아이디어를 채점한다 (`all`이면 `draft` 카드 전부).

1. `docs/evaluation/rubric.md`를 읽고 기준·채점 원칙을 따른다.
2. 카드마다 6개 기준(U·I·C·S·F·D)을 1~5 정수로 매기고 근거를 한 줄 이상 쓴다. 근거는 카드 본문·brief·RES 카드 안에서만 찾는다. 근거가 없으면 3점을 넘기지 않는다.
3. 여러 카드를 채점하면 끝난 뒤 같은 기준끼리 나란히 놓고 점수를 맞춘다.
4. 합계를 채우고 `status: scored`, `updated`를 갱신한다. `docs/ideas/README.md`의 상태·합계도 갱신한다.
5. `node scripts/harness-check.mjs`를 통과시키고, 점수표와 점수를 올리려면 무엇을 보강해야 하는지 알려 준다.

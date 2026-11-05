---
id: RES_01
topic: 마라톤 통제 구간을 피하는 길찾기 — 경로 API의 구역 회피 가능성과 데이터 한계
related_ideas: [IDEA_03]
updated: 2026-11-04
---

# RES_01: 마라톤 통제 구간을 피하는 길찾기

## 질문

1. 길찾기 API로 "이 구역(마라톤 통제 구간)을 피한 경로"를 계산할 수 있는가? 자동차와 도보 모두 되는가?
2. 국내 길찾기 API(카카오모빌리티)는 임의 구역 회피나 통제 정보 반영을 지원하는가? 이용 조건은?
3. 기존 내비게이션은 이미 마라톤 통제를 피해 안내하는가? 그렇다면 IDEA_03은 무엇이 달라야 하는가?
4. 회피에 필요한 통제 구간 데이터(구간·시간·보행 정보)는 공지에서 얻을 수 있는가?

## 발견

| 사실 | 출처 | 확인일 |
| --- | --- | --- |
| openrouteservice(ORS) 길찾기는 `options.avoid_polygons`에 GeoJSON Polygon·MultiPolygon으로 피할 구역을 받는다. 같은 `options`의 `avoid_features`는 자동차(driving-*)에서 highways·tollways·ferries·fords, 도보(foot-*)에서 ferries·fords·steps를 지원한다 | [ORS Routing Options](https://giscience.github.io/openrouteservice/api-reference/endpoints/directions/routing-options) | 2026-11-04 |
| ORS 포럼 답변: `avoid_polygons`는 GET 요청으로는 쓸 수 없고 POST 요청이 필요하다 | [ORS 포럼](https://ask.openrouteservice.org/t/ors-directions-with-avoid-polygons-parameter/3364) | 2026-11-04 |
| ORS 포럼에 다각형을 넣었는데도 경로가 그 안을 지나간다는 사용자 보고가 있다(공식 확인된 버그는 아님) | [ORS 포럼](https://ask.openrouteservice.org/t/cant-avoid-polygons-the-rendered-route-sometimes-doesnt-avoid-given-polygons/5620) | 2026-11-04 |
| GraphHopper는 요청 시 `block_area`로 구역을 막을 수 있고, 개발진은 구역 제한에 custom model의 areas를 권한다. custom area 규칙이 무시됐다는 사용자 보고도 있다 | [GraphHopper 포럼 1](https://discuss.graphhopper.com/t/polygon-blocked-area-issue/6336/4), [포럼 2](https://discuss.graphhopper.com/t/routing-api-not-processing-exclusion-areas/9270) | 2026-11-04 |
| 카카오모빌리티 자동차 길찾기의 `avoid`는 ferries·toll·motorway·schoolzone·uturn만 받는다(도로 종류 회피). `roadevent`는 0=전체 차선 통제 정보 반영(기본), 1=출발지·목적지 주변 통제 미반영, 2=모든 구간 통제 미반영. 경유지 `waypoints`는 최대 5개 | [카카오모빌리티 자동차 길찾기 가이드](https://developers.kakaomobility.com/guide/navi-api/directions.html) | 2026-11-04 |
| 2016년 카카오–서울시 협약: 서울시가 도로포장·굴착·싱크홀 등 도로 통제의 위치·규모·통제 구역·통제 시간을 실시간 제공하고, 카카오내비가 통제 구간을 표기하고 회피 경로로 안내한다(카카오맵·카카오택시 포함) | [카카오 보도자료, 2016-11-17](https://www.kakaocorp.com/page/detail/8181) | 2026-11-04 |
| 2025-05-03 서울 도심 마라톤 2건(유아차 런·여성마라톤)에 대해 "카카오내비와 T맵, 네이버 내비게이션 서비스를 통해 우회로를 안내한다"고 보도됐다. 상세 통제 시간·우회 구간은 대회 누리집을 보라고 안내 | [서울신문, 2025-05-01](https://m.go.seoul.co.kr/news/2025/05/01/20250501500142) | 2026-11-04 |
| 2026 서울달리기(10-11): 세종대로·종로 05:30~09:00, 청계로 09:18~11:10 차량 전면 통제. 안내 채널은 서울경찰청 교통정보 안내전화·교통정보센터 홈페이지·카카오톡 '서울경찰교통정보'·대회 홈페이지. 보행·횡단 안내는 기사에 없고 "교통경찰 수신호에 따라 달라"는 당부만 있다 | [파이낸셜뉴스, 2026-10-08](https://www.fnnews.com/news/202610081046257294) | 2026-11-04 |
| 2020년 보도: 티맵·카카오내비 등 민간 내비 대부분이 경찰과 업체의 단체 대화방에서 통제 정보를 얻었고, 통제 상황이 내비에 실시간 연동되지 않았다(장마철 도로 통제 사례) | [YTN, 2020-08-11](https://www.ytn.co.kr/_ln/0101_202008110426518274) | 2026-11-04 |

## 시사점

> 아래는 위 사실에서 끌어낸 추론이다. 구현으로 검증하지 않았다.

**유리한 점**

- **구역 회피 자체는 기술적으로 가능하다.** ORS `avoid_polygons`는 자동차와 도보 프로필 모두에서 통제 구간 다각형을 피하는 경로를 요청할 수 있다. 공지에서 만든 통제 구간을 GeoJSON으로 넘기면 된다.
- **혼합 구조가 현실적이다.** 국내 API로 평소 경로를 받고 → 통제 구간과 겹치는지 지도 위에서 판정하고(선–다각형 교차) → 겹치면 시간·구간을 경고하고 → 요청 시 ORS로 회피 경로를 받는 흐름. 이미 채택한 "경로 영향 확인 우선, 자동 우회는 확장"([결정](../decisions/20261102-marathon-ai-workflow.md))과 맞는다.
- **회피 결과를 다시 검사할 수 있다.** 포럼에 회피 실패 보고가 있으므로, 받은 회피 경로가 통제 구간과 다시 겹치는지 같은 교차 판정으로 확인하고 겹치면 "자동 우회 실패, 공식 안내 확인"으로 표시하면 된다.

**불리한 점**

- **자동차 우회 경로만으로는 차별성이 약하다.** 2025년 서울 마라톤에서 카카오내비·T맵·네이버 내비가 이미 우회로를 안내했고, 카카오내비는 서울시 통제 정보를 받아 회피하는 체계가 2016년부터 있다. 카카오 API의 `roadevent=0`도 전면 통제를 반영한다. 그러므로 IDEA_03의 가치는 "우회 경로 계산"이 아니라 다른 데서 나와야 한다.
  - 출발 전 계획: 출발 예정 시각 기준으로 어느 구간이 언제 막히는지 미리 보여주기. 실시간 연동이 늦을 수 있다는 2020년 보도가 있으나 현재도 그런지는 확인 필요.
  - 보행자: 공지에 보행·횡단 정보가 거의 없다. "건널 수 있는가"는 기존 내비가 답하지 않는 영역이다.
  - 쉬운 말과 원문 근거: 정보 약자에게 구간·시간을 쉬운 말로, 공지 원문과 함께 보여주기.
- **카카오 API로는 임의 구역 회피가 안 된다.** `avoid`는 도로 종류만 받고, 경유지 최대 5개로 간접 우회만 가능하다. 통제 정보 반영(`roadevent`)은 카카오가 그 대회의 통제를 데이터로 갖고 있을 때만 의미가 있고, 우리가 만든 통제 구간을 넣는 방법은 없다.
- **ORS는 실시간 교통을 모른다.** OpenStreetMap 기반이라 우회 경로의 소요 시간이 실제와 다를 수 있고, 서울 도로·보행로 데이터 품질은 따로 확인해야 한다.
- **시간대가 구간마다 다르다.** 서울달리기 예에서도 세종대로·종로와 청계로의 통제 시간이 다르다. 출발 시각과 각 구간 통과 예상 시각으로 "그때 막혀 있는 구간"만 골라 회피 다각형을 만들어야 한다. 통과 시각을 계산하지 못하면 해당 구간을 "시간 확인 필요"로 남긴다(IDEA_03 표시 원칙).
- **보행 회피는 데이터가 없다.** 통제 공지가 차량 기준이라, 보행 통제·횡단 가능 지점을 모르면 도보 회피 경로를 만들 근거가 없다. 차량 통제 구간을 보행 금지로 일반화하지 않는다는 IDEA_03 원칙을 유지해야 한다.
- **대회 규칙:** 우회 경로 계산은 이 저장소에서 핵심 기능으로 분류된다([CLAUDE.md §2-5](../../CLAUDE.md#2-5-대회-준비구현-경계)). 사전에는 API 키 발급, 이용 조건 확인, 통제 데이터 조사, 설계 문서까지만 한다.

## 확인 필요

- ORS 공개 API의 회피 다각형 제한(검색 결과에 "면적 200km², 가로·세로 20km, 회피 시 거리 150km"가 나왔으나 공식 제한 페이지 원문을 열지 못함)과 일일·분당 요청 한도
- ORS·GraphHopper의 서울 도로·보행로(횡단보도·지하도·육교) 데이터 품질
- 카카오모빌리티 이용 조건: 검색 결과에서 "무료 쿼터 안에서는 제휴 없이 사용 가능, 상업적 목적이면 쿼터 안이라도 사전 제휴 필요"라는 [데브톡](https://devtalk.kakao.com/c/kakaonavi/106) 파트너 답변이 보였으나 스레드 원문을 열어 확인하지 못함. 무료 쿼터 수치, 해커톤 출품이 '상업적 목적'에 해당하는지, 도보 길찾기 API의 회피 옵션과 사용 권한 신청 절차
- 카카오내비·T맵·네이버 내비가 마라톤 통제를 언제부터(통제 시작 전/직후) 반영하는지, 2020년 보도의 "실시간 미연동"이 지금도 맞는지
- 마라톤 통제 구간의 좌표·시간을 기계가 읽을 수 있는 형태로 주는 공공 출처(서울경찰청 교통정보센터, 서울시 교통정보 등)가 있는지
- 마라톤 당일 보행 횡단 통제·가능 지점을 공지하는 출처가 있는지
- Valhalla 등 다른 오픈소스 엔진의 구역 회피 기능(이번 검색에서 원문 확인 못 함)

## 출처

- openrouteservice, Routing Options — https://giscience.github.io/openrouteservice/api-reference/endpoints/directions/routing-options
- openrouteservice 포럼, ORS directions with avoid polygons parameter — https://ask.openrouteservice.org/t/ors-directions-with-avoid-polygons-parameter/3364
- openrouteservice 포럼, Can't avoid polygons — https://ask.openrouteservice.org/t/cant-avoid-polygons-the-rendered-route-sometimes-doesnt-avoid-given-polygons/5620
- GraphHopper 포럼, Polygon blocked area issue — https://discuss.graphhopper.com/t/polygon-blocked-area-issue/6336/4
- GraphHopper 포럼, Routing API not processing exclusion areas — https://discuss.graphhopper.com/t/routing-api-not-processing-exclusion-areas/9270
- 카카오모빌리티, 자동차 길찾기 가이드 — https://developers.kakaomobility.com/guide/navi-api/directions.html
- 카카오 데브톡, 카카오내비 게시판 (이용 조건 답변, 원문 미확인) — https://devtalk.kakao.com/c/kakaonavi/106
- 카카오, 카카오내비 이용자 안전 확보에 앞장서 (2016-11-17) — https://www.kakaocorp.com/page/detail/8181
- 서울신문, 토요일 서울 도심 곳곳 마라톤 대회… 교통 통제 확인하세요 (2025-05-01) — https://m.go.seoul.co.kr/news/2025/05/01/20250501500142
- 파이낸셜뉴스, 11일 서울시 마라톤 대회 앞두고 경찰 대중교통 이용 당부 (2026-10-08) — https://www.fnnews.com/news/202610081046257294
- YTN, 장마철 '먹통 내비게이션'의 실체...경찰·업자 단톡방에 의존 (2020-08-11) — https://www.ytn.co.kr/_ln/0101_202008110426518274

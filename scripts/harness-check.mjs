#!/usr/bin/env node
// 기획 하네스 규칙 검사. 규칙 설명은 docs/rules/harness.md.
// 사용: node scripts/harness-check.mjs
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");

const REQUIRED_FILES = [
  "CLAUDE.md",
  "AGENTS.md",
  "docs/README.md",
  "docs/planning/work-plan.md",
  "docs/hackathon/brief.md",
  "docs/hackathon/announcement-faq.md",
  "docs/evaluation/rubric.md",
  "docs/ideas/README.md",
  "docs/ideas/_template.md",
  "docs/research/_template.md",
  "docs/decisions/_template.md",
  "docs/mvp/_template.md",
];
const TRACKS = ["welfare", "small-biz", "youth-jobs", "free"];
const IDEA_STATUSES = ["draft", "scored", "shortlisted", "selected", "dropped"];
const SCORED_STATUSES = ["scored", "shortlisted", "selected"];
const IDEA_FIELDS = ["id", "title", "track", "status", "target_users", "updated"];
const IDEA_SECTIONS = [
  "한 줄 요약",
  "문제",
  "대상 사용자",
  "해결 방식",
  "문턱 낮은 인터페이스",
  "시민 체감 시나리오",
  "MVP 범위",
  "데이터·API",
  "서울시 시정·디지털배움터 연계",
  "리스크",
  "평가",
  "미결정",
];
const CRITERIA = ["U", "I", "C", "S", "F", "D"];
const MVP_STATUSES = ["draft", "approved"];

const errors = [];
const fail = (rule, file, msg) => errors.push(`[${rule}] ${file}: ${msg}`);

const read = (rel) => readFileSync(join(ROOT, rel), "utf8");
const isBlank = (v) => v === undefined || v.trim() === "" || v.trim().startsWith("<");

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return fm;
}

function section(text, title) {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => l.trim() === `## ${title}`);
  if (start < 0) return null;
  const end = lines.findIndex((l, i) => i > start && l.startsWith("## "));
  return lines.slice(start + 1, end < 0 ? undefined : end).join("\n");
}

function cards(dir, prefix) {
  const abs = join(DOCS, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .filter((f) => f.startsWith(prefix) && f.endsWith(".md"))
    .map((f) => `docs/${dir}/${f}`);
}

// R-01 필수 문서
for (const f of REQUIRED_FILES) {
  if (!existsSync(join(ROOT, f))) fail("R-01", f, "필수 문서가 없다");
}

// 아이디어 카드 R-02 ~ R-07
const ideas = new Map();
for (const file of cards("ideas", "IDEA_")) {
  const text = read(file);
  const fm = frontmatter(text);
  const name = basename(file, ".md");
  if (!/^IDEA_\d{2,}$/.test(name)) fail("R-02", file, "파일명은 IDEA_XX.md 형식이어야 한다");
  if (!fm) {
    fail("R-03", file, "frontmatter가 없다");
    continue;
  }
  if (fm.id !== name) fail("R-02", file, `id(${fm.id})가 파일명(${name})과 다르다`);
  if (ideas.has(fm.id)) fail("R-02", file, `id ${fm.id}가 중복된다`);
  ideas.set(fm.id, { file, fm });

  for (const k of IDEA_FIELDS) if (isBlank(fm[k])) fail("R-03", file, `frontmatter '${k}'가 비어 있다`);
  if (fm.track && !TRACKS.includes(fm.track)) fail("R-03", file, `track '${fm.track}'는 ${TRACKS.join("|")} 중 하나여야 한다`);
  if (fm.status && !IDEA_STATUSES.includes(fm.status)) fail("R-03", file, `status '${fm.status}'는 ${IDEA_STATUSES.join("|")} 중 하나여야 한다`);
  if (fm.updated && !/^\d{4}-\d{2}-\d{2}$/.test(fm.updated)) fail("R-03", file, "updated는 YYYY-MM-DD 형식이어야 한다");

  for (const s of IDEA_SECTIONS) if (section(text, s) === null) fail("R-04", file, `'## ${s}' 섹션이 없다`);

  if (SCORED_STATUSES.includes(fm.status)) {
    const table = section(text, "평가") ?? "";
    for (const c of CRITERIA) {
      const row = table.split("\n").find((l) => l.startsWith(`| ${c} `));
      const cells = row ? row.split("|").map((x) => x.trim()) : [];
      const score = Number(cells[2]);
      if (!Number.isInteger(score) || score < 1 || score > 5) fail("R-05", file, `${c} 점수가 1~5 정수가 아니다`);
      if (!cells[3]) fail("R-05", file, `${c} 점수 근거가 비어 있다`);
    }
  }

  if (fm.status === "selected") {
    if (isBlank(fm.decision)) fail("R-06", file, "selected 카드는 decision 경로가 필요하다");
    else if (!/^docs\/decisions\/.+\.md$/.test(fm.decision) || !existsSync(join(ROOT, fm.decision)))
      fail("R-06", file, `decision '${fm.decision}' 문서가 docs/decisions/에 없다`);
  }
  if (fm.status === "dropped" && isBlank(fm.dropped_reason)) fail("R-07", file, "dropped 카드는 dropped_reason이 필요하다");
}

// R-08 인덱스 등재
if (existsSync(join(DOCS, "ideas/README.md"))) {
  const index = read("docs/ideas/README.md");
  for (const [id, { file, fm }] of ideas) {
    const row = index.split("\n").find((l) => l.includes(`| ${id} `) || l.includes(`[${id}]`));
    if (!row) fail("R-08", file, `docs/ideas/README.md 인덱스에 ${id}가 없다`);
    else if (fm.status && !row.split("|").map((x) => x.trim()).includes(fm.status))
      fail("R-08", file, `인덱스의 상태가 카드 status(${fm.status})와 다르다`);
  }
}

// R-09 조사 카드 출처
for (const file of cards("research", "RES_")) {
  const text = read(file);
  const fm = frontmatter(text);
  const name = basename(file, ".md");
  if (!fm || fm.id !== name) fail("R-09", file, "frontmatter id가 파일명과 같아야 한다");
  const sources = (section(text, "출처") ?? "").split("\n").filter((l) => /^\s*-\s+/.test(l) && !isBlank(l.replace(/^\s*-\s+/, "")));
  if (sources.length === 0) fail("R-09", file, "'## 출처'에 출처가 하나 이상 있어야 한다");
}

// R-10 MVP 명세
for (const file of cards("mvp", "MVP_")) {
  const text = read(file);
  const fm = frontmatter(text);
  const name = basename(file, ".md");
  // R-11 형식 검사만 수행한다. 실제 준비 경계·제출 충족 여부는 리뷰한다.
  const checklist = section(text, "대회 준비·제출 체크");
  if (!checklist || !checklist.trim())
    fail("R-11", file, "'## 대회 준비·제출 체크'에 사전 준비 경계와 제출물 확인 항목이 필요하다");
  if (!fm || fm.id !== name) {
    fail("R-10", file, "frontmatter id가 파일명과 같아야 한다");
    continue;
  }
  if (!MVP_STATUSES.includes(fm.status)) fail("R-10", file, `status는 ${MVP_STATUSES.join("|")} 중 하나여야 한다`);
  const idea = ideas.get(fm.idea);
  if (!idea) fail("R-10", file, `idea '${fm.idea}' 카드가 없다`);
  else if (idea.fm.status !== "selected") fail("R-10", file, `idea ${fm.idea}가 selected 상태가 아니다`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\nharness-check: ${errors.length}건 위반`);
  process.exit(1);
}
console.log(`harness-check: 통과 (아이디어 ${ideas.size}건)`);

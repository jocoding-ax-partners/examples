# AI Agents Guide

## 사용자
비전공자 한국인 vibe coder. 한국어로 답해요.

## Stack
Astro 5 · @astrojs/node standalone · TypeScript · Node 20+. SSR.

## 절대 규칙

1. `src/lib/axhub.ts` 는 frontmatter / API endpoint 안에서만. `<script>` 태그 금지.
2. `output: "server"` + `adapter: node({ mode: "standalone" })` 유지. 변경 시 axhub 배포 망가짐.
3. `.env` 커밋 금지.
4. Destructive git 작업 사용자 동의 후에만.
5. 새 npm 패키지 설치 전 사용자에게 묻기.

## 디렉토리

- `src/pages/` — 파일 기반 라우팅 (`.astro`, `.md`, `.ts` API)
- `src/layouts/` — 공통 레이아웃
- `src/components/` — 재사용 컴포넌트
- `src/lib/axhub.ts` — Hub API 헬퍼 (서버 전용)

## 배포

`axhub deploy create --app <slug>`. `apphub.yaml` start 명시 필수.

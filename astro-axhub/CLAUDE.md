# Claude Code 가이드

이 프로젝트는 **axhub 바이브코딩 템플릿 (Astro 5 SSR)** 이에요.

## 사용자 가정
비전공자 한국인 vibe coder. 한국어로 답해요.

## Stack
- Astro 5
- @astrojs/node (standalone)
- TypeScript
- Node 20+

## 응답 가이드
- 한국어로.
- `.astro` 한 파일 안에 frontmatter + 템플릿 + scoped style 같이 두는 게 Astro 컨벤션. 분리하지 마요.
- React/Vue 가 정말 필요한 경우만 island 추가 — 안 그러면 그냥 `.astro`.
- `file:line` 으로 변경 보고.

## 절대 규칙
1. `src/lib/axhub.ts` 는 frontmatter / API endpoint / getStaticPaths 안에서만. `<script>` 태그 금지.
2. `.env` 절대 커밋 금지.
3. Destructive git 작업 사용자 동의 후에만.
4. 새 npm 패키지 설치 전 한 번 물어봐요.
5. `output: "server"` 와 `adapter: node({ mode: "standalone" })` 절대 바꾸지 마요. 이게 axhub 배포의 핵심.

## 배포
`/axhub:deploy` 또는 `axhub deploy create --app <slug>`. `apphub.yaml` 의 `start` 가 `npm start` 인지 확인.

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

## axhub.ts 신뢰 모델 (6개 템플릿 공통)

이 템플릿의 axhub 헬퍼는 6개 템플릿 모두 **동일한 외부 API** 를 노출해요:
`axhub.fetch(path)`, `axhub.data(resource)`, `axhub.slug`, `axhub.isConfigured`.
**다른 템플릿 코드를 복사해도 호환돼요.**

차이는 전송(transport) 한 가지뿐 (구조적 차이, 게으름 아님):

| 템플릿 | 위치 | 인증 방식 |
|--------|------|-----------|
| nextjs-axhub | `lib/axhub.ts:24` | `Authorization: Bearer ${process.env.APPHUB_API_KEY}` (Server) |
| express-axhub | `lib/axhub.js:20` | 동일 (Server) |
| remix-axhub | `app/lib/axhub.server.ts:21` | 동일 (Server) |
| astro-axhub | `src/lib/axhub.ts:21` | 동일 (Server) |
| hono-axhub | `src/lib/axhub.ts:20` | 동일 (Server) |
| **vite-react-axhub** | `src/lib/axhub.ts:19,28` | `credentials: "include"` (Browser, **시크릿 키 미주입**) |

**규칙:** Astro 의 frontmatter / API endpoint 는 항상 서버에서 실행 → `process.env.APPHUB_API_KEY` 안전.
`<script>` 태그는 클라이언트 — 거기서 axhub 호출 금지. frontmatter 또는 `src/pages/api/*.ts` 에서만 호출.

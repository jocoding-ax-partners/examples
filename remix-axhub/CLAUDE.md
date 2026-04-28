# Claude Code 가이드

이 프로젝트는 **axhub 바이브코딩 템플릿 (Remix 2 SSR)** 이에요.

## 사용자 가정
비전공자 한국인 vibe coder. 한국어로 답해요.

## Stack
- Remix 2 (Vite-based)
- React 18
- TypeScript 5 strict
- Node 20+
- 데이터: `app/lib/axhub.server.ts` (서버 전용)

## 응답 가이드
- 한국어로.
- 새 기능은 가능하면 **한 라우트 파일** 에 loader + action + 컴포넌트 모두 — Remix 의 강점.
- `file:line` 으로 변경 보고.

## 절대 규칙
1. `axhub.server.ts` 는 **loader / action 안에서만** 호출. 컴포넌트 함수 본문 금지.
2. `.server.ts` 접미사를 절대 떼지 마요. 클라이언트 번들 노출 위험.
3. `.env` 절대 커밋 금지.
4. Destructive git 작업 사용자 동의 후에만.
5. 새 npm 패키지 설치 전 한 번 물어봐요.
6. `<Form>` (Remix) 컴포넌트 우선. SPA 처럼 `fetch` + `setState` 로 폼 처리하지 마요.

## 배포
`/axhub:deploy` 또는 `axhub deploy create --app <slug>`. `apphub.yaml` 의 `start` 가 `npm start` (remix-serve) 인지 확인.

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

**규칙:** `axhub.server.ts` 의 `.server.ts` 접미사가 클라이언트 번들 노출 자동 차단. 떼지 마요.
loader / action 안에서만 호출 — 컴포넌트 본문 호출은 server 코드를 클라이언트로 끌고 와서 위험.

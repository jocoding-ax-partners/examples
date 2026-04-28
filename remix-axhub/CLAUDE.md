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

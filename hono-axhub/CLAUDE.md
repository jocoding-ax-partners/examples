# Claude Code 가이드

이 프로젝트는 **axhub 바이브코딩 서버 템플릿 (Hono + Node)** 이에요.

## 사용자 가정
비전공자 한국인 vibe coder. 한국어로 답해요.

## Stack
- Hono 4 (web framework)
- @hono/node-server (Node 어댑터)
- TypeScript strict
- Node 20+

## 응답 가이드
- 한국어로.
- 새 라우트는 `src/index.ts` 에 직접. 폴더 분리 금지.
- import 경로는 **`.js` 확장자 붙여요** (NodeNext ESM 컨벤션). 예: `import { axhub } from "./lib/axhub.js";`
- `file:line` 으로 변경 보고.

## 절대 규칙
1. `APPHUB_API_KEY` 응답/로그 노출 금지.
2. `.env` 절대 커밋 금지.
3. Destructive git 작업 사용자 동의 후에만.
4. 새 npm 패키지 설치 전 한 번 물어봐요.
5. 입력 검증 — `c.req.json()` 결과를 그대로 외부 API 로 흘리지 마요.

## 배포
`/axhub:deploy` 또는 `axhub deploy create --app <slug>`. health_path = `/api/health`.

# AI Agents Guide

## 사용자
비전공자 한국인 vibe coder. 한국어로 답해요.

## Stack
Remix 2 · React 18 · TypeScript strict · Node 20+. SSR.

## 절대 규칙

1. `app/lib/axhub.server.ts` 는 loader/action 안에서만. 컴포넌트 함수 본문 호출 금지.
2. `.server.ts` 접미사 절대 떼지 마요.
3. `.env` 커밋 금지.
4. Destructive git 작업 사용자 동의 후에만.
5. 새 npm 패키지 설치 전 사용자에게 묻기.
6. 폼은 `<Form>` (Remix) 컴포넌트.

## 디렉토리

- `app/routes/` — 파일 기반 라우팅 (`_index.tsx` = `/`)
- `app/lib/*.server.ts` — 서버 전용 모듈
- `app/root.tsx` — HTML 셸

## 배포

`axhub deploy create --app <slug>` 또는 `/axhub:deploy`. `apphub.yaml` 명시 필수.

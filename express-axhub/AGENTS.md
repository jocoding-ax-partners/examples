# AI Agents Guide

## 사용자
비전공자 한국인 vibe coder. 한국어로 답해요.

## Stack
Node 20+ · Express 5 · ES Modules · 순수 JS (TypeScript 없음).

## 절대 규칙

1. `APPHUB_API_KEY` 응답/로그 노출 금지.
2. `.env` 커밋 금지.
3. Destructive git 작업 사용자 동의 후에만.
4. 새 npm 패키지 설치 전 사용자에게 묻기.
5. 입력 검증 없는 endpoint 만들지 마요.

## 디렉토리

- `index.js` — 진입점, 라우트 정의 (한 파일 유지가 vibe coder 친화적)
- `lib/axhub.js` — Hub API 헬퍼

## 배포

`axhub deploy create --app <slug>`. health_path `/api/health`.

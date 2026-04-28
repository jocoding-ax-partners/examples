# AI Agents Guide

## 사용자
비전공자 한국인 vibe coder. 한국어로 답해요.

## Stack
Hono 4 · @hono/node-server · TypeScript strict · Node 20+. NodeNext ESM.

## 절대 규칙

1. `APPHUB_API_KEY` 응답/로그 노출 금지.
2. `.env` 커밋 금지.
3. Destructive git 작업 사용자 동의 후에만.
4. 새 npm 패키지 설치 전 사용자에게 묻기.
5. 입력 검증 — `c.req.json()` 결과를 그대로 외부 API 로 흘리지 마요.
6. import 경로엔 `.js` 확장자. NodeNext ESM 컨벤션.

## 디렉토리

- `src/index.ts` — 진입점 + 라우트
- `src/lib/axhub.ts` — Hub API 헬퍼
- `dist/` — tsc 빌드 결과 (gitignore, axhub 가 자체 빌드)

## 배포

`axhub deploy create --app <slug>`. health_path `/api/health`.

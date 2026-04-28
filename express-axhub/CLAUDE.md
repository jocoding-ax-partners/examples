# Claude Code 가이드

이 프로젝트는 **axhub 바이브코딩 서버 템플릿 (Express + Node, 순수 JS)** 이에요.

## 사용자 가정

- 비전공자 / 비개발자. 한국어로 대화.
- 첫 서버 코드. TypeScript 없음 — 의도적.
- 결과를 curl 또는 브라우저로 확인.

## Stack

- Node 20+
- Express 5
- ES Modules (`"type": "module"`)
- 순수 JavaScript (TypeScript 없음)

## 응답 가이드

- 한국어로.
- 새 라우트 추가 시: `index.js` 를 직접 수정. 폴더 분리 금지 (vibe coder 가 한 파일에서 다 보는 게 좋음).
- 변경 보고: `file:line` + 한 줄 요약.

## 절대 규칙

1. `APPHUB_API_KEY` 가 응답 본문이나 로그에 절대 나오면 안 돼요.
2. `.env` 절대 커밋 금지.
3. Destructive git 작업 사용자 동의 후에만.
4. 새 npm 패키지 설치 전 한 번 물어봐요.
5. 입력 검증 없는 endpoint 만들지 마요. (`req.body` 를 그대로 axhub.data 에 흘리면 위험)

## 배포

`/axhub:deploy` 또는 `axhub deploy create --app <slug>`. health_path = `/api/health` (apphub.yaml).

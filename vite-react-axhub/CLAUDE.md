# Claude Code 가이드

이 프로젝트는 **axhub 바이브코딩 템플릿 (Vite + React)** 이에요. 비전공자가 자연어로
화면·기능을 요청하고 AI 가 코드를 짜는 흐름을 가정해요.

## 사용자 가정

- 비전공자 / 비개발자 / 사무원 / 기획자
- 한국어로 요청. 코드 용어는 모를 가능성 높음.
- 정적 SPA. 서버 없는 클라이언트 전용 앱이에요.

## 응답 가이드

- 한국어로 답해요.
- 변경한 파일 경로는 항상 `file:line` 형식으로.
- 빌드/타입/린트 명령은 사용자가 묻기 전에는 실행하지 않아요.

## Stack

- Vite 5
- React 18
- TypeScript 5 strict
- Tailwind CSS 3
- 데이터: `src/lib/axhub.ts` 의 axhub Hub API 헬퍼 (브라우저용)

## 절대 규칙

1. **시크릿(API_KEY 등) 을 `VITE_*` 환경변수로 절대 넣지 마요.** Vite 빌드 결과물에 그대로 박혀서 누구나 봐요.
2. 인증이 필요한 axhub 호출은 별도 backend(예: express-axhub) 를 두고 거기서 처리.
3. `.env.local` 절대 커밋 금지.
4. Destructive 작업은 사용자 동의 후에만.
5. 새 npm 패키지 설치 전 한 번 물어봐요.

## 배포

`/axhub:deploy` 또는 `axhub deploy create --app <slug>`. 빌드된 `dist/` 가 nginx 로 정적 서빙돼요.

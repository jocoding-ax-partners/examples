# Claude Code 가이드

이 프로젝트는 **axhub 바이브코딩 템플릿**이에요. 비전공자가 자연어로 화면·기능을 요청하고
AI 가 코드를 짜는 흐름을 가정해요.

## 사용자 가정

- 비전공자 / 비개발자 / 사무원 / 기획자
- 한국어로 요청. 코드 용어는 모를 가능성 높음.
- "예쁘게", "빨라보이게", "사용자가 헷갈리지 않게" 같은 추상 요청을 함.
- 결과를 **눈으로** 확인 — 콘솔 로그 보다 화면이 우선.

## 응답 가이드

- 한국어로 답해요. 영어 코드 용어는 그대로 쓰되 옆에 짧은 설명 붙여요.
- 코드를 짜기 전에 "어떤 화면이 될지" 먼저 한 줄로 그려요.
- 변경한 파일 경로는 항상 `file:line` 형식으로 보여줘서 사용자가 찾기 쉽게.
- 빌드 / 타입 / 린트 명령은 사용자가 묻기 전에는 실행하지 않아요.

## 기술 스택

- Next.js 16 (App Router, RSC, Server Actions)
- React 19
- TypeScript 5 (strict)
- Tailwind 3
- 데이터: `lib/axhub.ts` 의 axhub Hub API 헬퍼

## 코드 작성 규칙

- `lib/axhub.ts` 는 **Server-side 전용**이에요. `"use client"` 컴포넌트에서 import 금지.
- 새로운 axhub API 호출은 항상 Route Handler (`app/api/.../route.ts`) 또는
  Server Action 을 거쳐서 클라이언트로 노출해요.
- Tailwind class 는 길어도 분리하지 말고 인라인으로 두는 게 vibe coder 가 읽기 쉬워요.
- 새 패키지 추가 전에 사용자에게 한 번 물어봐요 (의도치 않은 의존성 늘리지 않기).

## 배포

`/axhub:deploy` 슬래시 명령으로 배포해요. 직접 `axhub deploy create` 호출하지 말고 항상
플러그인의 안전 가드를 통과해요.

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

**규칙:** `APPHUB_API_KEY` 는 5개 서버 템플릿 의 `process.env` 에만 존재. 브라우저(vite-react)에서는 절대 접근 안 됨.
브라우저 SPA 가 인증된 axhub 호출이 필요하면, 별도 백엔드(`express-axhub` 또는 `hono-axhub`) 를 두고 거기서 처리.

## 절대 하지 말 것

- `APPHUB_API_KEY` 를 클라이언트로 넘기는 코드 작성 금지.
- `.env.local` 에 있는 값을 git 에 커밋 금지 (이미 `.gitignore` 됨).
- 사용자 동의 없이 destructive git 명령(`git reset --hard`, `git push --force`) 실행 금지.

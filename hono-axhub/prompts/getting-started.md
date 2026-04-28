# 시작용 프롬프트 모음

## 1. 첫 endpoint

```
src/index.ts 에 GET /api/hello 추가해줘.
응답: { message: "안녕 axhub", time: ISO 시각 }
import 경로엔 꼭 .js 확장자 붙여.
```

## 2. POST + 검증

```
src/index.ts 에 POST /api/feedback 추가해줘.
요청 본문: { name: string, message: string }
검증: 둘 다 1자 이상
저장: axhub.data("/feedback") POST
응답: 성공 { ok: true, id }, 검증 실패 400, 외부 호출 실패 502
```

## 3. 미들웨어 (로깅)

```
모든 요청에 대해 콘솔에 method + path + duration ms 찍는 미들웨어 추가해줘.
시크릿이 path 에 들어 있으면 마스킹.
```

## 4. CORS

```
GET /api/* 에만 CORS 열어줘. allowed origins 는 환경변수 ALLOWED_ORIGINS (콤마 구분).
@hono/cors 패키지 써도 됨 — 설치 전 나한테 한 번 물어봐.
```

## 5. 배포 직전 체크리스트

```
배포 전 점검:
- npm run build 가 dist/index.js 만드는지
- import 경로 모두 .js 확장자 있는지
- console.log 에 시크릿 새는 곳 없나
- /api/health 가 axhub 미연결 상태에서도 200 인지
```

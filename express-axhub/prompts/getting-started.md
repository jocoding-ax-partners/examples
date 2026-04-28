# 시작용 프롬프트 모음

## 1. 첫 라우트 추가

```
index.js 에 GET /api/hello 추가해줘.
응답: { message: "안녕 axhub", time: 현재 시각 ISO }
```

## 2. 폼 받아서 저장

```
index.js 에 POST /api/feedback 추가해줘.
요청 본문: { name: string, message: string }
검증: 둘 다 비어있지 않을 것
저장: axhub.data("/feedback") 로 POST
응답: 성공 { ok: true, id }, 실패 400 또는 500
```

## 3. 외부 API 프록시 (시크릿 숨기기)

```
index.js 에 GET /api/weather?city=서울 추가해줘.
- 외부 날씨 API 키는 서버에만 둠 (process.env.WEATHER_API_KEY)
- 클라이언트는 키를 모르고 그냥 /api/weather?city=... 호출
- 결과 JSON 가공해서 { temp, condition } 만 응답
```

## 4. 헬스체크 보강

```
GET /api/health 응답에 axhub 환경변수 정상 여부 + 메모리 사용량 + uptime 추가해줘.
실제 시크릿 값은 절대 응답에 넣지 말고, 설정 여부만 boolean 으로.
```

## 5. 배포 직전 체크리스트

```
배포 전 점검:
- console.log 에 시크릿 새는 곳 없나?
- 모든 endpoint 에 입력 검증 있나?
- /api/health 가 axhub 미연결 상태에서도 200 리턴하나?
- 의존성 안 쓰는 거 package.json 에 남아있나?
```

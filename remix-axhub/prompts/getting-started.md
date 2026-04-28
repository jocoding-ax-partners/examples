# 시작용 프롬프트 모음

## 1. 새 페이지 만들기

```
app/routes/about.tsx 만들어줘. /about 에서 보이는 회사 소개 페이지.
- meta 함수에 title 과 description
- 본문은 system-ui 폰트, 가운데 정렬, 모바일 친화
```

## 2. axhub 데이터 페이지

```
app/routes/users.tsx 만들어줘.
- loader: axhub.fetch("/v1/users") 결과 반환
- 컴포넌트: useLoaderData 로 받아서 카드 그리드
- 로딩은 자동 (loader 가 끝나야 렌더), 에러는 ErrorBoundary export
```

## 3. 폼 + 저장 (loader + action 한 파일)

```
app/routes/feedback.tsx 만들어줘.
- loader: axhub.data("/feedback") GET → 기존 피드백 목록
- action: <Form method="post"> 받아서 axhub.data("/feedback") POST
- 컴포넌트: <Form> + 목록 + 성공 시 redirect
```

## 4. 동적 라우트

```
app/routes/users.$id.tsx 만들어줘.
/users/123 같은 URL 에서 axhub.fetch("/v1/users/123") 로 한 명 정보 표시.
없으면 404, 있으면 카드.
```

## 5. 배포 직전 체크리스트

```
배포 전 점검:
- axhub.server import 한 곳이 모두 .server.ts 인지
- 컴포넌트 본문에서 axhub 직접 호출하는 곳 없는지
- loader 에러 처리 (try-catch + ErrorBoundary)
- console.log 남은 것
```

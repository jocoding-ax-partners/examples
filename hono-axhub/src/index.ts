import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { axhub } from "./lib/axhub.js";

const app = new Hono();
const PORT = Number(process.env.PORT) || 3000;

// 루트 — axhub 연결 상태 보여주기
app.get("/", (c) =>
  c.html(`
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>axhub × Hono</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 4rem auto; padding: 0 1rem; color: #111; }
    .status { padding: 1rem; border: 1px solid #e5e7eb; border-radius: .5rem; }
    .ok { color: #059669; font-weight: 600; }
    .warn { color: #d97706; font-weight: 600; }
    code { background: #f3f4f6; padding: .1rem .3rem; border-radius: .25rem; }
    a { color: #2563eb; }
  </style>
</head>
<body>
  <h1>axhub × Hono</h1>
  <p>조코딩 AX 파트너스 가벼운 서버 템플릿이에요.</p>
  <div class="status">
    <p>상태: <span class="${axhub.isConfigured ? "ok" : "warn"}">${axhub.isConfigured ? "axhub 연결됨" : "환경변수 미설정"}</span></p>
    <p>앱 슬러그: <code>${axhub.slug || "(미설정)"}</code></p>
  </div>
  <h2>다음 단계</h2>
  <ol>
    <li><code>src/index.ts</code> 를 열어서 라우트 추가</li>
    <li>axhub 호출은 <code>src/lib/axhub.ts</code> 의 <code>axhub.fetch(...)</code></li>
    <li><a href="/api/health">/api/health</a> 또는 <a href="/api/me">/api/me</a> 시험</li>
    <li>Claude Code 에서 <code>/axhub:deploy</code></li>
  </ol>
</body>
</html>
  `)
);

// 헬스체크
app.get("/api/health", (c) => c.json({ ok: true, slug: axhub.slug }));

// axhub Hub API 샘플 호출
app.get("/api/me", async (c) => {
  if (!axhub.isConfigured) {
    return c.json({ error: "axhub 환경변수 미설정. .env 또는 배포 환경을 확인해 주세요." }, 503);
  }
  try {
    const upstream = await axhub.fetch("/v1/me");
    const data = await upstream.json().catch(() => null);
    return c.json(data ?? { error: "응답 본문 파싱 실패" }, upstream.status as 200);
  } catch (err) {
    return c.json({ error: "axhub 호출 실패", detail: String(err) }, 502);
  }
});

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`axhub-hono 서버 시작 — http://localhost:${info.port}`);
});

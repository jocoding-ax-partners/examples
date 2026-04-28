import express from "express";
import { axhub } from "./lib/axhub.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// 루트 — axhub 연결 상태 보여주기
app.get("/", (_req, res) => {
  res.type("html").send(`
<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>axhub × Express</title>
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
  <h1>axhub × Express</h1>
  <p>조코딩 AX 파트너스 바이브코딩 서버 템플릿이에요.</p>
  <div class="status">
    <p>상태: <span class="${axhub.isConfigured ? "ok" : "warn"}">${axhub.isConfigured ? "axhub 연결됨" : "환경변수 미설정"}</span></p>
    <p>앱 슬러그: <code>${axhub.slug || "(미설정)"}</code></p>
  </div>
  <h2>다음 단계</h2>
  <ol>
    <li><code>index.js</code> 를 열어서 라우트 추가</li>
    <li>axhub 호출은 <code>lib/axhub.js</code> 의 <code>axhub.fetch(...)</code></li>
    <li><a href="/api/health">/api/health</a> 또는 <a href="/api/me">/api/me</a> 시험</li>
    <li>Claude Code 에서 <code>/axhub:deploy</code></li>
  </ol>
</body>
</html>
  `);
});

// 헬스체크 — axhub backend 가 health_path 를 핑할 때
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, slug: axhub.slug });
});

// axhub Hub API 샘플 호출 — /v1/me 같은 endpoint 를 그대로 프록시
app.get("/api/me", async (_req, res) => {
  if (!axhub.isConfigured) {
    res.status(503).json({ error: "axhub 환경변수 미설정. .env 또는 배포 환경을 확인해 주세요." });
    return;
  }
  try {
    const upstream = await axhub.fetch("/v1/me");
    const data = await upstream.json().catch(() => null);
    res.status(upstream.status).json(data ?? { error: "응답 본문 파싱 실패" });
  } catch (err) {
    res.status(502).json({ error: "axhub 호출 실패", detail: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`axhub-express 서버 시작 — http://localhost:${PORT}`);
});

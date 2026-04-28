import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { axhub } from "~/lib/axhub.server";

export const meta: MetaFunction = () => [
  { title: "axhub × Remix" },
  { name: "description", content: "조코딩 AX 파트너스 axhub 바이브코딩 템플릿 (Remix SSR)" },
];

export async function loader() {
  return json({
    isConfigured: axhub.isConfigured,
    slug: axhub.slug,
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "4rem auto", padding: "0 1rem", color: "#111" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>axhub × Remix</h1>
      <p style={{ color: "#555" }}>조코딩 AX 파트너스 바이브코딩 템플릿 (Remix SSR)</p>
      <section style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "0.5rem" }}>
        <p>상태: <strong style={{ color: data.isConfigured ? "#059669" : "#d97706" }}>{data.isConfigured ? "axhub 연결됨" : "환경변수 미설정"}</strong></p>
        <p>앱 슬러그: <code style={{ background: "#f3f4f6", padding: "0.1rem 0.3rem", borderRadius: "0.25rem" }}>{data.slug || "(미설정)"}</code></p>
      </section>
      <ol style={{ marginTop: "2rem", lineHeight: 1.8 }}>
        <li><code>app/routes/_index.tsx</code> 를 열어서 마음대로 바꿔봐요.</li>
        <li>저장하면 즉시 반영돼요 (HMR).</li>
        <li>axhub 호출은 <code>app/lib/axhub.server.ts</code> 의 <code>axhub.fetch(...)</code> — loader/action 안에서.</li>
        <li>다 만들었으면 Claude Code 에서 <code>/axhub:deploy</code>.</li>
      </ol>
      <footer style={{ marginTop: "3rem", fontSize: "0.85rem", color: "#9ca3af" }}>
        Remix 2 · React 18 · TypeScript 5 · Node 20+
      </footer>
    </main>
  );
}

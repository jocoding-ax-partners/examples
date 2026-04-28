import { axhub } from "@/lib/axhub";

export default function Home() {
  const status = axhub.isConfigured ? "axhub 연결됨" : "axhub 환경변수 미설정";
  const slug = axhub.slug || "(앱 슬러그 미설정)";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 font-sans">
      <h1 className="text-4xl font-bold">axhub × Next.js</h1>
      <p className="text-lg text-gray-600">조코딩 AX 파트너스 바이브코딩 템플릿</p>

      <section className="rounded-lg border border-gray-200 p-6 w-full max-w-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">상태</span>
          <span className={axhub.isConfigured ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>
            {status}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">앱 슬러그</span>
          <code className="text-sm bg-gray-100 px-2 py-1 rounded">{slug}</code>
        </div>
      </section>

      <ol className="list-decimal list-inside text-sm text-gray-700 max-w-xl space-y-2">
        <li><code className="bg-gray-100 px-1 rounded">app/page.tsx</code> 파일을 열어서 마음대로 바꿔봐요.</li>
        <li>저장하면 즉시 반영돼요 (Hot reload).</li>
        <li>axhub 데이터를 쓰고 싶으면 <code className="bg-gray-100 px-1 rounded">lib/axhub.ts</code> 의 <code className="bg-gray-100 px-1 rounded">axhub.data(&quot;엔드포인트&quot;)</code> 를 호출해요.</li>
        <li>다 만들었으면 Claude Code 에서 <code className="bg-gray-100 px-1 rounded">/axhub:deploy</code> 입력 → 배포 끝.</li>
      </ol>

      <footer className="text-xs text-gray-400 mt-8">
        Next.js 16 · React 19 · Tailwind 3 · TypeScript 5
      </footer>
    </main>
  );
}

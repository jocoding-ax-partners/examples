// axhub Hub API 헬퍼 (Server-side 전용 — Astro frontmatter, API endpoint, getStaticPaths)
// .astro 의 frontmatter 도 빌드 / 요청 시 서버에서 실행되므로 안전.

const apiUrl = import.meta.env.APPHUB_API_URL ?? process.env.APPHUB_API_URL ?? "";
const apiKey = import.meta.env.APPHUB_API_KEY ?? process.env.APPHUB_API_KEY ?? "";
const appSlug = import.meta.env.APPHUB_APP_SLUG ?? process.env.APPHUB_APP_SLUG ?? "";
const dataBase = import.meta.env.APPHUB_DATA_BASE_URL ?? process.env.APPHUB_DATA_BASE_URL ?? "";

function buildUrl(base: string, path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const trimmedBase = base.replace(/\/+$/, "");
  const trimmedPath = path.replace(/^\/+/, "");
  return `${trimmedBase}/${trimmedPath}`;
}

async function request(url: string, init: RequestInit): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  return fetch(url, { ...init, headers });
}

export async function axhubFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (!apiUrl) throw new Error("APPHUB_API_URL 가 설정되지 않았어요.");
  return request(buildUrl(apiUrl, path), init);
}

export async function axhubData(resource: string, init: RequestInit = {}): Promise<Response> {
  if (!dataBase) throw new Error("APPHUB_DATA_BASE_URL 가 설정되지 않았어요.");
  return request(buildUrl(dataBase, resource), init);
}

export const axhub = {
  fetch: axhubFetch,
  data: axhubData,
  slug: appSlug,
  isConfigured: Boolean(apiUrl && apiKey && appSlug),
};

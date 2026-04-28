// axhub Hub API 헬퍼 (브라우저용 — Vite SPA)
// VITE_ 프리픽스 환경변수만 사용. 시크릿은 절대 노출되면 안 돼요.
// 인증이 필요한 호출은 별도 backend(예: express-axhub) 를 거쳐서 해요.

const apiUrl = import.meta.env.VITE_APPHUB_API_URL ?? "";
const appSlug = import.meta.env.VITE_APPHUB_APP_SLUG ?? "";
const dataBase = import.meta.env.VITE_APPHUB_DATA_BASE_URL ?? "";

function buildUrl(base: string, path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const trimmedBase = base.replace(/\/+$/, "");
  const trimmedPath = path.replace(/^\/+/, "");
  return `${trimmedBase}/${trimmedPath}`;
}

export async function axhubFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (!apiUrl) throw new Error("VITE_APPHUB_API_URL 가 설정되지 않았어요. .env.local 또는 axhub deploy 환경을 확인해 주세요.");
  return fetch(buildUrl(apiUrl, path), {
    credentials: "include",
    ...init,
    headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
}

export async function axhubData(resource: string, init: RequestInit = {}): Promise<Response> {
  if (!dataBase) throw new Error("VITE_APPHUB_DATA_BASE_URL 가 설정되지 않았어요.");
  return fetch(buildUrl(dataBase, resource), {
    credentials: "include",
    ...init,
  });
}

export const axhub = {
  fetch: axhubFetch,
  data: axhubData,
  slug: appSlug,
  isConfigured: Boolean(apiUrl && appSlug),
};

import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// axhub 배포용: Node standalone 어댑터로 SSR 서버를 빌드해요.
// `npm start` 가 PORT=3000 으로 entry.mjs 를 띄워요. axhub backend 가 health_path "/" 핑.
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
});

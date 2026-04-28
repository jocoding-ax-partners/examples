# ADR-0001: 2026 BP 버전 홀드백 + 명명된 unblock 드라이버

**상태:** Accepted (2026-04-28)
**의사결정자:** ralplan 합의 (Planner / Architect / Critic, 2 iter)

## 배경

조코딩 AX 파트너스 `examples/` 의 6개 vibe-coder 템플릿을 2026년 4월 베스트 프랙티스에 맞춰 audit + 갱신.
일부 의존성을 의도적으로 최신 메이저 버전으로 올리지 **않았어요**. 각 홀드백은 명시된 unblock 드라이버가 있을 때 다시 평가합니다.

## 5개 운영 원칙

1. **Vibe coder primacy** — TTHW(Time-To-Hello-World) < 5분 절대 사수
2. **2026 BP ≠ bleeding edge** — 최신 STABLE 우선, RC / pre-1.0 회피
3. **Backward-compat default** — major bump 은 명명된 driver 필요
4. **LLM 학습 데이터 밀도 우선** — vibe coder + AI 도구가 익숙한 패턴 매칭
5. **Convergence** — **carve-out: 외부 API 표면(`axhub.fetch/data/slug/isConfigured`) 에만 적용. 전송(server Bearer vs browser cookie)은 구조적 차이라 carve-out.**

## 의도적 홀드백

### H1: Tailwind CSS 3.x (TW 4 미적용)

**적용 대상:** `nextjs-axhub`, `vite-react-axhub`
**현재 핀:** `tailwindcss: ^3.4.x`
**미적용 이유:**
- Tailwind 4 는 PostCSS 플러그인을 `@tailwindcss/postcss` 로 교체 + `tailwind.config.ts` 폐기 + 테마를 CSS `@theme` 디렉티브로 이동 → vibe coder TTHW 친화적이지 않음 (P1 위반)
- 2026-01 기준 LLM 학습 코퍼스에서 TW 3 예제가 압도적 다수. AI 가 TW 4 클래스를 제안할 때 환각 빈발 (P4 위반)
- TW 4 는 안정적이지만 vibe coder 가 따라할 튜토리얼 + Stack Overflow 답변이 아직 v3 dominant

**Unblock driver:** TW 4 LLM 학습 데이터 밀도가 v3 와 비슷해질 때 (예상 H2 2026). 또는 axhub 공식 가이드가 TW 4 로 전환 시.

### H2: Remix 2 + React 18 + Vite 5 (`remix-axhub`)

**적용 대상:** `remix-axhub`
**현재 핀:** `@remix-run: 2.10.0`, `react: ^18.2.0`, `vite: ^5.1.0`
**미적용 이유:**
- Remix 2.10 은 React 18 / Vite 5 peer 범위에 묶여 있음 — React 19 / Vite 6+ 강제 시 SSR hydration 회귀 위험 (P3 위반: bump 에 명명된 driver 없음)
- Remix 2 자체는 maintenance 모드 → 공식 진로는 React Router 7 (RR7)
- RR7 마이그레이션은 폴더 구조 + import 경로 + 빌드 도구 모두 변경 → 별도 ADR 필요한 큰 변경

**Unblock driver:** **Option C (Remix → React Router 7 마이그레이션)** 작업 시. axhub backend 가 RR7 build output 을 잘 받는지 확인 후 진행. 또는 Remix 공식 EOL 발표 시 즉시.

### H3: Vite 8 (`vite-react-axhub`)

**적용 대상:** `vite-react-axhub`
**현재 핀:** `vite: ^7.3.2`, `@vitejs/plugin-react: ^5.2.0`
**미적용 이유:**
- Vite 8 + `@vitejs/plugin-react@6` 는 새 peer dep `@rolldown/plugin-babel` + `babel-plugin-react-compiler` 도입 → 의존성 표면 증가 (P1 위반)
- Rolldown 번들러 + React Compiler 는 GA 후 1년 미만 → 생태계 패턴 / LLM 학습 데이터 미성숙 (P2, P4 위반)
- Vite 7.3 도 동일하게 `Node ^20.19 || >=22.12` 요구 → 이미 modern Node 강제, 추가 가치 적음

**Unblock driver:** Rolldown + react-compiler 생태계 stabilization (예상 ~Q3 2026). Vite 8.x 가 패치 누적 후 RR7 와 같은 framework 들이 peer 범위에 v8 명시 시.

## 적용된 변경 (대조)

| 변경 | 위치 | Driver |
|------|------|--------|
| `eslint-config-next` 15.1.4 → ^16.2.4 | `nextjs-axhub` | Next 16 와 버전 매치 (실제 mismatch 였음) |
| `react/-dom` 18 → ^19.2.1 | `vite-react-axhub` | React 19 stable 16개월+ |
| `@vitejs/plugin-react` ^4 → ^5.2.0 | `vite-react-axhub` | React 19 지원 + Vite 7 peer (no Rolldown 강제) |
| `vite` ^5 → ^7.3.2 | `vite-react-axhub` | 2 major modernization, no Rolldown tax |
| `eslint-plugin-react-hooks` rc → ^7.1.1 | `vite-react-axhub` | RC → stable v7 (v5/v6/v7 progression 완료) |
| `engines.node: "^20.19 || >=22.12"` | `vite-react-axhub` | Vite 7 mandate |
| `.editorconfig` (top-level + per-template) | 6개 템플릿 | Zero-dep hygiene |
| 6× `CLAUDE.md` 에 axhub.ts 신뢰 모델 섹션 | 6개 템플릿 | P5 carve-out 가시화 |

## P5 Carve-out 명세

P5 (Convergence) 는 다음에만 적용됩니다:

✅ **외부 API 표면** (모든 6 템플릿 동일):
- `axhub.fetch(path, init?)` → `Promise<Response>`
- `axhub.data(resource, init?)` → `Promise<Response>`
- `axhub.slug` → `string`
- `axhub.isConfigured` → `boolean`

❌ **NOT 적용** — 다음은 구조적 차이, 게으른 분기 아님:
- 인증 transport: 5개 server 템플릿은 `Authorization: Bearer ${process.env.APPHUB_API_KEY}`, 1개 browser 템플릿(`vite-react-axhub`)은 `credentials: "include"` (시크릿 키 빌드 결과물에 박지 않기 위해)
- 환경변수 surface: server 는 `process.env.APPHUB_*`, browser 는 `import.meta.env.VITE_APPHUB_*` (key 제외)
- 파일 경로 컨벤션: `nextjs-axhub/lib/`, `*-axhub/src/lib/`, `remix-axhub/app/lib/` — 각 framework idiom 존중

## 재평가 일정

- **2026-Q3:** Vite 8 / Rolldown / react-compiler 생태계 점검 (H3)
- **2026-H2:** TW 4 LLM 밀도 점검 (H1)
- **Remix 공식 EOL 발표 시:** Option C 즉시 시작 (H2)

## 관련 commits

- `b179733` 직전: 6개 템플릿 초기 ship + verification
- 이후 commits: 본 ADR 의 결정에 따라 적용 (W1-W4)

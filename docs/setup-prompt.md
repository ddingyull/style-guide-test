# Nomos shadcn 레지스트리 구축

Nomos 디자인 시스템 전용 shadcn 레지스트리를 처음부터 끝까지 구축해줘.
이 레지스트리는 여러 회사 프로젝트에서 공통 컴포넌트를 재사용하되, 회사별로 테마(색상 등)는 다르게 적용할 수 있어야 해.

참고할 공식 템플릿: https://github.com/shadcn-ui/registry-template (Tailwind v4 버전)

## 기술 스택

- Next.js 15 (App Router, src 디렉토리 사용 안 함 — 공식 템플릿과 동일)
- TypeScript
- Tailwind CSS v4
- shadcn/ui CLI 최신 버전
- 패키지 매니저: pnpm

## 작업 순서

### 1단계: 프로젝트 초기 세팅

1. `nomos-ui`라는 이름의 Next.js 프로젝트 생성
   - TypeScript, Tailwind CSS v4, App Router
   - **`src/` 디렉토리는 사용하지 않음** (공식 레지스트리 템플릿 구조와 맞추기 위해)
2. `pnpm dlx shadcn@latest init` 실행 — base color는 `neutral`
3. 필요한 의존성 설치: `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`

### 2단계: 폴더 구조 생성

공식 템플릿 구조를 따르되, 레지스트리 네임스페이스 폴더는 `new-york` 대신 **`nomos`** 사용:

```
nomos-ui/
├── registry.json
├── registry/
│   └── nomos/                    ← 네임스페이스 (브랜드명으로)
│       ├── ui/
│       │   ├── button.tsx
│       │   ├── card.tsx
│       │   └── input.tsx
│       ├── blocks/
│       │   └── login-form/
│       │       └── login-form.tsx
│       ├── hooks/
│       │   └── use-toast.ts
│       ├── lib/
│       │   └── utils.ts
│       └── themes/
│           ├── theme-default.css
│           ├── theme-company-a.css
│           └── theme-company-b.css
├── app/                          ← Next.js App Router (루트, src 없음)
│   ├── page.tsx                  (레지스트리 카탈로그 페이지)
│   ├── layout.tsx
│   └── globals.css
├── components/                   ← 카탈로그 사이트용 컴포넌트
├── lib/                          ← 사이트 유틸
├── public/
│   └── r/                        ← 빌드 결과물 (자동 생성)
├── components.json
├── next.config.ts
├── postcss.config.mjs
├── package.json
└── tsconfig.json
```

`registry.json`의 모든 `files[].path`는 `registry/nomos/...` 경로를 가리키게 작성.

### 3단계: `registry.json` 작성

- `$schema`: `https://ui.shadcn.com/schema/registry.json`
- `name`: `nomos`
- `homepage`: `https://nomos-ui.vercel.app` (임시)
- `items` 배열에 다음 등록:
  - `button` (registry:ui) — Nomos 토큰 사용 (`--nomos-primary` 등)
  - `card` (registry:ui)
  - `input` (registry:ui)
  - `login-form` (registry:block) — button, card, input을 `registryDependencies`로 참조
  - `use-toast` (registry:hook)
  - `utils` (registry:lib)
  - `theme-default` (registry:theme)
  - `theme-company-a` (registry:theme) — 파란 계열
  - `theme-company-b` (registry:theme) — 빨간 계열

각 항목 필드:

- `name`, `type`, `title`, `description`
- `dependencies` (npm 패키지)
- `registryDependencies` (다른 레지스트리 항목)
- `files`: `{ path: "registry/nomos/ui/button.tsx", type: "registry:ui" }` 형식
- 필요시 `cssVars.theme` / `cssVars.light` / `cssVars.dark` (Tailwind v4 방식)

### 4단계: 컴포넌트 작성

shadcn 기본 구현을 베이스로 하되, **색상은 반드시 Nomos CSS 변수만 참조**:

- `bg-nomos-primary`, `text-nomos-primary-foreground`, `border-nomos-border` 등
- `bg-blue-500` 같은 하드코딩 절대 금지

`button.tsx`는 cva로 variant 시스템 (default, destructive, outline, ghost, link / size: sm, default, lg, icon).

### 5단계: 테마 파일 작성 (Tailwind v4 방식)

Tailwind v4는 `@theme` 디렉티브를 사용하므로 각 테마 CSS 파일은 다음 형태:

```css
@layer base {
  :root {
    --nomos-primary: oklch(0.55 0.22 250);
    --nomos-primary-foreground: oklch(0.98 0 0);
    --nomos-secondary: oklch(0.95 0.02 250);
    --nomos-secondary-foreground: oklch(0.2 0 0);
    --nomos-background: oklch(1 0 0);
    --nomos-foreground: oklch(0.15 0 0);
    --nomos-border: oklch(0.9 0 0);
    --nomos-ring: oklch(0.55 0.22 250);
    --nomos-destructive: oklch(0.6 0.22 25);
    --nomos-muted: oklch(0.96 0 0);
    --nomos-muted-foreground: oklch(0.5 0 0);
  }
  .dark {
    /* 다크 모드 값들 */
  }
}

@theme inline {
  --color-nomos-primary: var(--nomos-primary);
  --color-nomos-primary-foreground: var(--nomos-primary-foreground);
  /* ...나머지 변수도 동일 패턴 */
}
```

- theme-default: 중립 회색 톤
- theme-company-a: 파란색 (oklch 240~260 hue)
- theme-company-b: 빨간색 (oklch 20~30 hue)

### 6단계: 빌드 스크립트 등록

`package.json`에 추가:

```json
{
  "scripts": {
    "registry:build": "shadcn registry build"
  }
}
```

빌드해서 `public/r/*.json`이 정상 생성되는지 확인.

### 7단계: 카탈로그 페이지

`app/page.tsx`에 레지스트리 항목 목록과 설치 명령어를 보여주는 카탈로그 페이지 작성:

- 컴포넌트 이름, 설명
- `pnpm dlx shadcn@latest add https://nomos-ui.vercel.app/r/{name}.json` 복사 버튼
- 가능하면 라이브 프리뷰

### 8단계: README 작성

프로젝트 루트에 README.md:

- 프로젝트 소개 (공식 registry-template 기반임을 명시)
- 로컬 개발 방법
- 새 컴포넌트 추가 절차
- 다른 프로젝트에서 사용하는 방법 두 가지:
  1. URL로 직접 설치
  2. `components.json`의 `registries` 필드에 `"@nomos": "https://nomos-ui.vercel.app/r/{name}.json"` 등록 후 `pnpm dlx shadcn add @nomos/button`
- 회사별 테마 적용 방법 (`pnpm dlx shadcn add @nomos/theme-company-a` 또는 CSS import)

### 9단계: 검증

1. `pnpm run registry:build` 에러 없이 성공
2. `public/r/button.json`, `public/r/login-form.json` 등 모든 항목 JSON이 생성됨
3. JSON 안에 컴포넌트 코드, dependencies, cssVars가 정상 포함
4. `pnpm dev`로 카탈로그 페이지 정상 렌더링
5. `pnpm tsc --noEmit` TypeScript 에러 없음

## 주의사항

- 헷갈리지 말 것: `registry/nomos/`는 **레지스트리 네임스페이스 폴더 이름**이고, shadcn의 _style_(default/new-york)과는 무관. `components.json`의 `style` 필드는 그대로 `new-york` 또는 `default` 사용해도 됨.
- 컴포넌트는 절대 색상을 하드코딩하지 말고 모두 CSS 변수 참조
- `registryDependencies`(다른 레지스트리 항목)와 `dependencies`(npm 패키지) 구분 정확히
- Tailwind v4 방식 (`@theme`, oklch) 사용
- 각 단계가 끝나면 간단히 결과 보고하고 다음 단계 진행
- 최종 결과물은 그대로 Vercel에 배포 가능한 상태여야 함

먼저 1단계부터 시작해줘.

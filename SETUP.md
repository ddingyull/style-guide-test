# 빠른 설정 가이드

## 완료된 작업

✅ 프로젝트 정리 - 불필요한 컴포넌트 모두 제거
✅ 3개 컴포넌트만 유지: Button, Input, Card (모두 검정색 테두리)
✅ registry.json을 최소 구성으로 업데이트
✅ 테마 단순화
✅ Registry 파일 빌드 완료 (`public/r/`에 생성됨)
✅ 종합 README.md 작성 완료

## 다음 단계

### 1. registry.json에 GitHub 사용자명 업데이트

`registry.json` 파일의 4번째 줄을 수정하세요:

```json
{
  "homepage": "https://github.com/YOUR_USERNAME/nomos-ui"
}
```

`YOUR_USERNAME`을 실제 GitHub 사용자명으로 변경하세요.

### 2. GitHub에 커밋하고 푸시

```bash
git add .
git commit -m "feat: minimal registry with black border components"
git push origin main
```

### 3. Patent-Secretary 프로젝트에서 사용하기

GitHub에 푸시한 후, Patent-Secretary 프로젝트에서 사용할 수 있습니다:

#### 방법 A: 직접 URL 사용 (빠른 테스트)

```bash
cd Patent-secretary
npx shadcn@latest add https://raw.githubusercontent.com/YOUR_USERNAME/nomos-ui/main/public/r/button.json
```

#### 방법 B: Registry 별칭 사용 (권장)

1. `Patent-secretary/components.json` 파일을 수정하여 추가:

```json
{
  "registries": {
    "@nomos": "https://raw.githubusercontent.com/YOUR_USERNAME/nomos-ui/main/public/r/{name}.json"
  }
}
```

2. 컴포넌트 설치:

```bash
cd Patent-secretary
npx shadcn@latest add @nomos/button
npx shadcn@latest add @nomos/input
npx shadcn@latest add @nomos/card
```

3. 코드에서 사용:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>내 폼</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="텍스트 입력" />
        <Button>제출</Button>
      </CardContent>
    </Card>
  )
}
```

## 컴포넌트 특징

세 개의 컴포넌트 모두 다음 특징을 가지고 있습니다:
- 검정색 테두리 (`border-[#000]`)
- 직각 모서리 (`rounded-none`)
- 깔끔하고 미니멀한 디자인

## 파일 구조

```
nomos-ui/
├── registry/
│   └── nomos/
│       ├── ui/
│       │   ├── button.tsx     ← 버튼 컴포넌트
│       │   ├── input.tsx      ← 입력 필드 컴포넌트
│       │   └── card.tsx       ← 카드 컴포넌트
│       ├── lib/
│       │   └── utils.ts       ← 유틸리티 함수
│       └── themes/
│           └── theme-patent.css ← 검정 테두리 테마
├── public/
│   └── r/                     ← 빌드된 registry 파일들 (자동 생성)
│       ├── button.json
│       ├── input.json
│       ├── card.json
│       └── utils.json
├── registry.json              ← Registry 설정
└── README.md                  ← 전체 문서
```

## 로컬에서 테스트하기

```bash
# 개발 서버 실행
pnpm dev

# http://localhost:3000 방문
```

## 문제 해결

### 컴포넌트가 설치되지 않을 때

다음을 확인하세요:
1. `pnpm run registry:build`를 실행했는지
2. `public/r/` 폴더에 JSON 파일들이 있는지
3. GitHub에 푸시했는지
4. URL에 올바른 GitHub 사용자명을 사용했는지

### 다시 빌드해야 할 때

```bash
pnpm run registry:build
```

이 명령어는 `public/r/`의 모든 JSON 파일을 재생성합니다.

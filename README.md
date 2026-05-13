# Nomos UI Registry

A minimal shadcn/ui component registry with black borders and sharp corners.

## Components

- **Button** - Button component with black border
- **Input** - Input field with black border
- **Card** - Card container with black border

## Installation

### Step 1: Setup your project

If you haven't already, initialize shadcn/ui in your project:

```bash
npx shadcn@latest init
```

### Step 2: Add the registry

Add this registry to your `components.json`:

```json
{
  "registries": {
    "@nomos": "https://raw.githubusercontent.com/YOUR_USERNAME/nomos-ui/main/r/{name}.json"
  }
}
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Install components

```bash
# Install individual components
npx shadcn@latest add @nomos/button
npx shadcn@latest add @nomos/input
npx shadcn@latest add @nomos/card

# Or using pnpm
pnpm dlx shadcn@latest add @nomos/button
pnpm dlx shadcn@latest add @nomos/input
pnpm dlx shadcn@latest add @nomos/card
```

## Usage in Patent-Secretary

### Method 1: Direct URL (Recommended for testing)

```bash
cd Patent-secretary
npx shadcn@latest add https://raw.githubusercontent.com/YOUR_USERNAME/nomos-ui/main/r/button.json
```

### Method 2: Registry Alias (Recommended for production)

1. Edit `Patent-secretary/components.json`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@nomos": "https://raw.githubusercontent.com/YOUR_USERNAME/nomos-ui/main/r/{name}.json"
  }
}
```

2. Install components:

```bash
cd Patent-secretary
npx shadcn@latest add @nomos/button
npx shadcn@latest add @nomos/input
npx shadcn@latest add @nomos/card
```

3. Use in your code:

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button>Sign in</Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

## Publishing to GitHub

### 1. Build the registry

```bash
pnpm run registry:build
```

This creates JSON files in the `r/` directory.

### 2. Update registry.json

Edit [registry.json](registry.json:4) and replace `YOUR_USERNAME`:

```json
{
  "homepage": "https://github.com/YOUR_USERNAME/nomos-ui"
}
```

### 3. Commit and push

```bash
git add .
git commit -m "feat: minimal registry with black border components"
git push origin main
```

### 4. Enable GitHub Pages (Optional)

If you want a live preview:

1. Go to your repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose "main" branch and "/root" folder
4. Save

Your components will be available at:
- Registry: `https://raw.githubusercontent.com/YOUR_USERNAME/nomos-ui/main/r/{name}.json`
- Preview: `https://YOUR_USERNAME.github.io/nomos-ui/`

## Component Features

All components have:
- ✅ Black borders (`border-[#000]`)
- ✅ Sharp corners (`rounded-none` / `--radius: 0`)
- ✅ Clean, minimal design
- ✅ TypeScript support
- ✅ Tailwind CSS v4 compatible

## Local Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build registry
pnpm run registry:build
```

Visit `http://localhost:3000` to see the components.

## Troubleshooting

### Components not found

Make sure you:
1. Built the registry: `pnpm run registry:build`
2. Pushed the `r/` directory to GitHub
3. Used the correct GitHub username in the URL

### Import errors

The components will be installed to your project's `components/ui/` directory. Import them like this:

```tsx
import { Button } from "@/components/ui/button"
```

## License

MIT

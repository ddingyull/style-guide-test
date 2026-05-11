# Nomos Design System

A custom shadcn/ui registry for the Nomos design system. This registry enables multiple companies to share common components while maintaining distinct brand identities through theming.

Built with Next.js 15, TypeScript, Tailwind CSS v4, and based on the [official shadcn/ui registry template](https://github.com/shadcn-ui/registry-template).

## Features

- **Multi-company Theming**: Shared components with company-specific color schemes
- **shadcn/ui Compatible**: Fully compatible with shadcn CLI
- **Tailwind v4**: Modern CSS with oklch color space
- **Type Safe**: Full TypeScript support
- **Easy Integration**: Install components via URL or registry alias

## Components

### UI Components
- `button` - Button component with multiple variants
- `card` - Card with header, content, and footer
- `input` - Form input field

### Blocks
- `login-form` - Complete login form using card, input, and button

### Hooks
- `use-toast` - Toast notification hook

### Utilities
- `utils` - className merging utility (cn function)

### Themes
- `theme-default` - Neutral gray theme
- `theme-company-a` - Blue-based theme
- `theme-company-b` - Red-based theme

## Installation Methods

### Method 1: Direct URL

Install components directly from the registry URL:

```bash
pnpm dlx shadcn@latest add https://nomos-ui.vercel.app/r/button.json
```

### Method 2: Registry Alias (Recommended)

Add the registry to your `components.json`:

```json
{
  "registries": {
    "@nomos": "https://nomos-ui.vercel.app/r/{name}.json"
  }
}
```

Then install components using the alias:

```bash
pnpm dlx shadcn@latest add @nomos/button
pnpm dlx shadcn@latest add @nomos/card
pnpm dlx shadcn@latest add @nomos/login-form
```

## Applying Company Themes

### Option 1: Import Theme CSS

Add a theme import to your `app/globals.css`:

```css
@import "@/registry/nomos/themes/theme-company-a.css";
```

### Option 2: Install as Component

```bash
pnpm dlx shadcn@latest add @nomos/theme-company-a
```

Then import in your root layout or globals.css.

### Option 3: Custom Theme

Create your own theme by copying a theme file and modifying the color values:

```css
@layer base {
  :root {
    --nomos-primary: oklch(0.6 0.25 180); /* Your brand color */
    /* ... other tokens */
  }
}

@theme inline {
  --color-nomos-primary: var(--nomos-primary);
  /* ... map all tokens */
}
```

## Local Development

### Prerequisites

- Node.js 20+
- pnpm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd nomos-ui

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit `http://localhost:3000` to see the component catalog.

### Building the Registry

After adding or modifying components:

```bash
pnpm run registry:build
```

This generates JSON files in `public/r/` that can be consumed by the shadcn CLI.

## Adding New Components

### 1. Create Component File

Add your component to the appropriate directory:

```
registry/nomos/ui/my-component.tsx
registry/nomos/blocks/my-block/my-block.tsx
registry/nomos/hooks/use-my-hook.ts
```

**Important**: Use only Nomos CSS variables for styling:
- `bg-nomos-primary`, `text-nomos-foreground`, `border-nomos-border`, etc.
- Never hardcode colors like `bg-blue-500`

### 2. Register in registry.json

Add an entry to `registry.json`:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "Description of my component",
  "dependencies": ["any-npm-packages"],
  "registryDependencies": ["button", "card"],
  "files": [
    {
      "path": "registry/nomos/ui/my-component.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "theme": {
      "--color-nomos-primary": "var(--nomos-primary)"
    }
  }
}
```

### 3. Build Registry

```bash
pnpm run registry:build
```

### 4. Test Installation

```bash
pnpm dlx shadcn@latest add https://nomos-ui.vercel.app/r/my-component.json
```

## Design Token Reference

All components use the following CSS variables:

### Color Tokens

```css
--nomos-primary              /* Primary brand color */
--nomos-primary-foreground   /* Text on primary */
--nomos-secondary            /* Secondary color */
--nomos-secondary-foreground /* Text on secondary */
--nomos-background           /* Page background */
--nomos-foreground           /* Primary text */
--nomos-border               /* Border color */
--nomos-ring                 /* Focus ring */
--nomos-destructive          /* Destructive actions */
--nomos-destructive-foreground /* Text on destructive */
--nomos-muted                /* Muted backgrounds */
--nomos-muted-foreground     /* Muted text */
```

Use them in Tailwind classes:

```tsx
<div className="bg-nomos-primary text-nomos-primary-foreground">
  <button className="border-nomos-border hover:bg-nomos-secondary">
    Click me
  </button>
</div>
```

## Project Structure

```
nomos-ui/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Component catalog
│   ├── layout.tsx
│   └── globals.css
├── components/              # Catalog site components
│   └── component-card.tsx
├── lib/                     # Site utilities
│   └── utils.ts
├── registry/
│   └── nomos/              # Registry namespace
│       ├── ui/             # UI components
│       ├── blocks/         # Composite blocks
│       ├── hooks/          # React hooks
│       ├── lib/            # Utilities
│       └── themes/         # Theme CSS files
├── public/
│   └── r/                  # Built registry JSON (auto-generated)
├── registry.json           # Registry configuration
├── components.json         # shadcn configuration
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy

The registry will be available at `https://your-project.vercel.app/r/{component}.json`

### Other Platforms

Build the Next.js app:

```bash
pnpm run build
```

Ensure `public/r/` is included in your deployment.

## Usage in Client Projects

### Initial Setup

In your client project:

```bash
# Initialize shadcn (if not already done)
pnpm dlx shadcn@latest init

# Add Nomos registry to components.json
```

Edit `components.json`:

```json
{
  "registries": {
    "@nomos": "https://nomos-ui.vercel.app/r/{name}.json"
  }
}
```

### Install Components

```bash
# Install individual components
pnpm dlx shadcn@latest add @nomos/button
pnpm dlx shadcn@latest add @nomos/card

# Install a theme
pnpm dlx shadcn@latest add @nomos/theme-company-a
```

### Apply Theme

Import the theme in your `app/globals.css`:

```css
@import "@/components/themes/theme-company-a.css";
```

Or if you installed via shadcn, it will be in your components directory.

## Contributing

1. Create a new component following the guidelines above
2. Add it to `registry.json`
3. Build and test: `pnpm run registry:build`
4. Submit a pull request

## Troubleshooting

### TypeScript Errors

Run type check:

```bash
pnpm tsc --noEmit
```

### Build Errors

Ensure all file paths in `registry.json` are correct:
- Paths should be relative to project root
- Use forward slashes: `registry/nomos/ui/button.tsx`

### Component Not Found

After adding a component:
1. Verify entry in `registry.json`
2. Run `pnpm run registry:build`
3. Check `public/r/{component}.json` exists

## License

MIT

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Official Registry Template](https://github.com/shadcn-ui/registry-template)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

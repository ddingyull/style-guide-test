import registry from "@/public/r/registry.json"
import { ComponentCard } from "@/components/component-card"
import { ComponentShowcase } from "@/components/component-showcase"

export default function Home() {
  const uiComponents = registry.items.filter(item => item.type === "registry:ui")
  const blocks = registry.items.filter(item => item.type === "registry:block")
  const themes = registry.items.filter(item => item.type === "registry:theme")
  const hooks = registry.items.filter(item => item.type === "registry:hook")
  const libs = registry.items.filter(item => item.type === "registry:lib")

  const baseUrl = registry.homepage || "https://nomos-ui.vercel.app"

  return (
    <div className="min-h-screen bg-nomos-background text-nomos-foreground">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 text-nomos-primary">
            Nomos Design System
          </h1>
          <p className="text-xl text-nomos-muted-foreground max-w-2xl mx-auto">
            A shadcn/ui compatible component registry with multi-company theming support.
            Reuse components across projects while maintaining brand identity.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-nomos-foreground">
            Component Preview
          </h2>
          <p className="text-nomos-muted-foreground mb-6">
            See how the components look with border-radius 0 and #000 borders
          </p>
          <ComponentShowcase />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-nomos-foreground">
            UI Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uiComponents.map((item) => (
              <ComponentCard
                key={item.name}
                name={item.name}
                title={item.title || item.name}
                description={item.description || ""}
                baseUrl={baseUrl}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-nomos-foreground">
            Blocks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blocks.map((item) => (
              <ComponentCard
                key={item.name}
                name={item.name}
                title={item.title || item.name}
                description={item.description || ""}
                baseUrl={baseUrl}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-nomos-foreground">
            Themes
          </h2>
          <p className="text-nomos-muted-foreground mb-4">
            Apply company-specific color schemes while maintaining component consistency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((item) => (
              <ComponentCard
                key={item.name}
                name={item.name}
                title={item.title || item.name}
                description={item.description || ""}
                baseUrl={baseUrl}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-nomos-foreground">
            Hooks & Utilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...hooks, ...libs].map((item) => (
              <ComponentCard
                key={item.name}
                name={item.name}
                title={item.title || item.name}
                description={item.description || ""}
                baseUrl={baseUrl}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 p-8 bg-nomos-secondary rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-nomos-secondary-foreground">
            Getting Started
          </h2>
          <div className="space-y-4 text-nomos-secondary-foreground">
            <div>
              <h3 className="font-semibold mb-2">Method 1: Direct URL</h3>
              <code className="block bg-nomos-background p-3 rounded text-sm">
                pnpm dlx shadcn@latest add {baseUrl}/r/button.json
              </code>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Method 2: Add to components.json</h3>
              <pre className="bg-nomos-background p-3 rounded text-sm overflow-x-auto">
{`{
  "registries": {
    "@nomos": "${baseUrl}/r/{name}.json"
  }
}`}
              </pre>
              <code className="block bg-nomos-background p-3 rounded text-sm mt-2">
                pnpm dlx shadcn@latest add @nomos/button
              </code>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

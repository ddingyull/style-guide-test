"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface ComponentCardProps {
  name: string
  title: string
  description: string
  baseUrl: string
}

export function ComponentCard({ name, title, description, baseUrl }: ComponentCardProps) {
  const [copied, setCopied] = useState(false)
  const installCommand = `pnpm dlx shadcn@latest add ${baseUrl}/r/${name}.json`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-nomos-border rounded-lg p-6 bg-nomos-background hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2 text-nomos-foreground">
        {title}
      </h3>
      <p className="text-sm text-nomos-muted-foreground mb-4 min-h-[40px]">
        {description}
      </p>
      <div className="relative">
        <code className="block bg-nomos-muted p-3 rounded text-xs overflow-x-auto pr-10">
          {installCommand}
        </code>
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 p-1.5 hover:bg-nomos-secondary rounded transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-nomos-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  )
}

import { Check, ExternalLink } from 'lucide-react'
import type { Tool } from '@/lib/posts'

export function AffiliateBox({ tool }: { tool: Tool }) {
  return (
    <aside aria-label={`おすすめ：${tool.name}`} className="not-prose my-10 overflow-hidden rounded-xl border-2 border-foreground bg-card">
      <div className="flex items-center justify-between gap-2 bg-foreground px-5 py-2 text-background">
        <span className="text-sm font-bold">{tool.catch}</span>
        <span className="rounded bg-background/15 px-1.5 py-0.5 text-xs">PR</span>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <p className="text-xl font-black">{tool.name}</p>
        <ul className="flex flex-col gap-2">
          {tool.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm leading-relaxed">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs text-muted-foreground">{tool.price}</p>
        <a
          href={tool.url}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 font-bold text-primary-foreground shadow-[0_4px_0_0_var(--color-foreground)] transition-transform hover:translate-y-0.5 hover:shadow-[0_2px_0_0_var(--color-foreground)]"
        >
          公式サイトをチェックする
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </aside>
  )
}

import type { Block } from '@/lib/posts'

export function TableOfContents({ blocks }: { blocks: Block[] }) {
  const headings = blocks.filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2')
  if (headings.length === 0) return null

  return (
    <nav aria-labelledby="toc-heading" className="rounded-xl border bg-card p-5">
      <p id="toc-heading" className="mb-3 font-black">
        目次
      </p>
      <ol className="flex flex-col gap-2 text-sm">
        {headings.map((h, i) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="flex gap-2 leading-relaxed hover:text-primary">
              <span className="font-mono text-primary">{i + 1}.</span>
              <span>{h.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

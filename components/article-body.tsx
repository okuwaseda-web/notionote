import { Lightbulb } from 'lucide-react'
import { AdSlot } from '@/components/ad-slot'
import { AffiliateBox } from '@/components/affiliate-box'
import { tools, type Block } from '@/lib/posts'

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-5 text-base leading-loose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={block.id}
                className="mt-10 scroll-mt-24 border-b-2 border-foreground pb-3 text-xl font-black leading-snug text-pretty md:text-2xl"
              >
                {block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={i} className="mt-4 border-l-4 border-primary pl-3 text-lg font-bold leading-snug">
                {block.text}
              </h3>
            )
          case 'p':
            return (
              <p key={i} className="text-pretty">
                {block.text}
              </p>
            )
          case 'list': {
            const ListTag = block.ordered ? 'ol' : 'ul'
            return (
              <ListTag
                key={i}
                className={`flex flex-col gap-2 rounded-xl bg-muted p-5 pl-10 ${block.ordered ? 'list-decimal' : 'list-disc'} marker:text-primary`}
              >
                {block.items.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ListTag>
            )
          }
          case 'point':
            return (
              <div key={i} className="rounded-xl border-2 border-primary bg-secondary p-5">
                <p className="mb-2 flex items-center gap-2 font-bold text-secondary-foreground">
                  <Lightbulb className="size-4" aria-hidden="true" />
                  {block.title}
                </p>
                <p className="text-sm leading-relaxed">{block.text}</p>
              </div>
            )
          case 'prompt':
            return (
              <figure key={i} className="overflow-hidden rounded-xl border bg-card">
                <figcaption className="flex items-center justify-between border-b bg-muted px-4 py-2 font-mono text-xs text-muted-foreground">
                  <span>{'PROMPT / '}{block.label}</span>
                  <span>コピペOK</span>
                </figcaption>
                <pre className="overflow-x-auto whitespace-pre-wrap p-4 font-mono text-sm leading-relaxed">{block.text}</pre>
              </figure>
            )
          case 'affiliate':
            return <AffiliateBox key={i} tool={tools[block.toolId]} />
          case 'ad':
            return <AdSlot key={i} className="my-6" />
          default:
            return null
        }
      })}
    </div>
  )
}

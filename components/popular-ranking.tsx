import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { getPopularPosts } from '@/lib/posts'

export function PopularRanking({ limit = 5, excludeSlug }: { limit?: number; excludeSlug?: string }) {
  const ranked = getPopularPosts(limit + 1)
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, limit)

  return (
    <section aria-labelledby="ranking-heading" className="rounded-xl border bg-card p-5">
      <h2 id="ranking-heading" className="mb-4 flex items-center gap-2 text-base font-black">
        <TrendingUp className="size-4 text-primary" aria-hidden="true" />
        人気記事ランキング
      </h2>
      <ol className="flex flex-col gap-4">
        {ranked.map((post, i) => (
          <li key={post.slug}>
            <Link href={`/articles/${post.slug}`} className="group flex items-start gap-3">
              <span
                className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded font-mono text-xs font-bold ${
                  i < 3 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {i + 1}
              </span>
              <span className="relative aspect-video w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image src={post.image || '/placeholder.svg'} alt="" fill sizes="80px" className="object-cover" />
              </span>
              <span className="line-clamp-3 text-sm font-medium leading-snug group-hover:text-primary">
                {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  )
}

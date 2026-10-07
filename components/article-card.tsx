import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { formatDate, getCategory, type Post } from '@/lib/posts'

export function ArticleCard({ post }: { post: Post }) {
  const category = getCategory(post.category)
  return (
    <article className="group flex flex-col gap-3">
      <Link href={`/articles/${post.slug}`} className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
        <Image
          src={post.image || '/placeholder.svg'}
          alt=""
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-card px-2.5 py-1 text-xs font-bold text-primary">
            {category.name}
          </span>
        )}
      </Link>
      <div className="flex flex-col gap-2">
        <h3 className="text-pretty font-bold leading-snug">
          <Link href={`/articles/${post.slug}`} className="transition-colors hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
          <span className="flex items-center gap-1">
            <Clock className="size-3" aria-hidden="true" />
            {post.readingMinutes}
            {'min'}
          </span>
        </div>
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="rounded border bg-card px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {'#'}
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

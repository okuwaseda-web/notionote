import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import { categories } from '@/lib/posts'
import { cn } from '@/lib/utils'

export async function CategoryNav({ active }: { active?: string }) {
  const posts = await getAllPosts()
  return (
    <nav aria-label="カテゴリで絞り込む" className="no-scrollbar -mx-4 overflow-x-auto px-4">
      <ul className="flex w-max gap-2">
        {categories.map((c) => {
          const count = posts.filter((p) => p.category === c.slug).length
          const isActive = active === c.slug
          return (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  isActive ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:border-primary hover:text-primary',
                )}
              >
                {c.name}
                <span className={cn('font-mono text-xs', isActive ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                  {count}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SITE } from '@/lib/posts'

export type Crumb = { name: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.href}`,
    })),
  }

  return (
    <nav aria-label="パンくずリスト">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="line-clamp-1 max-w-[16rem]">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-primary hover:underline">
                    {item.name}
                  </Link>
                  <ChevronRight className="size-3" aria-hidden="true" />
                </>
              )}
            </li>
          )
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  )
}

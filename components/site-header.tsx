import Link from 'next/link'
import { Menu } from 'lucide-react'
import { categories, SITE } from '@/lib/posts'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${SITE.name} トップページ`}>
          <span className="flex size-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground">
            AI
          </span>
          <span className="text-lg font-black tracking-tight">
            仕事術<span className="marker">ノート</span>
          </span>
        </Link>

        <nav aria-label="カテゴリ" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="text-muted-foreground transition-colors hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md hover:bg-muted [&::-webkit-details-marker]:hidden">
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">メニューを開く</span>
          </summary>
          <nav aria-label="カテゴリ（モバイル）" className="absolute right-0 top-12 w-56 rounded-lg border bg-card p-2 shadow-lg">
            <ul className="flex flex-col">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}`} className="block rounded-md px-3 py-2 text-sm hover:bg-muted">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  )
}

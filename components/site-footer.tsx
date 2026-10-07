import Link from 'next/link'
import { categories, SITE } from '@/lib/posts'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t bg-foreground text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <p className="text-lg font-black">{SITE.name}</p>
          <p className="text-sm leading-relaxed text-background/70">{SITE.description}</p>
        </div>
        <nav aria-label="カテゴリ一覧" className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-widest text-background/60">Category</p>
          <ul className="flex flex-col gap-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="サイト情報" className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-widest text-background/60">About</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/about" className="hover:underline">運営者情報・お問い合わせ</Link></li>
            <li><Link href="/privacy" className="hover:underline">プライバシーポリシー・免責事項</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-background/15">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-background/60">
          {'© 2026 '}
          {SITE.name}
        </p>
      </div>
    </footer>
  )
}

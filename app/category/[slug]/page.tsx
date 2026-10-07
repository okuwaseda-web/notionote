import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/article-card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CategoryNav } from '@/components/category-nav'
import { Sidebar } from '@/components/sidebar'
import { categories, getCategory, getPostsByCategory } from '@/lib/posts'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  return {
    title: `${category.name}の記事一覧`,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()
  const list = getPostsByCategory(slug)

  return (
    <main className="mx-auto max-w-6xl px-4 pt-6">
      <Breadcrumbs
        items={[
          { name: 'ホーム', href: '/' },
          { name: category.name, href: `/category/${category.slug}` },
        ]}
      />
      <header className="mt-8 flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Category</p>
        <h1 className="text-3xl font-black md:text-4xl">
          <span className="marker">{category.name}</span>
        </h1>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">{category.description}</p>
      </header>
      <div className="mt-8">
        <CategoryNav active={category.slug} />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <section aria-label={`${category.name}の記事`}>
          {list.length > 0 ? (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {list.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">記事は準備中です。</p>
          )}
        </section>
        <Sidebar />
      </div>
    </main>
  )
}

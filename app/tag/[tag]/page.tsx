import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CategoryNav } from '@/components/category-nav'
import { Sidebar } from '@/components/sidebar'
import { getAllPosts, getAllTags, getPostsByTag } from '@/lib/content'

type Props = { params: Promise<{ tag: string }> }

export const revalidate = 300

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return {
    title: `「${decoded}」の記事一覧`,
    description: `タグ「${decoded}」がついた記事の一覧です。`,
    alternates: { canonical: `/tag/${tag}` },
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const list = await getPostsByTag(decoded)

  if (list.length === 0) notFound()

  return (
    <main className="mx-auto max-w-6xl px-4 pt-6">
      <Breadcrumbs
        items={[
          { name: 'ホーム', href: '/' },
          { name: `#${decoded}`, href: `/tag/${tag}` },
        ]}
      />
      <header className="mt-8 flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Tag</p>
        <h1 className="text-3xl font-black md:text-4xl">
          <span className="marker">#</span>
          {decoded}
        </h1>
        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          {list.length}
          件の記事が見つかりました。
        </p>
      </header>
      <div className="mt-8">
        <CategoryNav />
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <section aria-label={`タグ${decoded}の記事`}>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
            {list.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              ホームに戻る
            </Link>
          </div>
        </section>
        <Sidebar />
      </div>
    </main>
  )
}

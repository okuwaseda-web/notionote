import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, RefreshCw } from 'lucide-react'
import { ArticleBody } from '@/components/article-body'
import { ArticleCard } from '@/components/article-card'
import { AuthorBox } from '@/components/author-box'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ShareButtons } from '@/components/share-buttons'
import { Sidebar } from '@/components/sidebar'
import { TableOfContents } from '@/components/table-of-contents'
import { getAllPosts, getPost, getRelatedPosts } from '@/lib/content'
import { author, formatDate, getCategory, SITE } from '@/lib/posts'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 300

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/articles/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [post.image],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [post.image] },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const category = getCategory(post.category)
  const related = await getRelatedPosts(post)
  const url = `${SITE.url}/articles/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image.startsWith('http') ? post.image : `${SITE.url}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: author.name },
    publisher: { '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: url,
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pt-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs
        items={[
          { name: 'ホーム', href: '/' },
          ...(category ? [{ name: category.name, href: `/category/${category.slug}` }] : []),
          { name: post.title, href: `/articles/${post.slug}` },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0">
          <header className="flex flex-col gap-4">
            {category && (
              <Link
                href={`/category/${category.slug}`}
                className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground"
              >
                {category.name}
              </Link>
            )}
            <h1 className="text-balance text-2xl font-black leading-snug md:text-4xl md:leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <RefreshCw className="size-3" aria-hidden="true" />
                <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </span>
              <span>
                {'公開 '}
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" aria-hidden="true" />
                {'この記事は約'}
                {post.readingMinutes}
                {'分で読めます'}
              </span>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label="タグ">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className="rounded border bg-card px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {'#'}
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </header>

          <p className="mt-6 rounded-md bg-muted px-4 py-2 text-xs text-muted-foreground">
            ※本記事にはプロモーション（アフィリエイト広告）が含まれます。
          </p>

          <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl border">
            <Image src={post.image || '/placeholder.svg'} alt={post.title} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
          </div>

          <div className="mt-8">
            <TableOfContents blocks={post.body} />
          </div>

          <div className="mt-8">
            <ArticleBody blocks={post.body} />
          </div>

          <div className="mt-12 flex flex-col gap-8 border-t pt-8">
            <ShareButtons url={url} title={post.title} />
            <AuthorBox />
          </div>

          <section aria-labelledby="related-heading" className="mt-14">
            <h2 id="related-heading" className="mb-6 border-b-2 border-foreground pb-3 text-xl font-black">
              あわせて読みたい
            </h2>
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-3">
              {related.map((p) => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        </article>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <Sidebar excludeSlug={post.slug} />
        </div>
      </div>
    </main>
  )
}

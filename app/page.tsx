import { AdSlot } from '@/components/ad-slot'
import { ArticleCard } from '@/components/article-card'
import { AuthorBox } from '@/components/author-box'
import { BeginnerSteps } from '@/components/beginner-steps'
import { CategoryNav } from '@/components/category-nav'
import { HomeHero } from '@/components/home-hero'
import { getLatestPosts, getPopularPosts, SITE } from '@/lib/posts'

export default function HomePage() {
  const featured = getPopularPosts(1)[0]
  const latest = getLatestPosts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'ja',
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeHero featured={featured} />

      <div className="mx-auto mt-10 max-w-6xl px-4">
        <CategoryNav />
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-4">
        <BeginnerSteps />
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_320px]">
        <section aria-labelledby="latest-heading">
          <div className="mb-6 flex items-end justify-between border-b-2 border-foreground pb-3">
            <h2 id="latest-heading" className="text-2xl font-black">
              新着記事
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Latest</span>
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
            {latest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
          <AdSlot size="banner" className="mt-12" />
        </section>

        <aside className="flex flex-col gap-6">
          <AuthorBox compact />
          <AdSlot />
        </aside>
      </div>
    </main>
  )
}

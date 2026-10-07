import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PopularRanking } from '@/components/popular-ranking'
import { formatDate, getCategory, type Post } from '@/lib/posts'

export function HomeHero({ featured }: { featured: Post }) {
  const category = getCategory(featured.category)
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 md:pt-14">
      <div className="mb-8 flex flex-col gap-3 md:mb-10">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">For young professionals</p>
        <h1 className="text-balance text-3xl font-black leading-tight tracking-tight md:text-5xl">
          AIを、明日の仕事の<span className="marker">武器</span>にする。
        </h1>
        <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          ChatGPT・Claude・Geminiを使いこなして、残業を減らし、評価を上げる。若手会社員のための実践AI仕事術メディアです。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="group relative overflow-hidden rounded-2xl border bg-card lg:col-span-2">
          <Link href={`/articles/${featured.slug}`} className="flex h-full flex-col">
            <div className="relative aspect-video">
              <Image
                src={featured.image || '/placeholder.svg'}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-black text-accent-foreground">
                いま一番読まれている記事
              </span>
            </div>
            <div className="flex flex-col gap-3 p-6">
              <div className="flex items-center gap-3 text-xs">
                {category && <span className="font-bold text-primary">{category.name}</span>}
                <time dateTime={featured.updatedAt} className="font-mono text-muted-foreground">
                  {formatDate(featured.updatedAt)}
                  {' 更新'}
                </time>
              </div>
              <h2 className="text-pretty text-xl font-black leading-snug group-hover:text-primary md:text-2xl">
                {featured.title}
              </h2>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{featured.description}</p>
              <span className="flex items-center gap-1 text-sm font-bold text-primary">
                記事を読む
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </article>

        <PopularRanking excludeSlug={featured.slug} limit={5} />
      </div>
    </section>
  )
}

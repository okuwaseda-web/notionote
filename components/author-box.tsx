import Image from 'next/image'
import Link from 'next/link'
import { author } from '@/lib/posts'

export function AuthorBox({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-label="この記事を書いた人" className="flex flex-col gap-4 rounded-xl border bg-card p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Writer</p>
      <div className="flex items-center gap-4">
        <Image src={author.image || '/placeholder.svg'} alt={author.name} width={64} height={64} className="rounded-full border" />
        <div>
          <p className="font-black">{author.name}</p>
          <p className="text-xs text-muted-foreground">{author.role}</p>
        </div>
      </div>
      <p className={compact ? 'line-clamp-4 text-sm leading-relaxed' : 'text-sm leading-relaxed'}>{author.bio}</p>
      <Link href="/about" className="text-sm font-bold text-primary hover:underline">
        プロフィールを見る
      </Link>
    </section>
  )
}

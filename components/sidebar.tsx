import { AdSlot } from '@/components/ad-slot'
import { AuthorBox } from '@/components/author-box'
import { PopularRanking } from '@/components/popular-ranking'

export function Sidebar({ excludeSlug, children }: { excludeSlug?: string; children?: React.ReactNode }) {
  return (
    <aside className="flex flex-col gap-6">
      <AuthorBox compact />
      <AdSlot />
      <PopularRanking excludeSlug={excludeSlug} />
      {children}
    </aside>
  )
}

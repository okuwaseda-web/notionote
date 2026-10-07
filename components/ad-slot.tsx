import { cn } from '@/lib/utils'

// Placeholder for Google AdSense. Replace the inner div with the <ins class="adsbygoogle"> tag after approval.
export function AdSlot({ className, size = 'rectangle' }: { className?: string; size?: 'rectangle' | 'banner' }) {
  return (
    <aside aria-label="スポンサーリンク" className={cn('flex flex-col items-center gap-1.5', className)}>
      <span className="text-xs text-muted-foreground">スポンサーリンク</span>
      <div
        className={cn(
          'flex w-full items-center justify-center rounded-lg border border-dashed bg-muted font-mono text-xs text-muted-foreground',
          size === 'rectangle' ? 'h-64 max-w-[336px]' : 'h-24',
        )}
      >
        AdSense
      </div>
    </aside>
  )
}

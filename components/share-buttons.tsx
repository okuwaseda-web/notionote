export function ShareButtons({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { name: 'LINE', href: `https://social-plugins.line.me/lineit/share?url=${u}` },
    { name: 'はてブ', href: `https://b.hatena.ne.jp/add?mode=confirm&url=${u}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ]

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold">この記事が役に立ったらシェア</p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {links.map((l) => (
          <li key={l.name}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center rounded-lg border bg-card text-sm font-bold transition-colors hover:border-foreground"
            >
              {l.name}
              <span className="sr-only">でシェア（新しいタブで開く）</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

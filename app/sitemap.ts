import type { MetadataRoute } from 'next'
import { categories, posts, SITE } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: 'daily', priority: 1 },
    ...categories.map((c) => ({ url: `${SITE.url}/category/${c.slug}`, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${SITE.url}/articles/${p.slug}`, lastModified: p.updatedAt, priority: 0.8 })),
    { url: `${SITE.url}/about`, priority: 0.3 },
    { url: `${SITE.url}/privacy`, priority: 0.3 },
  ]
}

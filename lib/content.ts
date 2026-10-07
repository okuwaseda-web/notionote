import 'server-only'
import { unstable_cache } from 'next/cache'
import { fetchNotionPosts, isNotionConfigured } from '@/lib/notion'
import { pickRelated, samplePosts, sortLatest, sortPopular, type Post } from '@/lib/posts'

export const CONTENT_REVALIDATE_SECONDS = 300

const loadNotionPosts = unstable_cache(fetchNotionPosts, ['notion-posts'], {
  revalidate: CONTENT_REVALIDATE_SECONDS,
  tags: ['posts'],
})

export async function getAllPosts(): Promise<Post[]> {
  if (!isNotionConfigured()) return samplePosts
  return loadNotionPosts()
}

export async function getPost(slug: string) {
  return (await getAllPosts()).find((p) => p.slug === slug)
}

export async function getLatestPosts() {
  return sortLatest(await getAllPosts())
}

export async function getPopularPosts(limit = 5) {
  return sortPopular(await getAllPosts(), limit)
}

export async function getPostsByCategory(slug: string) {
  return (await getLatestPosts()).filter((p) => p.category === slug)
}

export async function getRelatedPosts(post: Post, limit = 3) {
  return pickRelated(await getAllPosts(), post, limit)
}

export async function getPostsByTag(tag: string) {
  return (await getLatestPosts()).filter((p) => p.tags.includes(tag))
}

export async function getAllTags() {
  const posts = await getAllPosts()
  const counts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }))
}

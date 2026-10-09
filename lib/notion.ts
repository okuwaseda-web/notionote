import 'server-only'
import { Client, collectPaginatedAPI, isFullBlock, isFullPage } from '@notionhq/client'
import type { BlockObjectResponse, PageObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { categories, tools, type Block, type Post } from '@/lib/posts'

type Property = PageObjectResponse['properties'][string]

const PROPERTY_NAMES = {
  slug: ['Slug', 'スラッグ'],
  description: ['Description', '説明'],
  category: ['Category', 'カテゴリ'],
  tags: ['Tags', 'tags', 'Tag', 'tag', 'タグ'],
  publishedAt: ['PublishedAt', '公開日'],
  status: ['Status', 'ステータス'],
  image: ['Image', 'アイキャッチ'],
  views: ['Views', 'PV'],
}

const PUBLISHED_VALUES = ['Published', '公開', '公開中']

export function isNotionConfigured() {
  return Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID)
}

function plain(rich: RichTextItemResponse[]) {
  return rich.map((t) => t.plain_text).join('')
}

function prop(page: PageObjectResponse, names: string[]): Property | undefined {
  const props = page.properties
  for (const name of names) {
    if (props[name]) return props[name]
  }
  const lower = names.map((n) => n.toLowerCase())
  for (const key of Object.keys(props)) {
    if (lower.includes(key.toLowerCase())) return props[key]
  }
  return undefined
}

function propByType(page: PageObjectResponse, type: Property['type']): Property | undefined {
  return Object.values(page.properties).find((p) => p.type === type)
}

function parseTags(p?: Property): string[] {
  if (!p) return []
  switch (p.type) {
    case 'multi_select':
      return p.multi_select.map((t) => t.name)
    case 'select':
      return p.select?.name ? [p.select.name] : []
    case 'rich_text':
      return plain(p.rich_text)
        .split(/[,，、\s]+/)
        .map((t) => t.trim())
        .filter(Boolean)
    case 'relation':
      return []
    default:
      return []
  }
}

function propText(p?: Property): string {
  if (!p) return ''
  switch (p.type) {
    case 'title':
      return plain(p.title)
    case 'rich_text':
      return plain(p.rich_text)
    case 'select':
      return p.select?.name ?? ''
    case 'multi_select':
      return p.multi_select.map((t) => t.name).join(', ')
    case 'status':
      return p.status?.name ?? ''
    case 'url':
      return p.url ?? ''
    case 'date':
      return p.date?.start?.slice(0, 10) ?? ''
    case 'files': {
      const file = p.files[0]
      if (!file) return ''
      return file.type === 'external' ? file.external.url : file.file.url
    }
    default:
      return ''
  }
}

function resolveCategory(value: string) {
  const v = value.trim()
  const match = categories.find((c) => c.slug === v || c.name === v)
  if (match) return match.slug
  const partial = categories.find((c) => v.includes(c.name) || c.name.includes(v) || v.includes(c.slug))
  return partial?.slug ?? categories[0].slug
}

function coverUrl(page: PageObjectResponse) {
  if (!page.cover) return ''
  return page.cover.type === 'external' ? page.cover.external.url : page.cover.file.url
}

function toBlocks(raw: BlockObjectResponse[]): Block[] {
  const blocks: Block[] = []
  let sectionIndex = 0

  for (const b of raw) {
    const last = blocks.at(-1)
    switch (b.type) {
      case 'heading_1':
      case 'heading_2': {
        const text = plain(b.type === 'heading_1' ? b.heading_1.rich_text : b.heading_2.rich_text)
        if (text) blocks.push({ type: 'h2', id: `section-${++sectionIndex}`, text })
        break
      }
      case 'heading_3': {
        const text = plain(b.heading_3.rich_text)
        if (text) blocks.push({ type: 'h3', text })
        break
      }
      case 'paragraph': {
        const text = plain(b.paragraph.rich_text).trim()
        if (!text) break
        if (text === '[ad]') {
          blocks.push({ type: 'ad' })
          break
        }
        const affiliate = text.match(/^\[affiliate:(\w+)\]$/)
        if (affiliate && affiliate[1] in tools) {
          blocks.push({ type: 'affiliate', toolId: affiliate[1] as keyof typeof tools })
          break
        }
        blocks.push({ type: 'p', text })
        break
      }
      case 'quote': {
        const text = plain(b.quote.rich_text)
        if (text) blocks.push({ type: 'p', text })
        break
      }
      case 'bulleted_list_item':
      case 'numbered_list_item': {
        const ordered = b.type === 'numbered_list_item'
        const text = plain(ordered ? b.numbered_list_item.rich_text : b.bulleted_list_item.rich_text)
        if (last?.type === 'list' && Boolean(last.ordered) === ordered) last.items.push(text)
        else blocks.push({ type: 'list', ordered, items: [text] })
        break
      }
      case 'callout': {
        const [title, ...rest] = plain(b.callout.rich_text).split('\n')
        blocks.push(rest.length ? { type: 'point', title, text: rest.join(' ') } : { type: 'point', title: 'ポイント', text: title })
        break
      }
      case 'code':
        blocks.push({ type: 'prompt', label: plain(b.code.caption) || 'プロンプト', text: plain(b.code.rich_text) })
        break
      case 'image': {
        const src = b.image.type === 'external' ? b.image.external.url : b.image.file.url
        blocks.push({ type: 'image', src, caption: plain(b.image.caption) })
        break
      }
      case 'divider':
        blocks.push({ type: 'ad' })
        break
    }
  }
  return blocks
}

function readingMinutes(blocks: Block[]) {
  const chars = blocks.reduce((sum, b) => {
    if ('text' in b) return sum + b.text.length
    if (b.type === 'list') return sum + b.items.join('').length
    return sum
  }, 0)
  return Math.max(1, Math.round(chars / 500))
}

export async function fetchNotionPosts(): Promise<Post[]> {
  const notion = new Client({ auth: process.env.NOTION_TOKEN })
  const database = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID! })
  const dataSourceId = 'data_sources' in database ? database.data_sources[0]?.id : undefined
  if (!dataSourceId) throw new Error('Notion database has no data source')

  const pages = (await collectPaginatedAPI(notion.dataSources.query, { data_source_id: dataSourceId })).filter(isFullPage)

  const published = pages.filter((page) => {
    const status = prop(page, PROPERTY_NAMES.status)
    if (!status) return true
    if (status.type === 'checkbox') return status.checkbox
    return PUBLISHED_VALUES.includes(propText(status))
  })

  return Promise.all(
    published.map(async (page) => {
      const children = (await collectPaginatedAPI(notion.blocks.children.list, { block_id: page.id })).filter(isFullBlock)
      const body = toBlocks(children)
      const titleProp = Object.values(page.properties).find((p) => p.type === 'title')
      const tagsProp = prop(page, PROPERTY_NAMES.tags) ?? propByType(page, 'multi_select')
      const viewsProp = prop(page, PROPERTY_NAMES.views)

      return {
        slug: propText(prop(page, PROPERTY_NAMES.slug)) || page.id.replaceAll('-', ''),
        title: propText(titleProp) || '無題の記事',
        description: propText(prop(page, PROPERTY_NAMES.description)),
        category: resolveCategory(propText(prop(page, PROPERTY_NAMES.category))),
        tags: parseTags(tagsProp),
        publishedAt: propText(prop(page, PROPERTY_NAMES.publishedAt)) || page.created_time.slice(0, 10),
        updatedAt: page.last_edited_time.slice(0, 10),
        readingMinutes: readingMinutes(body),
        image: propText(prop(page, PROPERTY_NAMES.image)) || coverUrl(page) || '/placeholder.svg',
        monthlyViews: viewsProp?.type === 'number' ? (viewsProp.number ?? 0) : 0,
        body,
      } satisfies Post
    }),
  )
}

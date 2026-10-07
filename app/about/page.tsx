import type { Metadata } from 'next'
import { AuthorBox } from '@/components/author-box'
import { SITE } from '@/lib/posts'

export const metadata: Metadata = {
  title: '運営者情報・お問い合わせ',
  description: `${SITE.name}の運営者情報とお問い合わせ先です。`,
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 pt-12">
      <h1 className="text-3xl font-black">運営者情報・お問い合わせ</h1>
      <AuthorBox />
      <section className="flex flex-col gap-3 leading-relaxed">
        <h2 className="text-xl font-black">サイトについて</h2>
        <p>{SITE.description}</p>
      </section>
      <section className="flex flex-col gap-3 leading-relaxed">
        <h2 className="text-xl font-black">お問い合わせ</h2>
        <p>
          記事内容に関するご質問、取材・お仕事のご依頼は以下のメールアドレスまでご連絡ください。
          <br />
          <span className="font-mono">contact@example.com</span>
        </p>
      </section>
    </main>
  )
}

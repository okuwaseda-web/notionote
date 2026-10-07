import type { Metadata } from 'next'
import { SITE } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'プライバシーポリシー・免責事項',
  description: `${SITE.name}のプライバシーポリシーおよび免責事項です。`,
  alternates: { canonical: '/privacy' },
}

const sections = [
  {
    title: '広告の配信について',
    text: '当サイトは第三者配信の広告サービス「Google アドセンス」を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。Cookieを無効にする設定およびGoogleアドセンスに関する詳細は「広告 – ポリシーと規約 – Google」をご確認ください。',
  },
  {
    title: 'アフィリエイトプログラムについて',
    text: '当サイトは、アフィリエイトプログラムに参加しており、記事内で紹介した商品・サービスの購入や申込みにより、当サイトが報酬を受け取る場合があります。',
  },
  {
    title: 'アクセス解析ツールについて',
    text: '当サイトでは、サービス向上のためにアクセス解析ツールを利用しています。収集されるデータは匿名であり、個人を特定するものではありません。',
  },
  {
    title: '免責事項',
    text: '当サイトの情報は、可能な限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。AIツールの業務利用にあたっては、所属組織の規定を必ずご確認ください。',
  },
]

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 pt-12">
      <h1 className="text-3xl font-black">プライバシーポリシー・免責事項</h1>
      {sections.map((s) => (
        <section key={s.title} className="flex flex-col gap-3 leading-relaxed">
          <h2 className="text-xl font-black">{s.title}</h2>
          <p>{s.text}</p>
        </section>
      ))}
    </main>
  )
}

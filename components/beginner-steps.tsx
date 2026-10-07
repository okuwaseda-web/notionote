import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPost } from '@/lib/posts'

const steps = [
  { label: 'AIを選ぶ', slug: 'chatgpt-claude-gemini-comparison', lead: 'まずは自分に合うAIツールを1つ決める' },
  { label: '毎日使う', slug: 'chatgpt-prompt-templates', lead: 'コピペできるプロンプトで日常業務を時短' },
  { label: '武器にする', slug: 'ai-skill-career-roadmap', lead: '3ヶ月のロードマップで社内で頼られる存在に' },
]

export function BeginnerSteps() {
  return (
    <section aria-labelledby="beginner-heading" className="rounded-2xl bg-primary p-6 text-primary-foreground md:p-10">
      <div className="mb-8 flex flex-col gap-2">
        <p className="font-mono text-xs uppercase tracking-widest text-primary-foreground/70">Start here</p>
        <h2 id="beginner-heading" className="text-balance text-2xl font-black md:text-3xl">
          はじめての方へ：3ステップで<span className="text-accent">AI仕事術</span>をマスター
        </h2>
      </div>
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => {
          const post = getPost(step.slug)
          if (!post) return null
          return (
            <li key={step.slug}>
              <Link
                href={`/articles/${post.slug}`}
                className="group flex h-full flex-col gap-3 rounded-xl bg-card p-5 text-card-foreground transition-transform hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                  <span className="font-black">{step.label}</span>
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{step.lead}</span>
                <span className="mt-auto line-clamp-2 text-sm font-bold leading-snug group-hover:text-primary">
                  {post.title}
                </span>
                <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

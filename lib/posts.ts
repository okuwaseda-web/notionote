export const SITE = {
  name: 'AI仕事術ノート',
  tagline: 'AIを、明日の仕事の武器にする。',
  description:
    'ChatGPT・Claude・GeminiなどのAIツールを仕事で使いこなしたい若手会社員のための実践メディア。プロンプト例、ツール比較、業務効率化のノウハウをわかりやすく解説します。',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ai-shigoto-note.example.com',
}

export type Category = {
  slug: string
  name: string
  description: string
}

export const categories: Category[] = [
  { slug: 'chatgpt', name: 'ChatGPT活用', description: 'プロンプトのコツから実務テンプレートまで、ChatGPTを仕事で使い倒すための記事。' },
  { slug: 'compare', name: 'ツール比較', description: '生成AIツールを用途・料金・使いやすさで徹底比較。' },
  { slug: 'office', name: 'Excel・資料作成', description: 'Excel、スライド、文書作成をAIで時短するテクニック。' },
  { slug: 'meeting', name: '会議・議事録', description: '議事録の自動化や会議の効率化に役立つAI活用術。' },
  { slug: 'career', name: 'キャリア・学習', description: 'AIスキルを武器にキャリアアップするための学習ロードマップ。' },
]

export type Tool = {
  id: string
  name: string
  catch: string
  points: string[]
  price: string
  url: string
}

export const tools: Record<string, Tool> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT Plus',
    catch: 'まず1つ有料AIを選ぶならコレ',
    points: ['最新モデルを優先的に利用できる', '画像・ファイル解析にも対応', 'カスタムGPTで定型業務を自動化'],
    price: '無料プランあり / 有料プランは月額制',
    url: 'https://example.com/affiliate/chatgpt',
  },
  notta: {
    id: 'notta',
    name: 'AI議事録ツール',
    catch: '会議の文字起こし・要約を自動化',
    points: ['オンライン会議に自動参加して録音', '話者を分けて文字起こし', '要点・ToDoをAIが自動で抽出'],
    price: '無料トライアルあり',
    url: 'https://example.com/affiliate/meeting',
  },
  course: {
    id: 'course',
    name: '生成AIオンライン講座',
    catch: '独学で迷ったら体系的に学ぶ',
    points: ['実務課題ベースのカリキュラム', '現役エンジニアによる添削つき', '給付金対象コースあり'],
    price: '無料カウンセリング実施中',
    url: 'https://example.com/affiliate/course',
  },
}

export type Block =
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'point'; title: string; text: string }
  | { type: 'prompt'; label: string; text: string }
  | { type: 'affiliate'; toolId: keyof typeof tools }
  | { type: 'image'; src: string; caption: string }
  | { type: 'ad' }

export type Post = {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  readingMinutes: number
  image: string
  monthlyViews: number
  body: Block[]
}

export const author = {
  name: 'カイ',
  role: 'AI活用ライター / 元SE',
  image: '/images/author.png',
  bio: 'SIerでシステムエンジニアとして7年間、業務システムの開発・運用を担当。生成AIで資料作成や調査の時間を大幅に減らした経験から、非エンジニアの若手会社員にも分かる「明日から使えるAI仕事術」を発信しています。',
}

export const samplePosts: Post[] = [
  {
    slug: 'chatgpt-prompt-templates',
    title: '【コピペOK】ChatGPTの仕事効率化プロンプト30選｜メール・資料・企画が10分で終わる',
    description:
      'ChatGPTを仕事で使いこなすためのプロンプトをシーン別に30個紹介。メール返信、議事録要約、企画書の骨子づくりまで、コピペですぐに使えるテンプレート付きで解説します。',
    category: 'chatgpt',
    tags: ['ChatGPT', 'プロンプト', '業務効率化', '初心者'],
    publishedAt: '2026-06-12',
    updatedAt: '2026-07-03',
    readingMinutes: 12,
    image: '/images/chatgpt-prompts.png',
    monthlyViews: 18420,
    body: [
      { type: 'p', text: '「ChatGPTを使ってみたけど、思ったような答えが返ってこない」——そんな悩みの9割は、プロンプト（指示文）の書き方で解決できます。この記事では、若手会社員が日々の業務ですぐに使えるプロンプトを、シーン別にまとめました。' },
      { type: 'point', title: 'この記事でわかること', text: '良いプロンプトの基本構造 / メール・資料・企画・学習の4シーン別テンプレート / 回答の精度をさらに上げる追加質問のコツ' },
      { type: 'h2', id: 'basics', text: '成果が変わるプロンプトの基本「役割・目的・条件・形式」' },
      { type: 'p', text: 'ChatGPTへの指示は、新しく入った優秀な後輩に仕事を頼むイメージで書くのがコツです。背景を知らない相手にも伝わるよう、次の4つの要素を意識しましょう。' },
      { type: 'list', ordered: true, items: ['役割：あなたは〇〇の専門家です', '目的：何のためのアウトプットか', '条件：文字数、トーン、対象読者など', '形式：箇条書き、表、見出し付きなど'] },
      { type: 'prompt', label: '基本テンプレート', text: 'あなたは{役割}です。\n{目的}のために、以下の条件で{成果物}を作成してください。\n\n# 条件\n- 対象読者：{読者}\n- 文字数：{文字数}\n- トーン：{トーン}\n\n# 出力形式\n{形式}' },
      { type: 'ad' },
      { type: 'h2', id: 'email', text: 'メール・チャット業務を時短するプロンプト' },
      { type: 'p', text: '1日に何通も書くメールは、AIに任せると効果を実感しやすい業務です。下書きを作らせ、最後に自分の言葉で微調整するだけで作業時間は半分以下になります。' },
      { type: 'h3', text: '取引先への丁寧なお断りメール' },
      { type: 'prompt', label: 'お断りメール', text: 'あなたはビジネスマナーに詳しい営業担当です。\n以下の内容で、取引先への丁寧なお断りメールを作成してください。\n関係性を損なわず、代替案も1つ提示してください。\n\n# 内容\n{断りたい内容と理由}' },
      { type: 'h3', text: '長文メールの要点を3行で要約' },
      { type: 'prompt', label: '要約', text: '以下のメールを、要点・依頼事項・期限の3行で要約してください。\n\n{メール本文}' },
      { type: 'h2', id: 'documents', text: '資料作成・企画のたたき台をつくるプロンプト' },
      { type: 'p', text: '白紙の状態から企画書を考えるのは時間がかかります。AIに構成案を複数出させ、良いものを選んで肉付けしていくのが効率的です。' },
      { type: 'prompt', label: '企画書の構成案', text: 'あなたは経験豊富なマーケターです。\n{テーマ}について、社内向け企画書の構成案を3パターン提案してください。\n各パターンに見出しと、各見出しで伝えるべき要点を箇条書きで示してください。' },
      { type: 'affiliate', toolId: 'chatgpt' },
      { type: 'h2', id: 'learning', text: '学習・スキルアップに使えるプロンプト' },
      { type: 'p', text: 'ChatGPTは「24時間質問できる家庭教師」としても優秀です。業界用語や新しい業務知識を、自分のレベルに合わせて教えてもらいましょう。' },
      { type: 'prompt', label: '理解度チェック', text: '{トピック}について��入社1年目の社会人にもわかるよう��説明してください。\nその後、理解度を確認するための問題を3問出してください。' },
      { type: 'h2', id: 'tips', text: '回答の精度をさらに上げる3つのコツ' },
      { type: 'list', items: ['一度で完璧を求めず「もっと具体的に」「別案を3つ」と追加で頼む', '良い回答例（お手本）を一緒に渡す', '社外秘・個人情報は入力しない（社内ルールを必ず確認）'] },
      { type: 'h2', id: 'summary', text: 'まとめ：まずは毎日1回、AIに仕事を頼んでみよう' },
      { type: 'p', text: 'プロンプトは使えば使うほど上達します。今日紹介したテンプレートをブックマークして、まずはメール1通からAIに任せてみてください。浮いた時間で、より価値の高い仕事に集中できるはずです。' },
    ],
  },
  {
    slug: 'chatgpt-claude-gemini-comparison',
    title: 'ChatGPT・Claude・Geminiを徹底比較｜仕事で使うならどれ？用途別おすすめ',
    description: '主要な生成AI3つを、文章作成・情報収集・資料作成など仕事の用途別に比較。無料版と有料版の違いや、目的別のおすすめをわかりやすく解説します。',
    category: 'compare',
    tags: ['ChatGPT', 'Claude', 'Gemini', '比較'],
    publishedAt: '2026-06-20',
    updatedAt: '2026-07-01',
    readingMinutes: 9,
    image: '/images/ai-compare.png',
    monthlyViews: 14210,
    body: [
      { type: 'p', text: '生成AIは種類が増え、「結局どれを使えばいいの？」と迷う人も多いはず。この記事では仕事での使いやすさに絞って、代表的な3つのAIを比較します。' },
      { type: 'h2', id: 'overview', text: '3つのAIの特徴をざっくり把握する' },
      { type: 'list', items: ['ChatGPT：機能の幅が広く、迷ったらまずこれ', 'Claude：長文の読解・自然な日本語の文章作成が得意', 'Gemini：Googleサービスとの連携がスムーズ'] },
      { type: 'ad' },
      { type: 'h2', id: 'use-case', text: '用途別のおすすめ' },
      { type: 'h3', text: 'メール・文章作成' },
      { type: 'p', text: '自然で丁寧な日本語を重視するならClaude、テンプレート化して大量に回すならChatGPTが便利です。' },
      { type: 'h3', text: '情報収集・リサーチ' },
      { type: 'p', text: 'Web検索と組み合わせた調べものは、どのAIも対応が進んでいます。普段使っているサービスとの連携で選ぶのがおすすめです。' },
      { type: 'affiliate', toolId: 'chatgpt' },
      { type: 'h2', id: 'summary', text: 'まとめ：無料版で試して、1つに絞って課金しよう' },
      { type: 'p', text: 'まずは無料版で3つとも触ってみて、自分の業務に一番フィットしたものを有料プランにするのが失敗しない選び方です。' },
    ],
  },
  {
    slug: 'excel-ai-functions',
    title: 'Excel関数はもう覚えなくていい？AIに数式を作らせる方法と実例10選',
    description: 'VLOOKUPやIF関数の組み合わせも、AIに日本語で頼めば一瞬で完成。Excel作業を時短するAI活用法を、実際の指示例とともに紹介します。',
    category: 'office',
    tags: ['Excel', 'ChatGPT', '事務効率化'],
    publishedAt: '2026-06-05',
    updatedAt: '2026-06-28',
    readingMinutes: 8,
    image: '/images/excel-ai.png',
    monthlyViews: 11980,
    body: [
      { type: 'p', text: '複雑な関数を調べながら組み立てる時間は、AIを使えばほぼゼロにできます。ポイントは「どの列に何が入っていて、何をしたいか」を具体的に伝えることです。' },
      { type: 'h2', id: 'how', text: 'AIに数式を作らせる基本の頼み方' },
      { type: 'prompt', label: '数式の作成', text: 'Excelで、A列に社員名、B列に売上、C列に目標値があります。\nD列に「達成」「未達」を表示する数式を作ってください。\n数式の意味も簡単に説明してください。' },
      { type: 'ad' },
      { type: 'h2', id: 'examples', text: 'すぐに使える活用例' },
      { type: 'list', items: ['重複データの削除と抽出', '日付から曜日・月を自動で出す', '複数シートのデータを集計する', 'エラー表示を空白にする'] },
      { type: 'h2', id: 'summary', text: 'まとめ' },
      { type: 'p', text: '関数を丸暗記するより、AIに正しく伝える力を磨く方がこれからの時代は効率的です。' },
    ],
  },
  {
    slug: 'ai-meeting-minutes-tools',
    title: '議事録はAIに任せる時代｜自動文字起こしツールの選び方と使い方',
    description: '会議の議事録作成をAIで自動化する方法を解説。ツールの選び方、精度を上げる録音のコツ、要約プロンプトまで紹介します。',
    category: 'meeting',
    tags: ['議事録', '文字起こし', '会議効率化'],
    publishedAt: '2026-05-28',
    updatedAt: '2026-06-25',
    readingMinutes: 7,
    image: '/images/meeting-ai.png',
    monthlyViews: 9640,
    body: [
      { type: 'p', text: '若手の仕事として任されがちな議事録。AIツールを使えば、会議が終わった瞬間に要約とToDoリストが完成します。' },
      { type: 'h2', id: 'choose', text: 'AI議事録ツールの選び方' },
      { type: 'list', items: ['日本語の認識精度', '使っている会議ツールとの連携', 'セキュリティと社内規定への適合'] },
      { type: 'affiliate', toolId: 'notta' },
      { type: 'h2', id: 'prompt', text: '文字起こしを議事録に整えるプロンプト' },
      { type: 'prompt', label: '議事録化', text: '以下の会議の文字起こしを、決定事項・ToDo（担当者・期限）・次回の議題に分けて整理してください。\n\n{文字起こし}' },
      { type: 'ad' },
      { type: 'h2', id: 'summary', text: 'まとめ' },
      { type: 'p', text: '議事録作成から解放されれば、会議中は議論そのものに集中できます。' },
    ],
  },
  {
    slug: 'ai-presentation-slides',
    title: 'AIでスライド資料を30分で作る方法｜構成づくりからデザインまで',
    description: '企画書やプレゼン資料をAIで効率よく作るワークフローを紹介。構成案の作成、文章の推敲、デザインの整え方まで手順を解説します。',
    category: 'office',
    tags: ['スライド', 'プレゼン', '資料作成'],
    publishedAt: '2026-06-25',
    updatedAt: '2026-06-30',
    readingMinutes: 6,
    image: '/images/ai-slides.png',
    monthlyViews: 7320,
    body: [
      { type: 'p', text: '資料作成で一番時間がかかるのは「何をどの順番で話すか」を考える工程です。ここをAIに手伝ってもらいましょう。' },
      { type: 'h2', id: 'flow', text: '30分で仕上げるワークフロー' },
      { type: 'list', ordered: true, items: ['AIに目的と聞き手を伝えて構成案を出す', '各スライドのメッセージを1文で書かせる', '図解のアイデアを提案してもらう', 'テンプレートに流し込んで微調整'] },
      { type: 'ad' },
      { type: 'h2', id: 'summary', text: 'まとめ' },
      { type: 'p', text: 'AIは「考えるたたき台」を作るのが得意です。最終的な判断と仕上げは自分で行いましょう。' },
    ],
  },
  {
    slug: 'ai-skill-career-roadmap',
    title: '20代会社員のためのAIスキル習得ロードマ��プ｜3ヶ月で「社内で頼られる人」になる',
    description: 'AIスキルをゼロから身につけたい若手会社員向けに、3ヶ月の学習ロードマップを紹介。独学の進め方とおすすめの学習方法も解説します。',
    category: 'career',
    tags: ['キャリア', '��習', 'リスキリング'],
    publishedAt: '2026-07-01',
    updatedAt: '2026-07-05',
    readingMinutes: 10,
    image: '/images/ai-career.png',
    monthlyViews: 8150,
    body: [
      { type: 'p', text: 'AIを使える人と使えない人の差は、これから確実に広がります。とはいえ、特別なプログラミング知識は必要ありません。3ヶ月で着実にスキルを身につける道のりを紹介します。' },
      { type: 'h2', id: 'month1', text: '1ヶ月目：毎日AIに触れる習慣をつくる' },
      { type: 'p', text: 'メールの下書き、調べものなど、まずは日常業務の小さなタスクをAIに任せてみましょう。' },
      { type: 'h2', id: 'month2', text: '2ヶ月目：自分専用のプロンプト集をつくる' },
      { type: 'p', text: 'うまくいった指示文を保存し、テンプレート化していきます。チームに共有すると評価にもつながります。' },
      { type: 'ad' },
      { type: 'h2', id: 'month3', text: '3ヶ月目：業務フローそのものを改善する' },
      { type: 'p', text: '単発の作業効率化から一歩進んで、チームの定型業務をAIで仕組み化する提案をしてみましょう。' },
      { type: 'affiliate', toolId: 'course' },
      { type: 'h2', id: 'summary', text: 'まとめ' },
      { type: 'p', text: '小さな成功体験の積み重ねが、AI時代のキャリアを切り拓く一番の近道です。' },
    ],
  },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function sortLatest(posts: Post[]) {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function sortPopular(posts: Post[], limit = 5) {
  return [...posts].sort((a, b) => b.monthlyViews - a.monthlyViews).slice(0, limit)
}

export function pickRelated(posts: Post[], post: Post, limit = 3) {
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: (p.category === post.category ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.monthlyViews - a.post.monthlyViews)
    .slice(0, limit)
    .map((r) => r.post)
}

export function formatDate(date: string) {
  return date.replaceAll('-', '.')
}

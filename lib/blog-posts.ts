import fs from "fs"
import path from "path"

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  image?: string
  content: string
}

const BLOG_DIRECTORY = path.join(process.cwd(), "blog")

function hasFrontMatter(content: string) {
  return content.startsWith("---")
}

function parseFrontMatter(fileContent: string): { data: Record<string, string>; content: string } {
  if (!hasFrontMatter(fileContent)) {
    return { data: {}, content: fileContent.trim() }
  }

  const match = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/m.exec(fileContent)
  if (!match) {
    return { data: {}, content: fileContent.trim() }
  }

  const [, frontMatterBlock, markdownContent] = match
  const lines = frontMatterBlock.split("\n")
  const data: Record<string, string> = {}

  for (const line of lines) {
    if (!line.trim()) continue
    const [rawKey, ...rest] = line.split(":")
    if (!rawKey || rest.length === 0) continue
    const key = rawKey.trim()
    const value = rest.join(":").trim()
    data[key] = value.replace(/^['"]|['"]$/g, "")
  }

  return { data, content: markdownContent.trim() }
}

function formatDate(dateString?: string) {
  if (!dateString) return ""
  const parsed = new Date(dateString)
  if (Number.isNaN(parsed.getTime())) {
    return dateString
  }
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

function summarize(content: string, fallback = "") {
  if (!content) return fallback
  const plain = content.replace(/[#>*_`\-]|\[(.*?)\]\((.*?)\)/g, "").replace(/\s+/g, " ").trim()
  const snippet = plain.slice(0, 180)
  return snippet + (plain.length > 180 ? "..." : "")
}

function buildPost(slug: string, data: Record<string, string>, content: string): BlogPost {
  const title = data.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  const formattedDate = formatDate(data.date)
  const excerpt = data.excerpt ?? summarize(content)

  return {
    slug,
    title,
    date: formattedDate,
    author: data.author ?? "",
    excerpt,
    image: data.image,
    content,
  }
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIRECTORY).filter((file) => file.endsWith(".md"))

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "")
    const filePath = path.join(BLOG_DIRECTORY, file)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = parseFrontMatter(fileContent)
    const post = buildPost(slug, data, content)
    const sortValue = data.date ?? post.date
    return { post, sortValue }
  })

  return posts
    .sort((a, b) => {
      const dateA = new Date(a.sortValue)
      const dateB = new Date(b.sortValue)
      const timeA = Number.isNaN(dateA.getTime()) ? 0 : dateA.getTime()
      const timeB = Number.isNaN(dateB.getTime()) ? 0 : dateB.getTime()
      return timeB - timeA
    })
    .map(({ post }) => post)
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { data, content } = parseFrontMatter(fileContent)
  return buildPost(slug, data, content)
}

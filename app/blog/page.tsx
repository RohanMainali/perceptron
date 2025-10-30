import { getAllBlogPosts } from "@/lib/blog-posts"
import BlogPageClient from "./blog-page-client"

export const revalidate = 60

export default async function BlogPage() {
  try {
    const posts = await getAllBlogPosts()
    return <BlogPageClient posts={posts} />
  } catch (error) {
    console.error("Failed to load blog posts", error)
    return <BlogPageClient posts={[]} />
  }
}

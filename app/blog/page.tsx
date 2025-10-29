import { getAllBlogPosts } from "@/lib/blog-posts"
import BlogPageClient from "./blog-page-client"

export default function BlogPage() {
  const posts = getAllBlogPosts()
  return <BlogPageClient posts={posts} />
}

import { notFound } from "next/navigation"

import { getAllBlogPosts, getBlogPost } from "@/lib/blog-posts"

import BlogPostClient from "./blog-post-client"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}

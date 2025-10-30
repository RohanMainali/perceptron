import { notFound } from "next/navigation"

import { getAllBlogPosts, getBlogPost } from "@/lib/blog-posts"

import BlogPostClient from "./blog-post-client"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts()
    return posts.map((post) => ({ slug: post.slug }))
  } catch (error) {
    console.error("Failed to generate blog static params", error)
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  try {
    const post = await getBlogPost(slug)

    if (!post) {
      notFound()
    }

    return <BlogPostClient post={post} />
  } catch (error) {
    console.error(`Failed to load blog post for slug ${slug}`, error)
    notFound()
  }
}

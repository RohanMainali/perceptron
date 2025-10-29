"use server"

import { blogPosts, type BlogPost } from "@/lib/blog-posts"

export async function validateAdminKey(key: string) {
  const expectedKey = process.env.ADMIN_SECRET_KEY

  if (!expectedKey) {
    return { success: false, error: "Admin key not configured" }
  }

  if (key === expectedKey) {
    return { success: true }
  }

  return { success: false, error: "Invalid secret key" }
}

export async function createBlogPost(data: {
  title: string
  author: string
  excerpt: string
  image: string
  content: string
}) {
  try {
    const { title, author, excerpt, image, content } = data

    // Validate required fields
    if (!title || !excerpt || !content) {
      return { success: false, error: "Missing required fields" }
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    // Check if slug already exists
    if (blogPosts.some((post) => post.slug === slug)) {
      return { success: false, error: "A blog post with this title already exists" }
    }

    // Create new blog post
    const newPost: BlogPost = {
      slug,
      title,
      author: author || "Rohan Mainali",
      excerpt,
      image: image || "/blog-image.jpg",
      content,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    }

    // Add to blog posts array
    blogPosts.push(newPost)

    return { success: true, post: newPost }
  } catch (error) {
    console.error("Error creating blog post:", error)
    return { success: false, error: "Internal server error" }
  }
}

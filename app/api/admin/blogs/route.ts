import { blogPosts, type BlogPost } from "@/lib/blog-posts"

export async function POST(request: Request) {
  try {
    const adminKey = request.headers.get("X-Admin-Key")
    const expectedKey = process.env.ADMIN_SECRET_KEY

    if (!adminKey || !expectedKey || adminKey !== expectedKey) {
      return Response.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, author, excerpt, image, content } = body

    // Validate required fields
    if (!title || !excerpt || !content) {
      return Response.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    // Check if slug already exists
    if (blogPosts.some((post) => post.slug === slug)) {
      return Response.json({ message: "A blog post with this title already exists" }, { status: 400 })
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

    return Response.json({ message: "Blog post created successfully", post: newPost }, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

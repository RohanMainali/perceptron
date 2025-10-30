export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  image?: string
  content: string
}

type FetchInit = RequestInit & { next?: { revalidate?: number } }

type BackendFetchOptions = FetchInit & { allowNotFound?: boolean }

interface BlogListResponse {
  posts?: BlogPost[]
}

interface BlogPostResponse {
  post?: BlogPost
}

function getBackendBaseUrl() {
  const base = (process.env.BACKEND_SERVICE_URL || process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || "").trim()
  if (!base) {
    throw new Error("Backend service URL is not configured.")
  }
  return base.replace(/\/$/, "")
}

async function backendFetch<T>(path: string, options?: BackendFetchOptions): Promise<T | null> {
  const { allowNotFound, headers, ...init } = options ?? {}
  const baseUrl = getBackendBaseUrl()
  const normalizedHeaders = new Headers(headers ?? {})
  if (!normalizedHeaders.has("Accept")) {
    normalizedHeaders.set("Accept", "application/json")
  }
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: normalizedHeaders,
  })

  if (allowNotFound && response.status === 404) {
    return null
  }

  if (!response.ok) {
    const message = `Failed to fetch ${path} from backend: ${response.status} ${response.statusText}`
    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return (await response.json()) as T
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const result = await backendFetch<BlogListResponse>("/blogs", {
    next: { revalidate: 60 },
  })

  return result?.posts ?? []
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!slug) {
    return null
  }

  const result = await backendFetch<BlogPostResponse>(`/blogs/${slug}`, {
    allowNotFound: true,
    next: { revalidate: 60 },
  })

  return result?.post ?? null
}

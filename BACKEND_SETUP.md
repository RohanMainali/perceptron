# Backend Setup for Persistent Blog Storage

This guide explains how to set up a Node.js backend service on Render to persist blog posts.

## Why a Backend?

The current frontend-only solution stores blog posts in memory, which means they're lost when the server restarts. A backend service provides:

- **Persistent Storage**: Blog posts are saved to a database
- **Scalability**: Handle multiple requests and users
- **Security**: Better protection of sensitive operations
- **Flexibility**: Easy to add more features later

## Backend Architecture

The backend is a simple Express.js server that:
- Validates admin credentials
- Stores blog posts in a JSON file or database
- Provides API endpoints for creating and retrieving blog posts

## Deployment to Render

### Step 1: Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up for a free account
3. Connect your GitHub account

### Step 2: Create a New Web Service

1. Click "New +" and select "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `perceptron-blog-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free tier is fine for testing

### Step 3: Set Environment Variables

In the Render dashboard, add these environment variables:

\`\`\`
ADMIN_SECRET_KEY=your_secret_key_here
PORT=3001
\`\`\`

### Step 4: Deploy

Click "Create Web Service" and Render will automatically deploy your backend.

## Using the Backend

Once deployed, update your frontend to use the backend URL:

\`\`\`typescript
// In app/admin/blogs/page.tsx
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

const response = await fetch(`${BACKEND_URL}/api/blogs`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Admin-Key': process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY || '',
  },
  body: JSON.stringify({ title, author, excerpt, image, content }),
})
\`\`\`

## Backend API Endpoints

### Create Blog Post

\`\`\`
POST /api/blogs
Headers:
  X-Admin-Key: your_secret_key
  Content-Type: application/json

Body:
{
  "title": "Blog Title",
  "author": "Author Name",
  "excerpt": "Brief description",
  "image": "/image-url.jpg",
  "content": "Markdown content..."
}

Response:
{
  "message": "Blog post created successfully",
  "post": { ... }
}
\`\`\`

### Get All Blog Posts

\`\`\`
GET /api/blogs

Response:
[
  {
    "slug": "blog-title",
    "title": "Blog Title",
    "author": "Author Name",
    "excerpt": "Brief description",
    "image": "/image-url.jpg",
    "content": "Markdown content...",
    "date": "January 15, 2024"
  },
  ...
]
\`\`\`

### Get Single Blog Post

\`\`\`
GET /api/blogs/:slug

Response:
{
  "slug": "blog-title",
  "title": "Blog Title",
  ...
}
\`\`\`

## Local Development

To test the backend locally:

1. Create a `backend` folder in your project root
2. Initialize Node.js: `npm init -y`
3. Install dependencies: `npm install express cors dotenv`
4. Create `server.js` with the backend code
5. Run: `node server.js`
6. The backend will run on `http://localhost:3001`

## Next Steps

- Add database integration (MongoDB, PostgreSQL, etc.)
- Implement blog post editing and deletion
- Add image upload functionality
- Set up automated backups

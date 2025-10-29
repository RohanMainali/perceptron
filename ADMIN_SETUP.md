# Admin Blog Creation Setup

## Frontend Setup

The admin blog creation page is available at `/admin/blogs` and requires authentication with a secret key.

### Environment Variables

Add the following to your `.env.local` file:

\`\`\`
NEXT_PUBLIC_ADMIN_SECRET_KEY=your_secret_key_here
ADMIN_SECRET_KEY=your_secret_key_here
\`\`\`

**Important:** 
- `NEXT_PUBLIC_ADMIN_SECRET_KEY` is used on the client side for the form
- `ADMIN_SECRET_KEY` is used on the server side for API validation

### Features

- **Live Preview**: See how your blog post will look as you write
- **Markdown Support**: Full markdown support with code blocks, tables, lists, etc.
- **Image Support**: Add images by providing image URLs
- **Metadata**: Add title, author, excerpt, and publication date

## How to Use

1. Navigate to `/admin/blogs`
2. Enter your secret key to authenticate
3. Fill in the blog post details:
   - **Title**: The main heading of your blog post
   - **Author**: Who wrote the post (defaults to "Rohan Mainali")
   - **Excerpt**: A brief summary shown on the blog listing page
   - **Image URL**: URL to the featured image
   - **Content**: Write your blog post in Markdown format
4. Use the preview panel on the right to see how your post will look
5. Click "Publish Blog Post" to save

## Markdown Syntax Examples

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered item
2. Another item

[Link text](https://example.com)

![Image alt text](image-url.jpg)

\`\`\`python
# Code block
print("Hello, World!")
\`\`\`

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |

> Blockquote text
\`\`\`

## Persistence

Currently, blog posts are stored in memory. To persist blog posts across server restarts, you can:

1. **Use a Database**: Connect to a database like Supabase or MongoDB
2. **Use a Backend Service**: Deploy the provided Node.js backend to Render
3. **Use File Storage**: Store blog posts in JSON files

See `BACKEND_SETUP.md` for instructions on setting up a persistent backend.

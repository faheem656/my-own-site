import BlogDetailClient from './BlogDetailClient';
import { getBlogBySlug, getAllBlogs } from '../../data/blogs';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

// Dynamic metadata for each blog post
export async function generateMetadata({ params }) {
  // IMPORTANT: await params in Next.js 15
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const blog = getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found | FN Developers',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${blog.title} | FN Developers Blog`,
    description: blog.excerpt,
    keywords: blog.tags?.join(', ') || '',
    alternates: {
      canonical: `https://fn-developers.com/blog/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
      images: blog.featuredImage ? [{
        url: blog.featuredImage,
        width: 1200,
        height: 630,
        alt: blog.title,
      }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  // IMPORTANT: await params in Next.js 15
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const blog = getBlogBySlug(slug);
  
  return <BlogDetailClient blog={blog} slug={slug} />;
}
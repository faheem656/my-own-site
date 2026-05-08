import BlogClient from './BlogClient';
import { getAllBlogs, getAllCategories } from '../data/blogs';

export const metadata = {
  title: 'Blog | Web Development, Mobile Apps & SEO Tips | FN Developers',
  description: 'Expert insights on web development, mobile app development, SEO, digital marketing, and technology trends. Stay updated with latest tech news.',
  keywords: 'web development blog, mobile app development, SEO tips, digital marketing, React Native, Next.js, WordPress, technology trends',
  alternates: {
    canonical: 'https://fn-developers.com/blog',
  },
  openGraph: {
    title: 'FN Developers Blog | Tech Insights & Digital Tips',
    description: 'Expert articles on web development, mobile apps, SEO, and digital growth strategies.',
    url: 'https://fn-developers.com/blog',
    type: 'website',
    siteName: 'FN Developers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FN Developers Blog | Tech Insights',
    description: 'Expert articles on web development, mobile apps, and SEO.',
  },
};

export default function BlogPage() {
  const allBlogs = getAllBlogs();
  const categories = getAllCategories();
  
  return <BlogClient allBlogs={allBlogs} initialCategories={categories} />;
}
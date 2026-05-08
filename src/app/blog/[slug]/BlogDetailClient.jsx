'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function BlogDetailClient({ blog, slug }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.opacity = '1';
      contentRef.current.style.transform = 'translateY(0)';
    }
  }, []);

  // If blog not found
  if (!blog) {
    return (
      <div className={styles.notFound}>
        <h1>Blog Post Not Found</h1>
        <p>The blog post "{slug}" doesn't exist.</p>
        <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
        <div className={styles.recentPosts}>
          <h3>Recent Posts:</h3>
          <ul>
            <li><Link href="/blog/web-development-cost-pakistan-2025">Web Development Cost in Pakistan</Link></li>
            <li><Link href="/blog/react-native-vs-flutter-2025">React Native vs Flutter 2025</Link></li>
            <li><Link href="/blog/seo-tips-pakistan-business-2025">SEO Tips for Pakistani Businesses</Link></li>
          </ul>
        </div>
      </div>
    );
  }

  // JSON-LD Schema for blog post
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featuredImage,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FN Developers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fn-developers.com/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fn-developers.com/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      
      <div className={styles.blogDetail}>
        <article className={styles.article}>
          <div className={styles.container}>
            <Link href="/blog" className={styles.backLink}>
              ← Back to Blog
            </Link>
            
            <h1 className={styles.title}>{blog.title}</h1>
            
            <div className={styles.meta}>
              <span className={styles.author}>By {blog.author}</span>
              <span className={styles.date}>{blog.date}</span>
              <span className={styles.readTime}>{blog.readTime}</span>
              <span className={styles.category}>{blog.category}</span>
            </div>
            
            {blog.featuredImage && (
              <div className={styles.featuredImage}>
                <Image 
                  src={blog.featuredImage}
                  alt={blog.title}
                  width={800}
                  height={450}
                  className={styles.image}
                  priority
                />
              </div>
            )}
            
            <div 
              ref={contentRef}
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            
            {blog.tags && blog.tags.length > 0 && (
              <div className={styles.tags}>
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
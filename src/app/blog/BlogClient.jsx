'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

const POSTS_PER_PAGE = 6;

export default function BlogClient({ allBlogs, initialCategories }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const categories = initialCategories;

  // Filter blogs based on category
  const filteredBlogs = useMemo(() => {
    if (activeCategory === 'all') {
      return allBlogs;
    }
    return allBlogs.filter(blog => blog.category === activeCategory);
  }, [activeCategory, allBlogs]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  }, [filteredBlogs]);

  // Get current page blogs - Direct, no loading state
  const currentBlogs = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return filteredBlogs.slice(start, end);
  }, [filteredBlogs, currentPage]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // Handle category change
  const handleCategoryChange = (category) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle page change
  const goToPage = (page) => {
    if (page === currentPage) return;
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination numbers
  const getPageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className={styles.blogPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>
            Our <span className={styles.highlight}>Blog</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Expert insights, tutorials, and guides on web development, mobile apps, SEO, and digital growth.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className={styles.categories}>
        <div className={styles.container}>
          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${activeCategory === category ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className={styles.blogGrid}>
        <div className={styles.container}>
          {currentBlogs.length === 0 ? (
            <div className={styles.noPosts}>
              <p>No posts found in this category.</p>
              <p className={styles.noPostsHint}>Try selecting a different category.</p>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {currentBlogs.map((blog) => (
                  <Link 
                    href={`/blog/${blog.slug}`} 
                    key={blog.id} 
                    className={styles.blogCard}
                    prefetch={false} // Only prefetch on hover
                  >
                    <div className={styles.cardImage}>
                      {blog.featuredImage ? (
                        <Image 
                          src={blog.featuredImage}
                          alt={blog.title}
                          width={400}
                          height={250}
                          className={styles.image}
                          loading="lazy" // Lazy load images
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={75} // Reduce quality for faster loading
                        />
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <span>📝</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardMeta}>
                        <span className={styles.category}>{blog.category}</span>
                        <span className={styles.date}>{blog.date}</span>
                      </div>
                      <h2 className={styles.cardTitle}>{blog.title}</h2>
                      <p className={styles.cardExcerpt}>
                        {blog.excerpt?.substring(0, 120)}...
                      </p>
                      <div className={styles.cardFooter}>
                        <span className={styles.readMore}>
                          Read More <span className={styles.readMoreArrow}>→</span>
                        </span>
                        <span className={styles.readTime}>{blog.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.pageBtn}
                  >
                    ← Prev
                  </button>
                  
                  {getPageNumbers.map(page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.pageBtn}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
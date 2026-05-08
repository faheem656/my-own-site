'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

const POSTS_PER_PAGE = 6;

export default function BlogClient({ allBlogs, initialCategories }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  
  const categories = initialCategories;

  // Filter blogs based on category (memoized for performance)
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

  // Get current page blogs
  const currentBlogs = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return filteredBlogs.slice(start, end);
  }, [filteredBlogs, currentPage]);

  // Update displayed blogs with loading animation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDisplayedBlogs(currentBlogs);
      setIsLoading(false);
    }, 150);
    
    return () => clearTimeout(timer);
  }, [currentBlogs]);

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

  // Generate pagination numbers (shows 5 pages max)
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

  // Show skeleton loader on initial load
  if (isLoading && displayedBlogs.length === 0) {
    return (
      <div className={styles.blogPage}>
        <div className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>
              Our <span className={styles.highlight}>Blog</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Loading amazing content for you...
            </p>
          </div>
        </div>
        <div className={styles.loaderGrid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonFooter}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
                disabled={isLoading}
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
          {isLoading ? (
            <div className={styles.loaderGrid}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonText}></div>
                    <div className={styles.skeletonFooter}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayedBlogs.length === 0 ? (
            <div className={styles.noPosts}>
              <p>No posts found in this category.</p>
              <p className={styles.noPostsHint}>Try selecting a different category.</p>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {displayedBlogs.map((blog) => (
                  <Link 
                    href={`/blog/${blog.slug}`} 
                    key={blog.id} 
                    className={styles.blogCard}
                  >
                    <div className={styles.cardImage}>
                      {blog.featuredImage ? (
                        <Image 
                          src={blog.featuredImage}
                          alt={blog.title}
                          width={400}
                          height={250}
                          className={styles.image}
                          loading="lazy"
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
                    disabled={currentPage === 1 || isLoading}
                    className={styles.pageBtn}
                  >
                    ← Prev
                  </button>
                  
                  {getPageNumbers.map(page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                      disabled={isLoading}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
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
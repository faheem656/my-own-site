'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAllBlogs } from '@/app/data/blogs';
import styles from './LatestBlog.module.css';

export default function LatestBlog() {
  const [isClient, setIsClient] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    
    // Get all blogs - only once
    const allBlogs = getAllBlogs();
    
    // Make sure we only take 3 posts
    if (allBlogs && allBlogs.length > 0) {
      // Sort by id descending and take first 3
      const latest = [...allBlogs]
        .sort((a, b) => {
          // Handle both numeric and string IDs
          const idA = typeof a.id === 'number' ? a.id : parseInt(a.id) || 0;
          const idB = typeof b.id === 'number' ? b.id : parseInt(b.id) || 0;
          return idB - idA;
        })
        .slice(0, 3);
      
      setLatestPosts(latest);
    } else {
      setLatestPosts([]);
    }
  }, []);

  useEffect(() => {
    if (!isClient || latestPosts.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    // Set initial states
    gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
      opacity: 0,
      y: 40
    });
    
    // Set each card individually
    cardsRef.current.forEach(card => {
      if (card) {
        gsap.set(card, { opacity: 0, y: 40 });
      }
    });

    // Animate headline
    if (headlineRef.current) {
      gsap.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Animate subheadline
    if (subheadlineRef.current) {
      gsap.to(subheadlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Animate cards with stagger
    if (cardsRef.current.length > 0) {
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Animate CTA button
    if (ctaRef.current) {
      gsap.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient, latestPosts]);

  const handleCardHover = (e, index) => {
    if (!isClient) return;
    
    gsap.to(e.currentTarget, {
      y: -10,
      scale: 1.02,
      boxShadow: "0 30px 40px -15px rgba(255, 0, 0, 0.3)",
      duration: 0.3,
      overwrite: true
    });

    const image = e.currentTarget.querySelector(`.${styles.cardImage}`);
    if (image) {
      gsap.to(image, { scale: 1.05, duration: 0.3, overwrite: true });
    }

    const arrow = e.currentTarget.querySelector(`.${styles.readMoreArrow}`);
    if (arrow) {
      gsap.to(arrow, { x: 5, duration: 0.3, overwrite: true });
    }
  };

  const handleCardLeave = (e) => {
    if (!isClient) return;
    
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: "none",
      duration: 0.3,
      overwrite: true
    });

    const image = e.currentTarget.querySelector(`.${styles.cardImage}`);
    if (image) {
      gsap.to(image, { scale: 1, duration: 0.3, overwrite: true });
    }

    const arrow = e.currentTarget.querySelector(`.${styles.readMoreArrow}`);
    if (arrow) {
      gsap.to(arrow, { x: 0, duration: 0.3, overwrite: true });
    }
  };

  // Don't render anything if no posts
  if (!isClient || latestPosts.length === 0) {
    return null;
  }

  return (
    <section className={styles.latestBlog} ref={sectionRef}>
      {/* Background Decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgGrid}></div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>LATEST INSIGHTS</span>
          <h2 className={styles.headline} ref={headlineRef}>
            From Our <span className={styles.highlight}>Blog</span>
          </h2>
          <p className={styles.subheadline} ref={subheadlineRef}>
            Expert insights, tutorials, and guides on web development, mobile apps, SEO, and digital growth.
          </p>
        </div>

        {/* Blog Cards Grid - Exactly 3 cards */}
        <div className={styles.blogGrid}>
          {latestPosts.slice(0, 3).map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={styles.blogCard}
              ref={el => {
                if (el) cardsRef.current[index] = el;
              }}
              onMouseEnter={(e) => handleCardHover(e, index)}
              onMouseLeave={handleCardLeave}
            >
              {/* Image Container */}
              <div className={styles.cardImageContainer}>
                <div className={styles.cardImageWrapper}>
                  {post.featuredImage ? (
                    <img 
                      src={post.featuredImage}
                      alt={post.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.cardImagePlaceholder}>
                      <span>📝</span>
                    </div>
                  )}
                </div>
                <div className={styles.categoryBadge}>
                  <span>{post.category || 'Blog'}</span>
                </div>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardDate}>{post.date}</span>
                  <span className={styles.cardReadTime}>{post.readTime}</span>
                </div>
                
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardExcerpt}>
                  {post.excerpt ? post.excerpt.substring(0, 120) : 'Read more about this topic...'}...
                </p>
                
                <div className={styles.cardFooter}>
                  <span className={styles.readMore}>
                    Read More
                    <span className={styles.readMoreArrow}>→</span>
                  </span>
                  <span className={styles.authorName}>By {post.author || 'Admin'}</span>
                </div>
              </div>

              {/* Hover Glow */}
              <div className={styles.cardGlow}></div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className={styles.viewAllWrapper} ref={ctaRef}>
          <Link href="/blog" className={styles.viewAllButton}>
            <span>View All Blog Posts</span>
            <span className={styles.viewAllIcon}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
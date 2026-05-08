'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function PortfolioDetailClient({ project, slug }) {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = '1';
      heroRef.current.style.transform = 'translateY(0)';
    }
    
    if (contentRef.current) {
      setTimeout(() => {
        contentRef.current.style.opacity = '1';
        contentRef.current.style.transform = 'translateY(0)';
      }, 200);
    }
  }, []);

  // If project not found
  if (!project) {
    return (
      <div className={styles.notFound}>
        <h1>Project Not Found</h1>
        <p>The project "{slug}" doesn't exist.</p>
        <Link href="/portfolio" className={styles.backLink}>← Back to Portfolio</Link>
        <div className={styles.projectLinks}>
          <h3>Our Projects:</h3>
          <div className={styles.linksGrid}>
            <Link href="/portfolio/mindset-muscle-vip">Mindset & Muscle VIP</Link>
            <Link href="/portfolio/success-work-tech">Success Work Tech</Link>
            <Link href="/portfolio/youthful-dna">YouthfulDNA</Link>
            <Link href="/portfolio/theekaydar">TheekayDar</Link>
          </div>
        </div>
      </div>
    );
  }

  // Format tech stack for display
  const techList = project.techStack?.map(tech => tech.name) || [];

  // Get screenshots for gallery
  const screens = project.screens || [];

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fn-developers.com/' },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://fn-developers.com/portfolio' },
      { '@type': 'ListItem', position: 3, name: project.shortTitle, item: `https://fn-developers.com/portfolio/${slug}` }
    ]
  };

  // Project Schema
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.overview,
    image: project.heroImage,
    author: { '@type': 'Organization', name: 'FN Developers', url: 'https://fn-developers.com' },
    about: { '@type': 'Thing', name: project.category },
    creativeWorkStatus: 'Completed',
    datePublished: project.year ? `${project.year}-01-01` : '2024-01-01'
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />

      <div className={styles.portfolioDetailPage}>
        {/* Hero Section */}
        <section ref={heroRef} className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <span className={styles.heroCategory}>{project.category}</span>
              <h1 className={styles.heroTitle}>{project.title}</h1>
              <p className={styles.heroDescription}>{project.overview}</p>
              <div className={styles.heroMeta}>
                <span className={styles.metaItem}>📱 {project.type}</span>
                <span className={styles.metaItem}>🏆 {project.results}</span>
                <span className={styles.metaItem}>📅 {project.year}</span>
              </div>
              <div className={styles.heroButtons}>
                {project.androidLink && project.androidLink !== '#' && (
                  <Link href={project.androidLink} target="_blank" className={styles.primaryBtn}>
                    📱 Download App →
                  </Link>
                )}
                {project.websiteLink && (
                  <Link href={project.websiteLink} target="_blank" className={styles.secondaryBtn}>
                    🌐 Visit Website →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        {project.heroImage && (
          <section className={styles.heroImageSection}>
            <div className={styles.container}>
              <div className={styles.heroImageWrapper}>
                <Image 
                  src={project.heroImage}
                  alt={project.title}
                  width={1200}
                  height={600}
                  className={styles.heroImage}
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* Content Section */}
        <section ref={contentRef} className={styles.content}>
          <div className={styles.container}>
            <div className={styles.contentGrid}>
              <div className={styles.mainContent}>
                <h2>Project Overview</h2>
                <p>{project.overview}</p>
                
                <h3>Challenge</h3>
                <p>{project.challenge}</p>
                
                <h3>Solution</h3>
                <p>{project.solution}</p>
                
                <h3>Key Features</h3>
                <ul className={styles.featuresList}>
                  {project.features?.map((feature, idx) => (
                    <li key={idx}>
                      <span className={styles.checkMark}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                
                <h3>Technologies Used</h3>
                <div className={styles.techTags}>
                  {techList.map((tech, idx) => (
                    <span key={idx} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className={styles.sidebar}>
                <div className={styles.infoCard}>
                  <h3>Project Details</h3>
                  <ul>
                    <li><strong>Client:</strong> {project.client || project.founder}</li>
                    <li><strong>Founder:</strong> {project.founder}</li>
                    <li><strong>Category:</strong> {project.category}</li>
                    <li><strong>Type:</strong> {project.type}</li>
                    <li><strong>Timeline:</strong> {project.duration}</li>
                    <li><strong>Year:</strong> {project.year}</li>
                    <li><strong>Role:</strong> {project.role}</li>
                  </ul>
                </div>
                
                <div className={styles.resultCard}>
                  <h3>Key Achievement</h3>
                  <div className={styles.resultStat}>
                    <span className={styles.resultNumber}>{project.results}</span>
                    <span className={styles.resultLabel}>Delivered</span>
                  </div>
                </div>

                {project.testimonial && (
                  <div className={styles.testimonialCard}>
                    <h3>Client Testimonial</h3>
                    <p className={styles.testimonialQuote}>"{project.testimonial.quote}"</p>
                    <div className={styles.testimonialAuthor}>
                      <strong>{project.testimonial.author}</strong>
                      <span>{project.testimonial.role}</span>
                    </div>
                  </div>
                )}
                
                <div className={styles.contactCard}>
                  <h3>Want Similar Results?</h3>
                  <p>Let's discuss your project and how we can help your business grow.</p>
                  <Link href="/contact" className={styles.contactBtn}>
                    Start Your Project →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Gallery */}
        {screens.length > 0 && (
          <section className={styles.gallery}>
            <div className={styles.container}>
              <h2 className={styles.galleryTitle}>App Screenshots</h2>
              <div className={styles.galleryGrid}>
                {screens.map((screen, idx) => (
                  <div key={idx} className={styles.galleryItem}>
                    <div className={styles.galleryImageWrapper}>
                      <Image 
                        src={screen.image}
                        alt={screen.name}
                        width={300}
                        height={600}
                        className={styles.galleryImage}
                      />
                    </div>
                    <h4 className={styles.galleryItemTitle}>{screen.name}</h4>
                    <p className={styles.galleryItemDesc}>{screen.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Button */}
        <section className={styles.backSection}>
          <div className={styles.container}>
            <Link href="/portfolio" className={styles.backButton}>
              ← Back to Portfolio
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
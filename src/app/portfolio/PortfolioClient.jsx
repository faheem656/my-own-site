'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function PortfolioClient({ initialProjects, initialCategories }) {
  const [projects] = useState(initialProjects);
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories] = useState(initialCategories);
  const heroRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    // Hero fade in animation
    if (heroRef.current) {
      heroRef.current.style.opacity = '1';
    }
    
    // Cards fade in on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => observer.observe(card));
    
    return () => observer.disconnect();
  }, [filteredProjects]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Smooth scroll to projects
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Filter projects with slight delay for animation
    setTimeout(() => {
      if (category === 'all') {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(projects.filter(p => p.category === category));
      }
    }, 100);
  };

  return (
    <div className={styles.portfolioPage}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Our <span className={styles.highlight}>Portfolio</span>
          </h1>
          <p className={styles.subtitle}>
            Explore our latest projects and see how we've helped businesses 
            achieve remarkable growth through innovative digital solutions.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className={styles.container}>
          <div className={styles.categoryTabs}>
            <button
              className={`${styles.categoryTab} ${activeCategory === 'all' ? styles.active : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              All Projects
            </button>
            {categories.map((category) => (
              category !== 'all' && (
                <button
                  key={category}
                  className={`${styles.categoryTab} ${activeCategory === category ? styles.active : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className={styles.projects}>
        <div className={styles.container}>
          {filteredProjects.length === 0 ? (
            <div className={styles.noProjects}>
              <p>No projects found in "{activeCategory}" category.</p>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project, index) => (
                <Link 
                  href={`/portfolio/${project.slug}`} 
                  key={project.id}
                  className={`project-card ${styles.projectCard}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={styles.projectImage}>
                    <div className={styles.imageWrapper}>
                      {project.heroImage ? (
                        <div className={styles.imageContainer}>
                          <Image 
                            src={project.heroImage}
                            alt={`${project.shortTitle} - ${project.type} project by FN Developers`}
                            width={500}
                            height={280}
                            className={styles.projectImg}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 3}
                          />
                        </div>
                      ) : (
                        <div className={styles.imagePlaceholder}>
                          <span className={styles.projectIcon}>{project.icon || '🚀'}</span>
                        </div>
                      )}
                    </div>
                    <div className={styles.projectOverlay}>
                      <span className={styles.viewProject}>View Case Study</span>
                    </div>
                  </div>
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{project.shortTitle}</h3>
                    <p className={styles.projectCategory}>{project.category}</p>
                    <div className={styles.projectMeta}>
                      <span className={styles.projectType}>{project.type}</span>
                      <span className={styles.projectResult}>{project.results}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
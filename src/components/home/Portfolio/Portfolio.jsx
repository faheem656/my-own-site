'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAllProjects } from '@/app/portfolio/data/projects';  // ✅ Data import
import styles from './Portfolio.module.css';

export default function Portfolio() {
  const [isClient, setIsClient] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [projects, setProjects] = useState([]);
  
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const cardsRef = useRef([]);
  const gridRef = useRef(null);

  // Client-side data loading
  useEffect(() => {
    setIsClient(true);
    // Get first 3 projects for home page
    const allProjects = getAllProjects();
    setProjects(allProjects.slice(0, 3)); // Sirf 3 projects dikhao home page par
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isClient || projects.length === 0) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Headline animation
    gsap.fromTo(headlineRef.current,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Subheadline animation
    gsap.fromTo(subheadlineRef.current,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards staggered animation
    gsap.fromTo(cardsRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cleanup ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient, projects]);

  // Hover animations for cards
  const handleCardHover = (e, index) => {
    if (!isClient) return;
    setHoveredCard(index);
    
    const card = e.currentTarget;
    const image = card.querySelector(`.${styles.cardImage}`);
    const overlay = card.querySelector(`.${styles.cardOverlay}`);
    const techIcons = card.querySelectorAll(`.${styles.techIcon}`);
    const viewBtn = card.querySelector(`.${styles.viewBtn}`);

    // Card lift effect with red glow
    gsap.to(card, {
      y: -15,
      scale: 1.02,
      boxShadow: "0 30px 50px -15px rgba(255, 0, 0, 0.4)",
      duration: 0.4,
      ease: "power2.out"
    });

    // Image zoom effect
    if (image) {
      gsap.to(image, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }

    // Overlay fade in
    if (overlay) {
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }

    // Results badge animation
    const results = card.querySelector(`.${styles.resultsBadge}`);
    if (results) {
      gsap.to(results, {
        scale: 1.1,
        backgroundColor: "#FF0000",
        color: "#FFFFFF",
        duration: 0.3,
        ease: "power2.out"
      });
    }

    // Tech icons animation
    gsap.to(techIcons, {
      y: -3,
      scale: 1.1,
      duration: 0.3,
      stagger: 0.05,
      ease: "back.out(1.2)"
    });

    // View button animation
    if (viewBtn) {
      gsap.to(viewBtn, {
        scale: 1.05,
        backgroundColor: "#FF0000",
        color: "#FFFFFF",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(viewBtn.querySelector(`.${styles.viewBtnIcon}`), {
        x: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleCardLeave = (e, index) => {
    if (!isClient) return;
    setHoveredCard(null);
    
    const card = e.currentTarget;
    const image = card.querySelector(`.${styles.cardImage}`);
    const overlay = card.querySelector(`.${styles.cardOverlay}`);
    const techIcons = card.querySelectorAll(`.${styles.techIcon}`);
    const viewBtn = card.querySelector(`.${styles.viewBtn}`);
    const results = card.querySelector(`.${styles.resultsBadge}`);

    // Reset card
    gsap.to(card, {
      y: 0,
      scale: 1,
      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
      duration: 0.4,
      ease: "power2.out"
    });

    // Reset image
    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }

    // Overlay fade out
    if (overlay) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }

    // Reset results badge
    if (results) {
      gsap.to(results, {
        scale: 1,
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        color: "#FF0000",
        duration: 0.3,
        ease: "power2.out"
      });
    }

    // Reset tech icons
    gsap.to(techIcons, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    // Reset view button
    if (viewBtn) {
      gsap.to(viewBtn, {
        scale: 1,
        backgroundColor: "transparent",
        color: "#FF0000",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(viewBtn.querySelector(`.${styles.viewBtnIcon}`), {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section className={styles.portfolio} ref={sectionRef}>
      {/* Background decoration with red theme */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgGradient1}></div>
        <div className={styles.bgGradient2}></div>
        <div className={styles.bgGrid}></div>
        <div className={styles.bgParticles}></div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>OUR PORTFOLIO</span>
          <h2 className={styles.headline} ref={headlineRef}>
            Success Stories That <span className={styles.highlight}>Inspire</span>
          </h2>
          <p className={styles.subheadline} ref={subheadlineRef}>
            Real results for real businesses. Explore how we've helped our clients 
            achieve remarkable growth through innovative digital solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className={styles.grid} ref={gridRef}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.card} ${hoveredCard === index ? styles.cardHovered : ''}`}
              ref={el => cardsRef.current[index] = el}
              onMouseEnter={(e) => handleCardHover(e, index)}
              onMouseLeave={(e) => handleCardLeave(e, index)}
            >
              {/* Card Image Container */}
              <div className={styles.cardImageContainer}>
                <div className={styles.cardImageWrapper}>
                  <div className={styles.cardImage}>
                    {/* Image or Icon-based placeholder */}
                    {project.heroImage ? (
                      <Image 
                        src={project.heroImage}
                        alt={project.title}
                        width={400}
                        height={225}
                        className={styles.projectImage}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <span className={styles.placeholderIcon}>{project.icon}</span>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className={styles.cardOverlay}>
                      <div className={styles.overlayContent}>
                        <span className={styles.overlayIcon}>🔍</span>
                        <span className={styles.overlayText}>View Case Study</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className={styles.categoryBadge}>
                  {project.category}
                </div>

                {/* Type Badge */}
                <div className={styles.typeBadge}>
                  {project.type}
                </div>
              </div>

              {/* Card Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.shortTitle || project.title}</h3>
                <p className={styles.cardDescription}>{project.overview?.substring(0, 100)}...</p>

                {/* Results Badge */}
                <div className={styles.resultsBadge}>
                  <span className={styles.resultsIcon}>🏆</span>
                  <span className={styles.resultsText}>{project.results}</span>
                </div>

                {/* Tech Stack - First 3 only */}
                <div className={styles.techStack}>
                  {project.techStack?.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className={styles.techIcon}>
                      {typeof tech === 'string' ? tech : tech.name}
                    </span>
                  ))}
                  {project.techStack?.length > 3 && (
                    <span className={styles.techIcon}>+{project.techStack.length - 3}</span>
                  )}
                </div>

                {/* View Project Button */}
                <Link href={`/portfolio/${project.slug}`} className={styles.viewBtn}>
                  <span>Read Case Study</span>
                  <span className={styles.viewBtnIcon}>→</span>
                </Link>
              </div>

              {/* Red Accent Line */}
              <div className={styles.cardAccent}></div>
              
              {/* Glow Effect */}
              <div className={styles.cardGlow}></div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className={styles.viewAllCta}>
          <Link href="/portfolio" className={styles.viewAllBtn}>
            <span>Explore All Projects</span>
            <span className={styles.viewAllIcon}>→</span>
          </Link>
          <p className={styles.viewAllCtaText}>
            Discover how we can help transform your business
          </p>
        </div>
      </div>
    </section>
  );
}
'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Cta.module.css';

export default function Cta() {
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const buttonsRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const secondaryBtnRef = useRef(null);
  const shapesRef = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    setIsClient(true);
    setMounted(true);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);

    // Initial setup
    gsap.set([headlineRef.current, subheadlineRef.current, primaryBtnRef.current, secondaryBtnRef.current], {
      opacity: 0,
      y: 50
    });

    // Headline animation
    gsap.to(headlineRef.current, {
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
    });

    // Subheadline animation
    gsap.to(subheadlineRef.current, {
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
    });

    // Primary button animation
    gsap.to(primaryBtnRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse"
      }
    });

    // Secondary button animation
    gsap.to(secondaryBtnRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.6,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse"
      }
    });

    // Background shapes animation
    if (shapesRef.current.length > 0) {
      shapesRef.current.forEach((shape, index) => {
        if (shape) {
          gsap.to(shape, {
            x: "random(-40, 40)",
            y: "random(-40, 40)",
            rotation: "random(-20, 20)",
            duration: "random(10, 20)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
          });
        }
      });
    }

    // Particles animation
    if (particlesRef.current.length > 0) {
      gsap.to(particlesRef.current, {
        scale: "random(0.6, 1.4)",
        opacity: "random(0.2, 0.6)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });
    }

    // Parallax effect
    gsap.to(sectionRef.current, {
      y: 60,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);

  // Button hover animations
  const handlePrimaryHover = (e) => {
    if (!mounted) return;
    
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 20px 40px -10px #FF0000",
      duration: 0.3,
      ease: "power2.out"
    });

    const icon = e.currentTarget.querySelector(`.${styles.btnIcon}`);
    if (icon) {
      gsap.to(icon, {
        x: 5,
        rotation: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handlePrimaryLeave = (e) => {
    if (!mounted) return;
    
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 15px 30px -8px rgba(255, 0, 0, 0.4)",
      duration: 0.3,
      ease: "power2.out"
    });

    const icon = e.currentTarget.querySelector(`.${styles.btnIcon}`);
    if (icon) {
      gsap.to(icon, {
        x: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleSecondaryHover = (e) => {
    if (!mounted) return;
    
    gsap.to(e.currentTarget, {
      scale: 1.05,
      borderColor: "#FF0000",
      color: "#FF0000",
      boxShadow: "0 20px 40px -10px rgba(255, 0, 0, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });

    const icon = e.currentTarget.querySelector(`.${styles.btnIcon}`);
    if (icon) {
      gsap.to(icon, {
        x: 5,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleSecondaryLeave = (e) => {
    if (!mounted) return;
    
    gsap.to(e.currentTarget, {
      scale: 1,
      borderColor: "rgba(255, 0, 0, 0.3)",
      color: "#FFFFFF",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });

    const icon = e.currentTarget.querySelector(`.${styles.btnIcon}`);
    if (icon) {
      gsap.to(icon, {
        x: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Fixed particle data with red theme
  const particlePositions = [
    { left: '5%', top: '15%', size: 5, color: '#FF0000', delay: '0s' },
    { left: '15%', top: '35%', size: 7, color: '#FF0000', delay: '1s' },
    { left: '25%', top: '65%', size: 4, color: '#FF0000', delay: '2s' },
    { left: '35%', top: '85%', size: 6, color: '#FF0000', delay: '3s' },
    { left: '45%', top: '25%', size: 5, color: '#FF0000', delay: '4s' },
    { left: '55%', top: '45%', size: 8, color: '#FF0000', delay: '5s' },
    { left: '65%', top: '75%', size: 4, color: '#FF0000', delay: '6s' },
    { left: '75%', top: '55%', size: 6, color: '#FF0000', delay: '7s' },
    { left: '85%', top: '25%', size: 5, color: '#FF0000', delay: '8s' },
    { left: '95%', top: '45%', size: 7, color: '#FF0000', delay: '9s' },
    { left: '45%', top: '5%', size: 4, color: '#FF0000', delay: '10s' },
    { left: '75%', top: '95%', size: 6, color: '#FF0000', delay: '11s' },
  ];

  return (
    <section className={styles.cta} ref={sectionRef}>
      {/* Background Shapes */}
      <div className={styles.backgroundShapes}>
        <div 
          className={`${styles.shape} ${styles.shape1}`}
          ref={el => shapesRef.current[0] = el}
        >
          <svg width="250" height="250" viewBox="0 0 250 250">
            <circle cx="125" cy="125" r="100" fill="url(#gradientRed)" opacity="0.15" />
          </svg>
        </div>
        
        <div 
          className={`${styles.shape} ${styles.shape2}`}
          ref={el => shapesRef.current[1] = el}
        >
          <svg width="350" height="350" viewBox="0 0 350 350">
            <rect x="75" y="75" width="200" height="200" rx="50" fill="url(#gradientRed)" opacity="0.1" />
          </svg>
        </div>
        
        <div 
          className={`${styles.shape} ${styles.shape3}`}
          ref={el => shapesRef.current[2] = el}
        >
          <svg width="300" height="300" viewBox="0 0 300 300">
            <path d="M150 30 L270 150 L150 270 L30 150 Z" fill="url(#gradientRed)" opacity="0.08" />
          </svg>
        </div>

        {/* Particles */}
        {mounted && (
          <div className={styles.particles}>
            {particlePositions.map((pos, i) => (
              <div
                key={i}
                className={styles.particle}
                ref={el => particlesRef.current[i] = el}
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: `${pos.size}px`,
                  height: `${pos.size}px`,
                  animationDelay: pos.delay,
                  background: pos.color
                }}
              />
            ))}
          </div>
        )}

        {/* Animated Lines */}
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>

        {/* Gradient Definitions */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <linearGradient id="gradientRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF0000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#CC0000" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className={styles.container}>
        {/* Content */}
        <div className={styles.content}>
          <span className={styles.preHeadline}>LET'S WORK TOGETHER</span>
          
          <h2 className={styles.headline} ref={headlineRef}>
            Ready to Transform Your <span className={styles.highlight}>Business?</span>
          </h2>
          
          <p className={styles.subheadline} ref={subheadlineRef}>
            Take the first step towards digital excellence. Our team is ready to 
            turn your vision into reality with innovative solutions that drive growth.
          </p>

          <div className={styles.buttonGroup} ref={buttonsRef}>
            {/* Primary CTA */}
           <Link href="/contact">
            <button
              className={styles.primaryBtn}
              ref={primaryBtnRef}
              onMouseEnter={handlePrimaryHover}
              onMouseLeave={handlePrimaryLeave}
            >
              <span className={styles.btnText}>Start Your Journey</span>
              <span className={styles.btnIcon}>→</span>
              <span className={styles.btnGlow}></span>
            </button>
            </Link>

            {/* Secondary CTA */}
            <Link href="/portfolio">
              <button
                className={styles.secondaryBtn}
                ref={secondaryBtnRef}
                onMouseEnter={handleSecondaryHover}
                onMouseLeave={handleSecondaryLeave}
              >
                <span className={styles.btnText}>Explore Our Work</span>
                <span className={styles.btnIcon}>→</span>
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>✓</span>
              <span className={styles.trustText}>Free Consultation</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>⚡</span>
              <span className={styles.trustText}>24-48h Response</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🔒</span>
              <span className={styles.trustText}>100% Confidential</span>
            </div>
          </div>
        </div>

        {/* Stats Counter */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>150+</span>
            <span className={styles.statLabel}>Projects Delivered</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Happy Clients</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Success Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const mockupRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const mockupWrapperRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isClient) return;

    // Create a timeline for animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Initial setup
    gsap.set([headlineRef.current, subheadlineRef.current, ctaGroupRef.current, mockupWrapperRef.current], {
      opacity: 0,
      y: 30
    });

    // Main timeline animations
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
    })
    .to(subheadlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, "-=0.6")
    .to(ctaGroupRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, "-=0.4")
    .to(mockupWrapperRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "back.out(1.2)"
    }, "-=0.8");

    // Floating animation for mockup
    gsap.to(`.${styles.mockupImage}`, {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Scroll parallax effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          y: scrolled * 0.3,
          duration: 0.1,
          ease: "none",
          overwrite: 'auto'
        });
      }
      if (mockupRef.current) {
        gsap.to(mockupRef.current, {
          y: scrolled * 0.2,
          duration: 0.1,
          ease: "none",
          overwrite: 'auto'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient]);

  // Hover effects for buttons using GSAP
  const handlePrimaryHover = (e) => {
    if (!isClient) return;
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 20px 30px -10px #FF0000",
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(e.currentTarget.querySelector(`.${styles.arrowIcon}`), {
      x: 5,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handlePrimaryLeave = (e) => {
    if (!isClient) return;
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 10px 20px -5px rgba(255, 0, 0, 0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(e.currentTarget.querySelector(`.${styles.arrowIcon}`), {
      x: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSecondaryHover = (e) => {
    if (!isClient) return;
    gsap.to(e.currentTarget, {
      scale: 1.05,
      borderColor: "#FF0000",
      color: "#FF0000",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSecondaryLeave = (e) => {
    if (!isClient) return;
    gsap.to(e.currentTarget, {
      scale: 1,
      borderColor: "#FF0000",
      color: "#FF0000",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Animated background lines */}
      <div className={styles.backgroundLines}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>

      {/* Decorative gradient orbs - Red Theme */}
      <div className={styles.glowOrb1}></div>
      <div className={styles.glowOrb2}></div>
      <div className={styles.glowOrb3}></div>

      {/* Soft red shapes */}
      <div className={styles.pastelShape1}></div>
      <div className={styles.pastelShape2}></div>
      <div className={styles.pastelShape3}></div>

      <div className={styles.container}>
        {/* Left Column - Content */}
        <div className={styles.content} ref={textRef}>
          <div className={styles.tagline} ref={headlineRef}>
            <span className={styles.taglineText}>FN DEVELOPERS</span>
            <span className={styles.taglineDot}></span>
          </div>
          
          <h1 className={styles.headline} ref={headlineRef}>
            We Don't Just Build <span className={styles.redText}>Products</span><br />
            We Build <span className={styles.highlight}>Businesses</span>
          </h1>
          
          <h2 className={styles.subheadline} ref={subheadlineRef}>
            Transforming ideas into powerful digital solutions that drive growth, 
            engage customers, and maximize your ROI. Your success is our mission.
          </h2>

          <div className={styles.ctaGroup} ref={ctaGroupRef}>
           <Link href={'/contact'}>
            <button 
              className={styles.primaryCta}
              onMouseEnter={handlePrimaryHover}
              onMouseLeave={handlePrimaryLeave}
            >
              Start Your Journey
              <span className={styles.arrowIcon}>→</span>
            </button>
            </Link>
            
            <Link href="/portfolio">
              <button 
                className={styles.secondaryCta}
                onMouseEnter={handleSecondaryHover}
                onMouseLeave={handleSecondaryLeave}
              >
                View Our Work
              </button>
            </Link>
          </div>

          {/* Stats/Trust Badges */}
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
              <span className={styles.statLabel}>Client Retention</span>
            </div>
          </div>
        </div>

        {/* Right Column - Mockup */}
        <div className={styles.mockupWrapper} ref={mockupWrapperRef}>
          <div className={styles.mockupContainer} ref={mockupRef}>
            {/* Main Dashboard Mockup */}
            <div className={styles.mockupImage}>
              <div className={styles.dashboard}>
                {/* Dashboard Header */}
                <div className={styles.dashboardHeader}>
                  <div className={styles.dashboardDots}>
                    <span className={styles.redDot}></span>
                    <span className={styles.whiteDot}></span>
                    <span className={styles.blackDot}></span>
                  </div>
                  <div className={styles.dashboardTitle}>BUSINESS DASHBOARD</div>
                </div>

                {/* Dashboard Content */}
                <div className={styles.dashboardContent}>
                  {/* Stats Cards */}
                  <div className={styles.dashboardStats}>
                    <div className={styles.statCard}>
                      <div className={styles.statCardIcon}>📈</div>
                      <div className={styles.statCardInfo}>
                        <span className={styles.statCardValue}>+156%</span>
                        <span className={styles.statCardLabel}>Revenue Growth</span>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statCardIcon}>👥</div>
                      <div className={styles.statCardInfo}>
                        <span className={styles.statCardValue}>45k</span>
                        <span className={styles.statCardLabel}>New Users</span>
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statCardIcon}>💼</div>
                      <div className={styles.statCardInfo}>
                        <span className={styles.statCardValue}>$2.5M</span>
                        <span className={styles.statCardLabel}>Client Revenue</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart Area with Red Gradient */}
                  <div className={styles.chartArea}>
                    <div className={styles.chartBar} style={{height: '60%'}}></div>
                    <div className={styles.chartBar} style={{height: '80%'}}></div>
                    <div className={styles.chartBar} style={{height: '40%'}}></div>
                    <div className={styles.chartBar} style={{height: '70%'}}></div>
                    <div className={styles.chartBar} style={{height: '90%'}}></div>
                    <div className={styles.chartBar} style={{height: '50%'}}></div>
                  </div>

                  {/* Activity List */}
                  <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                      <span className={styles.activityDot} style={{background: '#FF0000'}}></span>
                      <span>New project: E-commerce platform</span>
                      <span className={styles.activityTime}>2 min ago</span>
                    </div>
                    <div className={styles.activityItem}>
                      <span className={styles.activityDot} style={{background: '#FF0000'}}></span>
                      <span>Client milestone: 100k users</span>
                      <span className={styles.activityTime}>15 min ago</span>
                    </div>
                    <div className={styles.activityItem}>
                      <span className={styles.activityDot} style={{background: '#FF0000'}}></span>
                      <span>Campaign success: +300% engagement</span>
                      <span className={styles.activityTime}>1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements with Red Theme */}
            <div className={styles.floatingElement1}>
              <span>🚀</span>
            </div>
            <div className={styles.floatingElement2}>
              <span>💡</span>
            </div>
            <div className={styles.floatingElement3}>
              <span>⚡</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
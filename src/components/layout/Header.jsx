'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import styles from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const ctaRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isActive = (path) => pathname === path;

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations
  useEffect(() => {
    // Logo animation
    gsap.fromTo(logoRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "back.out(1.2)"
      }
    );

    // Nav links animation
    gsap.fromTo(navLinksRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    // CTA button animation
    gsap.fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.4,
        ease: "back.out(1.2)"
      }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current,
        { x: "100%" },
        {
          x: "0%",
          duration: 0.5,
          ease: "power2.out"
        }
      );
      
      // Animate mobile menu items
      const mobileLinks = mobileMenuRef.current.querySelectorAll(`.${styles.mobileLink}, .${styles.mobileCta}`);
      gsap.fromTo(mobileLinks,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          delay: 0.2,
          ease: "power2.out"
        }
      );
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
    };
  }, [mobileMenuOpen]);

  // Hover animations for nav links
  const handleNavHover = (e) => {
    gsap.to(e.currentTarget, {
      y: -2,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleNavLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  // Hover animation for CTA button
  const handleCtaHover = () => {
    gsap.to(ctaRef.current, {
      scale: 1.05,
      boxShadow: "0 10px 30px -5px rgba(255, 0, 0, 0.4)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCtaLeave = () => {
    gsap.to(ctaRef.current, {
      scale: 1,
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const closeMobileMenu = () => {
    // Animate out before closing
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setMobileMenuOpen(false)
      });
    } else {
      setMobileMenuOpen(false);
    }
  };

  // Navigation items array with Home included
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <header 
        className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} 
        ref={headerRef}
      >
        <div className={`${styles.container} container`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} ref={logoRef}>
            <div className={styles.logoWrapper}>
              <Image 
                src="/images/logo.svg"
                alt="FN Developers"
                width={120}
                height={40}
                className={styles.logoImage}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            {navItems.map((item, index) => {
              const href = item.href;
              return (
                <Link
                  key={item.name}
                  href={href}
                  className={`${styles.navLink} ${isActive(href) ? styles.active : ''}`}
                  ref={el => navLinksRef.current[index] = el}
                  onMouseEnter={handleNavHover}
                  onMouseLeave={handleNavLeave}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link href="/contact">
            <button 
              className={styles.cta}
              ref={ctaRef}
              onMouseEnter={handleCtaHover}
              onMouseLeave={handleCtaLeave}
            >
              <span>Free Consultation</span>
              <span className={styles.ctaIcon}>→</span>
            </button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className={`${styles.menuToggle} ${mobileMenuOpen ? styles.menuToggleActive : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuActive : ''}`}
        ref={mobileMenuRef}
      >
        <div className={styles.mobileMenuHeader}>
          <Link href="/" className={styles.mobileMenuLogo} onClick={closeMobileMenu}>
            <Image 
              src="/images/logo.svg"
              alt="FN Developers"
              width={100}
              height={35}
              className={styles.mobileLogoImage}
            />
          </Link>
          
          <button 
            className={styles.mobileMenuClose}
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className={styles.mobileMenuContent}>
          {navItems.map((item) => {
            const href = item.href;
            return (
              <Link
                key={item.name}
                href={href}
                className={`${styles.mobileLink} ${isActive(href) ? styles.active : ''}`}
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Mobile CTA */}
          <Link href="/contact">
            <button className={styles.mobileCta} onClick={closeMobileMenu}>
              <span>Free Consultation</span>
              <span className={styles.mobileCtaIcon}>→</span>
            </button>
          </Link>
        </div>

        {/* Mobile Menu Footer */}
        <div className={styles.mobileMenuFooter}>
          <div className={styles.mobileSocial}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.mobileSocialIcon}>f</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.mobileSocialIcon}>ig</a>
            <a href="https://www.linkedin.com/company/fndevelopers/" target="_blank" rel="noopener noreferrer" className={styles.mobileSocialIcon}>in</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.mobileSocialIcon}>X</a>
          </div>
        </div>
      </div>
    </>
  );
}
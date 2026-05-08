"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  const footerRef = useRef(null);
  const footerInfoRef = useRef(null);
  const footerNavRefs = useRef([]);
  const footerConnectRef = useRef(null);
  const footerBottomRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      // Footer info animation
      if (footerInfoRef.current) {
        gsap.fromTo(
          footerInfoRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
          },
        );
      }

      // Footer nav sections animation
      footerNavRefs.current.forEach((nav, index) => {
        if (nav) {
          gsap.fromTo(
            nav,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15,
              scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
            },
          );
        }
      });

      // Footer connect animation
      if (footerConnectRef.current) {
        gsap.fromTo(
          footerConnectRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
          },
        );
      }

      // Footer bottom animation
      if (footerBottomRef.current) {
        gsap.fromTo(
          footerBottomRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
          },
        );
      }

      // Background shapes animation
      shapesRef.current.forEach((shape, index) => {
        if (shape) {
          gsap.to(shape, {
            x: "random(-25, 25)",
            y: "random(-25, 25)",
            rotation: "random(-15, 15)",
            duration: "random(12, 25)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5,
          });
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Social icon hover animation
  const handleSocialHover = (e, color) => {
    gsap.to(e.currentTarget, {
      scale: 1.2,
      backgroundColor: color,
      color: "#FFFFFF",
      boxShadow: `0 10px 25px -5px ${color}80`,
      duration: 0.3,
      ease: "back.out(1.2)",
    });
  };

  const handleSocialLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: "transparent",
      color: "#FFFFFF",
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Link hover animation
  const handleLinkHover = (e) => {
    gsap.to(e.currentTarget, {
      x: 5,
      color: "#FF0000",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      color: "rgba(255, 255, 255, 0.7)",
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <footer className={styles.footer} ref={footerRef}>
      {/* Background decoration */}
      <div className={styles.bgDecoration}>
        <div
          className={styles.shape1}
          ref={(el) => (shapesRef.current[0] = el)}
        ></div>
        <div
          className={styles.shape2}
          ref={(el) => (shapesRef.current[1] = el)}
        ></div>
        <div
          className={styles.shape3}
          ref={(el) => (shapesRef.current[2] = el)}
        ></div>
        <div className={styles.grid}></div>
        <div className={styles.particles}></div>
      </div>

      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Logo & Company Info */}
          <div className={styles.footerInfo} ref={footerInfoRef}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoWrapper}>
                <Image
                  src="/images/logo.svg"
                  alt="FN Developers"
                  width={160}
                  height={60}
                  className={styles.logoImage}
                  priority
                />
              </div>
            </Link>
            <p className={styles.footerDescription}>
              We transform ideas into powerful digital solutions that drive
              growth, engage customers, and maximize ROI. Your success is our
              mission.
            </p>
            <div className={styles.footerContact}>
              <div className={styles.footerContactItem}>
                <span className={styles.contactIcon}>📧</span>
                <a href="mailto:info@fn-developers.com">
                  info@fn-developers.com
                </a>
              </div>
              <div className={styles.footerContactItem}>
                <span className={styles.contactIcon}>📞</span>
                <a href="tel:+923001234567">+92 318 0445585</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={styles.footerNav}
            ref={(el) => (footerNavRefs.current[0] = el)}
          >
            <h4 className={styles.footerNavTitle}>Quick Links</h4>
            <Link href="/services" className={styles.footerLink}>
              Services
            </Link>
            <Link href="/portfolio" className={styles.footerLink}>
              Portfolio
            </Link>
            <Link href="/about" className={styles.footerLink}>
              About
            </Link>
            <Link href="/contact" className={styles.footerLink}>
              Contact
            </Link>
            <Link href="/blog" className={styles.footerLink}>
              Blog
            </Link>
          </div>

          {/* Our Services */}
          <div
            className={styles.footerNav}
            ref={(el) => (footerNavRefs.current[1] = el)}
          >
            <h4 className={styles.footerNavTitle}>Our Services</h4>
            <Link
              href="/services/web-development"
              className={styles.footerLink}
            >
              Web Development
            </Link>
            <Link
              href="/services/mobile-app-development"
              className={styles.footerLink}
            >
              Mobile App Development
            </Link>
            <Link
              href="/services/social-media-management"
              className={styles.footerLink}
            >
              Social Media Management
            </Link>
            <Link href="/services/ui-ux-design" className={styles.footerLink}>
              UI/UX Design
            </Link>
            <Link
              href="/services/seo-digital-marketing"
              className={styles.footerLink}
            >
              SEO & Digital Marketing
            </Link>
          </div>

          {/* Connect Section */}
          <div className={styles.footerConnect} ref={footerConnectRef}>
            <h4 className={styles.footerNavTitle}>Connect With Us</h4>
            <p className={styles.connectText}>
              Follow us on social media for the latest updates and insights.
            </p>
            <div className={styles.socialIcons}>
              <a
                href="https://www.facebook.com/fndevelopersofficiall"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                onMouseEnter={(e) => handleSocialHover(e, "#1877F2")}
                onMouseLeave={handleSocialLeave}
                aria-label="Facebook"
              >
                <span>f</span>
              </a>
              {/* <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                onMouseEnter={(e) => handleSocialHover(e, '#E4405F')}
                onMouseLeave={handleSocialLeave}
                aria-label="Instagram"
              >
                <span>ig</span>
              </a> */}
              <a
                href="https://www.linkedin.com/company/fndevelopersofficiall"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                onMouseEnter={(e) => handleSocialHover(e, "#0A66C2")}
                onMouseLeave={handleSocialLeave}
                aria-label="LinkedIn"
              >
                <span>in</span>
              </a>
              {/* <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                onMouseEnter={(e) => handleSocialHover(e, '#000000')}
                onMouseLeave={handleSocialLeave}
                aria-label="Twitter"
              >
                <span>X</span>
              </a> */}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom} ref={footerBottomRef}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} FN Developers. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

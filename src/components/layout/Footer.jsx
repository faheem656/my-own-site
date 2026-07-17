"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  // Social icon hover simple effect (CSS se handle hoga, no GSAP)
  return (
    <footer className={styles.footer}>
      {/* Background decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
        <div className={styles.grid}></div>
        <div className={styles.particles}></div>
      </div>

      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Logo & Company Info */}
          <div className={styles.footerInfo}>
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
          <div className={styles.footerNav}>
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
          <div className={styles.footerNav}>
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
          <div className={styles.footerConnect}>
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
                aria-label="Facebook"
              >
                <span>f</span>
              </a>
              <a
                href="https://www.linkedin.com/company/fndevelopersofficiall"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn"
              >
                <span>in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} FN Developers. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

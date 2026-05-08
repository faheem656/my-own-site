'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ServiceDetailClient({ service, slug }) {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      heroRef.current.style.opacity = '1';
      heroRef.current.style.transform = 'translateY(0)';
    }
    
    // Content fade in animation
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.animate-on-scroll');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });
      
      elements.forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }
  }, []);

  // If service not found
  if (!service) {
    return (
      <div className={styles.notFound}>
        <h1>404</h1>
        <p>Service "{slug}" not found</p>
        <Link href="/services" className={styles.backLink}>← Back to Services</Link>
        <div className={styles.serviceLinks}>
          <h3>Our Services:</h3>
          <div className={styles.linksGrid}>
            <Link href="/services/web-development">Web Development</Link>
            <Link href="/services/mobile-app-development">Mobile App Development</Link>
            <Link href="/services/social-media-management">Social Media Management</Link>
            <Link href="/services/ui-ux-design">UI/UX Design</Link>
            <Link href="/services/seo-digital-marketing">SEO & Digital Marketing</Link>
            <Link href="/services/support-maintenance">Support & Maintenance</Link>
          </div>
        </div>
      </div>
    );
  }

  // Generate FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs?.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    })) || []
  };

  // Generate Service Schema for SEO
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDesc,
    provider: {
      '@type': 'Organization',
      name: 'FN Developers',
      url: 'https://fn-developers.com'
    },
    serviceType: service.title,
    url: `https://fn-developers.com/services/${slug}`
  };

  return (
    <>
      {/* JSON-LD Schemas for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className={styles.serviceDetailPage}>
        {/* Hero Section */}
        <section ref={heroRef} className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroIcon}>{service.icon}</div>
            <h1 className={styles.heroTitle}>{service.title}</h1>
            <p className={styles.heroShortDesc}>{service.shortDesc}</p>
            <p className={styles.heroTagline}>{service.tagline}</p>
            <div className={styles.heroButtons}>
              <Link href="/contact" className={styles.primaryBtn}>
                Get Started <span>→</span>
              </Link>
              <Link href="/portfolio" className={styles.secondaryBtn}>
                View Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className={styles.content} ref={contentRef}>
          <div className={styles.container}>
            <div className={styles.contentGrid}>
              {/* Main Content */}
              <div className={styles.mainContent}>
                <h2>About This Service</h2>
                {service.fullDescription && (
                  <p>{service.fullDescription}</p>
                )}
                
                <h3>What We Offer</h3>
                <ul className={styles.featuresList}>
                  {service.features?.map((feature, idx) => (
                    <li key={idx} className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(20px)', transition: `all 0.3s ease ${idx * 0.05}s` }}>
                      <span className={styles.checkMark}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Sidebar */}
              <div className={styles.sidebar}>
                <div className={styles.techCard}>
                  <h3>Technologies</h3>
                  <div className={styles.techTags}>
                    {service.techStack?.map((tech, idx) => (
                      <span key={idx} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.benefitsCard}>
                  <h3>Why Choose Us</h3>
                  <ul>
                    {service.benefits?.map((benefit, idx) => (
                      <li key={idx}>
                        <span className={styles.checkMark}>✓</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.contactCard}>
                  <h3>Ready to Start?</h3>
                  <p>Let's discuss your project requirements and how we can help you achieve your goals.</p>
                  <Link href="/contact" className={styles.contactCardBtn}>
                    Free Consultation →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {service.faqs && service.faqs.length > 0 && (
          <section className={styles.faq}>
            <div className={styles.container}>
              <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
              <div className={styles.faqGrid}>
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className={styles.faqItem}>
                    <h3 className={styles.faqQuestion}>{faq.q}</h3>
                    <p className={styles.faqAnswer}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className={styles.pageCta}>
          <div className={styles.container}>
            <h2>Ready to Transform Your Business?</h2>
            <p>Contact us today for a free consultation and project estimate.</p>
            <Link href="/contact" className={styles.ctaButton}>
              Start Your Project <span>→</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
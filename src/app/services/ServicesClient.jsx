'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

const processSteps = [
  { number: "01", title: "Discovery", description: "We dive deep into your business goals, target audience, and project requirements to create a tailored strategy." },
  { number: "02", title: "Planning", description: "We create detailed project plans, wireframes, and technical architecture to ensure smooth development." },
  { number: "03", title: "Development", description: "Our team builds your solution using agile methodology, with regular updates and transparent communication." },
  { number: "04", title: "Testing", description: "Rigorous testing ensures your product is bug-free, secure, and performs optimally across all devices." },
  { number: "05", title: "Launch", description: "We handle deployment and ensure a smooth launch, providing training and documentation as needed." },
  { number: "06", title: "Growth", description: "Post-launch support and continuous optimization to help your business grow and succeed." }
];

const whyUsStats = [
  { number: "5+", label: "Years Experience" },
  { number: "50+", label: "Projects Done" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "24/7", label: "Support" }
];

const whyUsBenefits = [
  "5+ years of industry experience",
  "50+ successful projects delivered",
  "Dedicated project managers",
  "Transparent communication",
  "Post-launch support & maintenance",
  "Competitive pricing"
];

export default function ServicesClient({ initialServices }) {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const whyUsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Services cards animation
    gsap.fromTo('.service-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Process cards animation
    gsap.fromTo('.process-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Why Us animation
    gsap.fromTo(whyUsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: whyUsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // CTA animation
    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>OUR SERVICES</span>
            <h1 className={styles.heroTitle}>
              Digital Solutions That <span className={styles.highlight}>Drive Growth</span>
            </h1>
            <p className={styles.heroSubtitle}>
              From concept to launch and beyond, we provide comprehensive digital services 
              that help businesses thrive in the modern digital landscape.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/contact" className={styles.primaryBtn}>
                Start Your Project <span>→</span>
              </Link>
              <Link href="/portfolio" className={styles.secondaryBtn}>
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={styles.services} ref={servicesRef}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              What We <span className={styles.highlight}>Offer</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {initialServices.map((service) => (
              <Link 
                key={service.id}
                href={`/services/${service.slug}`}
                className={`service-card ${styles.serviceCard}`}
              >
                <div className={styles.cardIcon}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardTagline}>{service.shortDesc}</p>
                <p className={styles.cardDescription}>{service.tagline}</p>
                <div className={styles.cardArrow}>
                  Learn More <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.process} ref={processRef}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Our <span className={styles.highlight}>Process</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            A proven methodology that ensures successful project delivery
          </p>

          <div className={styles.processGrid}>
            {processSteps.map((step, index) => (
              <div key={index} className={`process-card ${styles.processCard}`}>
                <div className={styles.processNumber}>{step.number}</div>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyUs} ref={whyUsRef}>
        <div className={styles.container}>
          <div className={styles.whyUsGrid}>
            <div className={styles.whyUsLeft}>
              <span className={styles.whyUsTag}>WHY CHOOSE US</span>
              <h2 className={styles.whyUsTitle}>
                We're More Than Just <span className={styles.highlight}>Developers</span>
              </h2>
              <p className={styles.whyUsText}>
                We're your strategic partners in digital success. Our team combines technical expertise 
                with business acumen to deliver solutions that drive real results.
              </p>
              <ul className={styles.whyUsList}>
                {whyUsBenefits.map((benefit, index) => (
                  <li key={index}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.whyUsRight}>
              <div className={styles.statsGrid}>
                {whyUsStats.map((stat, index) => (
                  <div key={index} className={styles.statCard}>
                    <span className={styles.statNumber}>{stat.number}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} ref={ctaRef}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Business?</h2>
            <p className={styles.ctaText}>
              Let's discuss how our services can help you achieve your goals.
            </p>
            <Link href="/contact" className={styles.ctaButton}>
              Get Free Consultation <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
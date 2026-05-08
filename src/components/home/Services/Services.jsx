'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

export default function Services() {
  const [isClient, setIsClient] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isClient) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(cardsRef.current, {
      opacity: 0,
      y: 50
    });

    gsap.fromTo(headlineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );

    gsap.fromTo(subheadlineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );

    gsap.to(cardsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.2)",
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
    });

    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, scrollTrigger: { trigger: ctaRef.current, start: "top 85%" } }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  const handleCardHover = (e, index) => {
    if (!isClient) return;
    setHoveredCard(index);
    
    gsap.to(e.currentTarget, {
      y: -10,
      scale: 1.02,
      boxShadow: "0 30px 40px -15px rgba(255, 0, 0, 0.3)",
      duration: 0.3
    });

    const icon = e.currentTarget.querySelector(`.${styles.cardIcon}`);
    if (icon) {
      gsap.to(icon, { scale: 1.1, rotate: 5, duration: 0.3 });
    }

    const features = e.currentTarget.querySelectorAll(`.${styles.featureItem}`);
    gsap.to(features, { x: 5, duration: 0.3, stagger: 0.05 });
  };

  const handleCardLeave = (e) => {
    if (!isClient) return;
    setHoveredCard(null);
    
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      duration: 0.3
    });

    const icon = e.currentTarget.querySelector(`.${styles.cardIcon}`);
    if (icon) {
      gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3 });
    }

    const features = e.currentTarget.querySelectorAll(`.${styles.featureItem}`);
    gsap.to(features, { x: 0, duration: 0.3 });
  };

  // 6 Services Data
  const services = [
    {
      icon: "💻",
      title: "Web Development",
      description: "Build powerful, scalable web applications that drive business growth and deliver exceptional user experiences.",
      features: ["Custom Web Apps", "E-commerce Solutions", "SaaS Platforms", "API Development"],
      link: "/services/web-development"
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Create engaging mobile experiences that connect with your audience and generate real business value.",
      features: ["iOS & Android Apps", "React Native", "Cross-platform", "App Store Optimization"],
      link: "/services/mobile-app-development"
    },
    {
      icon: "📊",
      title: "Social Media Management",
      description: "Grow your brand presence and engage with customers through strategic social media campaigns.",
      features: ["Content Strategy", "Paid Advertising", "Analytics & Reporting", "Community Management"],
      link: "/services/social-media-management"
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Design intuitive, beautiful interfaces that users love and that convert visitors into customers.",
      features: ["User Research", "Wireframing", "Interactive Prototypes", "Brand Identity"],
      link: "/services/ui-ux-design"
    },
    {
      icon: "🔍",
      title: "SEO & Digital Marketing",
      description: "Improve your online visibility and attract more customers through strategic digital marketing.",
      features: ["SEO Optimization", "Content Marketing", "PPC Advertising", "Analytics Tracking"],
      link: "/services/seo-digital-marketing"
    },
    {
      icon: "⚙️",
      title: "Support & Maintenance",
      description: "Keep your applications running smoothly with our comprehensive support and maintenance services.",
      features: ["24/7 Monitoring", "Security Updates", "Bug Fixes", "Performance Optimization"],
      link: "/services/support-maintenance"
    }
  ];

  return (
    <section className={styles.services} ref={sectionRef}>
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
        <div className={styles.bgGrid}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionTag}>WHAT WE DO</span>
          <h2 className={styles.headline} ref={headlineRef}>
            Transforming Ideas Into <span className={styles.highlight}>Digital Excellence</span>
          </h2>
          <p className={styles.subheadline} ref={subheadlineRef}>
            We deliver comprehensive digital solutions that help businesses grow, 
            innovate, and succeed in today's competitive landscape.
          </p>
        </div>

        {/* Services Grid - 6 Cards */}
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`${styles.card} ${hoveredCard === index ? styles.cardHovered : ''}`}
              ref={el => cardsRef.current[index] = el}
              onMouseEnter={(e) => handleCardHover(e, index)}
              onMouseLeave={handleCardLeave}
            >
              <div className={styles.cardAccent} style={{ background: '#FF0000' }}></div>
              
              <div className={styles.cardIconWrapper}>
                <div className={styles.cardIconBg} style={{ background: 'linear-gradient(135deg, #FF0000, #CC0000)' }}>
                  <span className={styles.cardIcon}>{service.icon}</span>
                </div>
              </div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>

              <ul className={styles.featuresList}>
                {service.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <span className={styles.featureDot}></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={service.link} className={styles.learnMore}>
                <span>Learn More</span>
                <span className={styles.learnMoreIcon}>→</span>
              </Link>

              <div className={styles.cardGlow} style={{ background: 'radial-gradient(circle at 50% 50%, #FF000015, transparent 70%)' }}></div>
            </div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className={styles.viewAllWrapper} ref={ctaRef}>
          <Link href="/services" className={styles.viewAllButton}>
            <span>View All Services</span>
            <span className={styles.viewAllIcon}>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
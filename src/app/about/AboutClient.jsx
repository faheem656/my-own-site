'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './page.module.css';

// Company values
const values = [
  {
    icon: "🎯",
    title: "Excellence",
    description: "We strive for excellence in every project, delivering high-quality solutions that exceed client expectations."
  },
  {
    icon: "🤝",
    title: "Partnership",
    description: "We build lasting relationships with our clients, working as true partners in their success journey."
  },
  {
    icon: "💡",
    title: "Innovation",
    description: "We embrace cutting-edge technologies to solve complex problems and create exceptional digital experiences."
  },
  {
    icon: "🔒",
    title: "Trust",
    description: "We operate with transparency and integrity, building trust through reliable delivery and clear communication."
  }
];

// ✅ Updated Team Members Data - Faheem Ejaz as Founder & Senior Developer
const team = [
  {
    name: "Faheem Ejaz",
    role: "Founder & Senior Developer",
    bio: "Founder and Senior Developer with 3+ years of experience in React Native, Next.js, Node.js, and WordPress. Leads technical architecture, development, and company vision at FN Developers. Specializes in building cross-platform mobile apps and scalable web applications.",
    initials: "FE",
    expertise: ["React Native", "Next.js", "Node.js", "WordPress", "Mobile Apps", "API Development"],
    social: {
      linkedin: "https://www.linkedin.com/in/faheem-ejaz-custom-website-developor/",
    }
  },
  {
    name: "Naeem Ejaz",
    role: "CEO & Team Leader",
    bio: "Strategic leader with 5+ years of experience in project management, business development, and team leadership. Drives company vision, client success, and ensures timely delivery of all projects.",
    initials: "NE",
    expertise: ["Project Management", "Business Development", "Client Relations", "Strategy", "Quality Assurance"],
    social: {}
  },
  {
    name: "Akhtar Ali",
    role: "Social Media Manager",
    bio: "Digital marketing expert specializing in social media growth, content strategy, community management, and paid advertising. Drives brand engagement, audience growth, and measurable ROI for clients.",
    initials: "AA",
    expertise: ["Social Media", "Content Strategy", "SEO", "Paid Ads", "Analytics", "Community Management"],
    social: {}
  }
];

// Stats data
const statsData = [
  { number: "80+", label: "Projects Completed", suffix: "" },
  { number: "45+", label: "Happy Clients", suffix: "" },
  { number: "98%", label: "Client Satisfaction", suffix: "" },
  { number: "24/7", label: "Support Available", suffix: "" }
];

export default function AboutClient() {
  const [isClient, setIsClient] = useState(false);
  const [counters, setCounters] = useState({});
  
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isClient) return;
    
    const animateNumber = (target, setter) => {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statsData.forEach((stat, idx) => {
            const numValue = parseInt(stat.number);
            if (!isNaN(numValue)) {
              animateNumber(numValue, (value) => {
                setCounters(prev => ({ ...prev, [idx]: value }));
              });
            } else {
              setCounters(prev => ({ ...prev, [idx]: stat.number }));
            }
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, [isClient]);

  // GSAP Animations
  useEffect(() => {
    if (!isClient) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(storyRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: storyRef.current, start: "top 80%" } }
    );

    gsap.fromTo('.value-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, scrollTrigger: { trigger: valuesRef.current, start: "top 80%" } }
    );

    gsap.fromTo(statsRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: statsRef.current, start: "top 80%" } }
    );

    gsap.fromTo('.team-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: teamRef.current, start: "top 80%" } }
    );

    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: ctaRef.current, start: "top 80%" } }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FN Developers',
    url: 'https://fn-developers.com',
    logo: 'https://fn-developers.com/logo.svg',
    description: 'Professional web development, mobile app development (React Native), and digital marketing agency in Pakistan.',
    foundingDate: '2020',
    founder: [
      { '@type': 'Person', name: 'Faheem Ejaz' },
      { '@type': 'Person', name: 'Naeem Ejaz' }
    ],
    address: { '@type': 'PostalAddress', addressCountry: 'PK', addressRegion: 'Pakistan' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'info@fn-developers.com' },
    sameAs: ['https://www.facebook.com/fndevelopers', 'https://www.linkedin.com/company/fn-developers']
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <div className={styles.aboutPage}>
        {/* Hero Section - No Image, Only Text */}
        <section className={styles.hero} ref={heroRef}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroLeft}>
                <span className={styles.heroTag}>ABOUT US</span>
                <h1 className={styles.heroTitle}>
                  We're <span className={styles.highlight}>FN Developers</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  A team of passionate developers, designers, and strategists dedicated 
                  to transforming ideas into powerful digital solutions that drive real business growth.
                </p>
                <div className={styles.heroButtons}>
                  <Link href="/contact" className={styles.primaryBtn}>
                    Work With Us <span>→</span>
                  </Link>
                  <Link href="/portfolio" className={styles.secondaryBtn}>
                    View Our Work
                  </Link>
                </div>
              </div>
              <div className={styles.heroRight}>
                <div className={styles.heroIconWrapper}>
                  <div className={styles.heroIconLarge}>🚀</div>
                  <div className={styles.heroIconText}>Building Digital Excellence Since 2020</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section - Updated with Founder mention */}
        <section className={styles.story} ref={storyRef}>
          <div className={styles.container}>
            <div className={styles.storyContent}>
              <div className={styles.storyLeft}>
                <span className={styles.sectionTag}>OUR STORY</span>
                <h2 className={styles.sectionTitle}>
                  From Vision to <span className={styles.highlight}>Reality</span>
                </h2>
                <div className={styles.storyText}>
                  <p>
                    <strong>FN Developers</strong> was founded by <strong>Faheem Ejaz</strong> (Founder & Senior Developer) and 
                    <strong> Naeem Ejaz</strong> (CEO) with a simple idea: to bridge the gap between innovative technology and real business results. 
                    What started as a small team of passionate developers has grown into a full-service digital agency trusted by businesses 
                    across Pakistan and beyond.
                  </p>
                  <p>
                    What sets us apart is our commitment to understanding not just the technical requirements, 
                    but the business goals behind every project. We believe that great software is more than just 
                    code—it's a tool that should drive growth, engage users, and create lasting value.
                  </p>
                  <p>
                    Today, we're proud to have helped <strong>45+ businesses</strong> transform their digital presence, 
                    from sleek mobile apps (iOS & Android) to complex web platforms and comprehensive social media strategies.
                  </p>
                </div>
              </div>
              <div className={styles.storyRight}>
                <div className={styles.storyStats}>
                  <div className={styles.storyStat}>
                    <span className={styles.storyStatNumber}>80+</span>
                    <span className={styles.storyStatLabel}>Projects Delivered</span>
                  </div>
                  <div className={styles.storyStat}>
                    <span className={styles.storyStatNumber}>5+</span>
                    <span className={styles.storyStatLabel}>Years Experience</span>
                  </div>
                  <div className={styles.storyStat}>
                    <span className={styles.storyStatNumber}>98%</span>
                    <span className={styles.storyStatLabel}>Client Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.values} ref={valuesRef}>
          <div className={styles.container}>
            <span className={styles.sectionTag}>WHAT WE BELIEVE</span>
            <h2 className={styles.sectionTitle}>
              Our Core <span className={styles.highlight}>Values</span>
            </h2>
            <div className={styles.valuesGrid}>
              {values.map((value, index) => (
                <div key={index} className={`value-card ${styles.valueCard}`}>
                  <div className={styles.valueIcon}>{value.icon}</div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDescription}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats} ref={statsRef}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              {statsData.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <span className={styles.statNumber}>
                    {counters[index] || (stat.number.includes('+') ? stat.number : '0')}
                    {stat.number.includes('+') && '+'}
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - Updated with Faheem as Founder & Senior Developer */}
        <section className={styles.team} ref={teamRef}>
          <div className={styles.container}>
            <span className={styles.sectionTag}>MEET THE TEAM</span>
            <h2 className={styles.sectionTitle}>
              The People Behind <span className={styles.highlight}>the Magic</span>
            </h2>
            <p className={styles.teamSubtitle}>
              A diverse group of creative minds and technical experts passionate about building exceptional digital experiences.
            </p>
            <div className={styles.teamGrid}>
              {team.map((member, index) => (
                <div key={index} className={`team-card ${styles.teamCard}`}>
                  <div className={styles.teamAvatar}>
                    <span className={styles.teamInitials}>{member.initials}</span>
                  </div>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                  <div className={styles.teamExpertise}>
                    {member.expertise.map((exp, idx) => (
                      <span key={idx} className={styles.expertiseTag}>{exp}</span>
                    ))}
                  </div>
                  <div className={styles.teamSocial}>
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                        <span>in</span>
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                        <span>gh</span>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                        <span>𝕏</span>
                      </a>
                    )}
                    {member.social.instagram && (
                      <a href={member.social.instagram} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                        <span>ig</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.aboutCta} ref={ctaRef}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to Start Your Journey?</h2>
              <p className={styles.ctaText}>
                Let's discuss how we can help bring your ideas to life and create something amazing together.
              </p>
              <Link href="/contact" className={styles.ctaButton}>
                Get in Touch <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
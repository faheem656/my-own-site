'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [isClient, setIsClient] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const sliderRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Real Testimonials from Portfolio Projects
  const testimonials = [
    {
      id: 1,
      name: "Nick Joseph",
      role: "Founder",
      company: "Mindset & Muscle VIP",
      review: "The Mindset & Muscle VIP app has completely transformed how I connect with my audience. My users love the seamless experience and comprehensive fitness content. FN Developers delivered beyond my expectations.",
      rating: 5,
      result: "10K+ Downloads",
      initials: "NJ",
      projectLink: "/portfolio/mindset-muscle-vip"
    },
    {
      id: 2,
      name: "Muhammad Bilal",
      role: "Founder",
      company: "Success Work Tech",
      review: "Success Work Tech transformed our IT infrastructure completely. Their team's expertise in web development was outstanding - seamless execution and excellent results. Highly recommended!",
      rating: 5,
      result: "500+ Projects",
      initials: "MB",
      projectLink: "/portfolio/success-work-tech"
    },
    {
      id: 3,
      name: "Ken Hulse",
      role: "Founder",
      company: "YouthfulDNA",
      review: "The DNA report completely changed my skincare approach. It connected everything—my sensitivity, hydration, and how I respond to sun exposure. The platform they built is exceptional.",
      rating: 5,
      result: "Growing User Base",
      initials: "MB",
      projectLink: "/portfolio/youthful-dna"
    },
    {
      id: 4,
      name: "Michael Roberts",
      role: "Founder",
      company: "TheekayDar",
      review: "FN Developers built TheekayDar from scratch - a complex home services platform with amazing features. Their technical expertise and dedication to quality is unmatched in the industry.",
      rating: 5,
      result: "Launching Soon",
      initials: "MR",
      projectLink: "/portfolio/theekaydar"
    },
  ];

  // GSAP Animations
  useEffect(() => {
    if (!isClient) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set([headlineRef.current, subheadlineRef.current, cardsRef.current], {
      opacity: 0,
      y: 40
    });

    gsap.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.to(subheadlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.to(cardsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: sliderRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  // Auto-slider functionality
  useEffect(() => {
    if (!isClient || !isAutoPlaying || window.innerWidth <= 768) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isClient, isAutoPlaying, testimonials.length]);

  // Slide change animation
  useEffect(() => {
    if (!isClient || !sliderRef.current) return;

    gsap.to(sliderRef.current, {
      x: -currentSlide * 100 + '%',
      duration: 0.8,
      ease: "power3.inOut"
    });

    dotsRef.current.forEach((dot, index) => {
      if (index === currentSlide) {
        gsap.to(dot, {
          scale: 1.2,
          backgroundColor: '#FF0000',
          boxShadow: '0 0 20px #FF0000',
          duration: 0.3
        });
      } else {
        gsap.to(dot, {
          scale: 1,
          backgroundColor: '#333333',
          boxShadow: 'none',
          duration: 0.3
        });
      }
    });
  }, [currentSlide, isClient]);

  const handleCardHover = (e, index) => {
    if (!isClient) return;
    
    gsap.to(e.currentTarget, {
      y: -10,
      scale: 1.02,
      boxShadow: "0 30px 50px -15px rgba(255, 0, 0, 0.4)",
      duration: 0.3
    });

    const avatar = e.currentTarget.querySelector(`.${styles.avatarPlaceholder}`);
    if (avatar) {
      gsap.to(avatar, { scale: 1.1, rotate: 5, boxShadow: "0 0 30px #FF0000", duration: 0.3 });
    }

    const quoteIcon = e.currentTarget.querySelector(`.${styles.quoteIcon}`);
    if (quoteIcon) {
      gsap.to(quoteIcon, { scale: 1.2, color: '#FF0000', duration: 0.3 });
    }

    const resultBadge = e.currentTarget.querySelector(`.${styles.resultBadge}`);
    if (resultBadge) {
      gsap.to(resultBadge, { scale: 1.1, backgroundColor: '#FF0000', color: '#FFFFFF', duration: 0.3 });
    }

    setIsAutoPlaying(false);
  };

  const handleCardLeave = (e) => {
    if (!isClient) return;
    
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
      duration: 0.3
    });

    const avatar = e.currentTarget.querySelector(`.${styles.avatarPlaceholder}`);
    if (avatar) {
      gsap.to(avatar, { scale: 1, rotate: 0, boxShadow: "0 0 0 transparent", duration: 0.3 });
    }

    const quoteIcon = e.currentTarget.querySelector(`.${styles.quoteIcon}`);
    if (quoteIcon) {
      gsap.to(quoteIcon, { scale: 1, color: '#333333', duration: 0.3 });
    }

    const resultBadge = e.currentTarget.querySelector(`.${styles.resultBadge}`);
    if (resultBadge) {
      gsap.to(resultBadge, { scale: 1, backgroundColor: 'rgba(255, 0, 0, 0.1)', color: '#FF0000', duration: 0.3 });
    }

    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) handleNextSlide();
    else if (touchEnd - touchStart > 100) handlePrevSlide();
    setTouchStart(0);
    setTouchEnd(0);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`${styles.star} ${i < rating ? styles.starFilled : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className={styles.testimonials} ref={sectionRef}>
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgGrid}></div>
        <div className={styles.bgGradient}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionTag}>CLIENT SUCCESS</span>
          <h2 className={styles.headline} ref={headlineRef}>
            Trusted by <span className={styles.highlight}>Industry Leaders</span>
          </h2>
          <p className={styles.subheadline} ref={subheadlineRef}>
            Don't just take our word for it. Here's what our clients have to say 
            about their experience working with us.
          </p>
        </div>

        <div className={styles.sliderContainer}>
          <div 
            className={styles.slider}
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={styles.slide}
                ref={el => cardsRef.current[index] = el}
                onMouseEnter={(e) => handleCardHover(e, index)}
                onMouseLeave={handleCardLeave}
              >
                <div className={styles.card}>
                  <div className={styles.cardAccent}></div>

                  <div className={styles.quoteIconWrapper}>
                    <span className={styles.quoteIcon}>“</span>
                  </div>

                  <p className={styles.reviewText}>"{testimonial.review}"</p>

                  <div className={styles.resultBadge}>
                    <span className={styles.resultIcon}>🏆</span>
                    <span className={styles.resultText}>{testimonial.result}</span>
                  </div>

                  <div className={styles.clientInfo}>
                    <div className={styles.avatarWrapper}>
                      <div className={styles.avatarPlaceholder}>
                        <span className={styles.avatarInitial}>{testimonial.initials}</span>
                      </div>
                    </div>
                    <div className={styles.clientDetails}>
                      <h3 className={styles.clientName}>{testimonial.name}</h3>
                      <p className={styles.clientRole}>
                        {testimonial.role} at <span className={styles.clientCompany}>{testimonial.company}</span>
                      </p>
                      <div className={styles.rating}>
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>

                  <div className={styles.companyBadge}>
                    <span className={styles.companyBadgeText}>{testimonial.company}</span>
                  </div>

                  <div className={styles.cardGlow}></div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={`${styles.navArrow} ${styles.navPrev}`}
            onClick={handlePrevSlide}
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button 
            className={`${styles.navArrow} ${styles.navNext}`}
            onClick={handleNextSlide}
            aria-label="Next testimonial"
          >
            →
          </button>

          <div className={styles.dotsContainer}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                onClick={() => handleDotClick(index)}
                ref={el => dotsRef.current[index] = el}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4.9/5</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Happy Clients</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Would Recommend</span>
          </div>
        </div>
      </div>
    </section>
  );
}
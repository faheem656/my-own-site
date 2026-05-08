'use client'
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Process.module.css';

export default function Process() {
  const [isClient, setIsClient] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);
  const iconsRef = useRef([]);
  const contentRefs = useRef([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Process steps data with professional messaging
  const steps = [
    {
      id: 1,
      title: "Discovery & Strategy",
      description: "We dive deep into your business goals, target audience, and market positioning. Our team conducts thorough research to create a strategic roadmap that aligns with your vision and delivers measurable results.",
      icon: "🔍",
      color: "#FF0000",
      duration: "1-2 Days",
      deliverables: ["Market Analysis", "User Research", "Project Roadmap"]
    },
    {
      id: 2,
      title: "Design & Prototyping",
      description: "Our designers craft intuitive user experiences and stunning visuals. We create interactive prototypes that bring your ideas to life, ensuring every detail is perfect before development begins.",
      icon: "🎨",
      color: "#FF0000",
      duration: "3-5 Days",
      deliverables: ["Wireframes", "UI Design", "Interactive Prototype"]
    },
    {
      id: 3,
      title: "Development & Engineering",
      description: "Our engineers build robust, scalable solutions using cutting-edge technology. We follow agile methodology with regular updates, ensuring complete transparency throughout the development process.",
      icon: "⚙️",
      color: "#FF0000",
      duration: "2-4 Weeks",
      deliverables: ["Frontend Development", "Backend Integration", "API Development"]
    },
    {
      id: 4,
      title: "Testing & Quality Assurance",
      description: "Rigorous testing across all platforms and devices ensures a flawless user experience. We conduct performance optimization, security audits, and user acceptance testing before launch.",
      icon: "✅",
      color: "#FF0000",
      duration: "1 Week",
      deliverables: ["QA Testing", "Performance Tuning", "Security Audit"]
    },
    {
      id: 5,
      title: "Launch & Growth",
      description: "We ensure a smooth launch and provide ongoing support to help your business grow. Our team monitors performance, implements optimizations, and scales your solution as needed.",
      icon: "📈",
      color: "#FF0000",
      duration: "Continuous",
      deliverables: ["Deployment", "Analytics Setup", "Growth Strategy"]
    }
  ];

  // GSAP Animations
  useEffect(() => {
    if (!isClient) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initial setup - hide elements
    gsap.set([headlineRef.current, subheadlineRef.current], {
      opacity: 0,
      y: 40
    });

    gsap.set(stepsRef.current, {
      opacity: 0,
      x: -50
    });

    gsap.set(lineRef.current, {
      scaleY: 0,
      transformOrigin: "top center"
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

    // Timeline line animation - grows as user scrolls
    gsap.to(lineRef.current, {
      scaleY: 1,
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1.5,
        toggleActions: "play none none reverse"
      }
    });

    // Steps staggered animation
    stepsRef.current.forEach((step, index) => {
      gsap.to(step, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Icon animations as they appear
    iconsRef.current.forEach((icon, index) => {
      gsap.fromTo(icon,
        {
          scale: 0.8,
          rotate: -10
        },
        {
          scale: 1,
          rotate: 0,
          duration: 0.6,
          delay: index * 0.2 + 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: stepsRef.current[index],
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Cleanup ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  // Hover animations
  const handleStepHover = (e, index) => {
    if (!isClient) return;
    setActiveStep(index);

    const step = e.currentTarget;
    const icon = step.querySelector(`.${styles.stepIcon}`);
    const title = step.querySelector(`.${styles.stepTitle}`);
    const line = step.querySelector(`.${styles.stepConnector}`);
    const deliverables = step.querySelectorAll(`.${styles.deliverableItem}`);

    // Step lift effect with red glow
    gsap.to(step, {
      y: -8,
      scale: 1.02,
      boxShadow: "0 30px 50px -15px rgba(255, 0, 0, 0.4)",
      duration: 0.3,
      ease: "power2.out"
    });

    // Icon animation
    gsap.to(icon, {
      scale: 1.2,
      rotate: 5,
      backgroundColor: "#FF0000",
      color: "#FFFFFF",
      duration: 0.3,
      ease: "power2.out"
    });

    // Title color change
    gsap.to(title, {
      color: "#FF0000",
      duration: 0.3,
      ease: "power2.out"
    });

    // Deliverables animation
    gsap.to(deliverables, {
      x: 5,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out"
    });

    // Connector line animation
    if (line) {
      gsap.to(line, {
        backgroundColor: "#FF0000",
        scaleX: 1.5,
        duration: 0.3,
        ease: "power2.out"
      });
    }

    // Pulse effect on timeline dot
    const dot = step.querySelector(`.${styles.timelineDot}`);
    if (dot) {
      gsap.to(dot, {
        scale: 1.5,
        boxShadow: "0 0 30px #FF0000",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleStepLeave = (e, index) => {
    if (!isClient) return;
    setActiveStep(null);

    const step = e.currentTarget;
    const icon = step.querySelector(`.${styles.stepIcon}`);
    const title = step.querySelector(`.${styles.stepTitle}`);
    const line = step.querySelector(`.${styles.stepConnector}`);
    const dot = step.querySelector(`.${styles.timelineDot}`);
    const deliverables = step.querySelectorAll(`.${styles.deliverableItem}`);

    // Reset step
    gsap.to(step, {
      y: 0,
      scale: 1,
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.5)",
      duration: 0.3,
      ease: "power2.out"
    });

    // Reset icon
    gsap.to(icon, {
      scale: 1,
      rotate: 0,
      backgroundColor: "#1A1A1A",
      color: "#FFFFFF",
      duration: 0.3,
      ease: "power2.out"
    });

    // Reset title
    gsap.to(title, {
      color: "#FFFFFF",
      duration: 0.3,
      ease: "power2.out"
    });

    // Reset deliverables
    gsap.to(deliverables, {
      x: 0,
      duration: 0.3,
      ease: "power2.out"
    });

    // Reset connector
    if (line) {
      gsap.to(line, {
        backgroundColor: "#333333",
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }

    // Reset dot
    if (dot) {
      gsap.to(dot, {
        scale: 1,
        boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Timeline dot hover
  const handleDotHover = (e) => {
    if (!isClient) return;
    gsap.to(e.currentTarget, {
      scale: 1.3,
      boxShadow: "0 0 30px #FF0000",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleDotLeave = (e) => {
    if (!isClient) return;
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section className={styles.process} ref={sectionRef}>
      {/* Background decoration with red theme */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgGrid}></div>
        <div className={styles.bgGradient}></div>
        <div className={styles.bgParticles}></div>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>HOW WE WORK</span>
          <h2 className={styles.headline} ref={headlineRef}>
            Our <span className={styles.highlight}>Process</span>
          </h2>
          <p className={styles.subheadline} ref={subheadlineRef}>
            A proven methodology that ensures successful delivery and lasting results. 
            We combine strategic thinking with technical excellence at every step.
          </p>
        </div>

        {/* Process Timeline */}
        <div className={styles.timelineWrapper} ref={timelineRef}>
          {/* Main Timeline Line */}
          <div className={styles.timelineLine} ref={lineRef}>
            <div className={styles.lineProgress}></div>
          </div>

          {/* Steps Container */}
          <div className={styles.stepsContainer}>
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={styles.stepWrapper}
                ref={el => stepsRef.current[index] = el}
                onMouseEnter={(e) => handleStepHover(e, index)}
                onMouseLeave={(e) => handleStepLeave(e, index)}
              >
                {/* Timeline Dot */}
                <div 
                  className={styles.timelineDot}
                  style={{ 
                    borderColor: "#FF0000",
                    backgroundColor: activeStep === index ? '#FF0000' : '#1A1A1A'
                  }}
                  onMouseEnter={handleDotHover}
                  onMouseLeave={handleDotLeave}
                >
                  <span className={styles.dotNumber}>{step.id}</span>
                </div>

                {/* Step Connector */}
                {index < steps.length - 1 && (
                  <div className={styles.stepConnector}>
                    <div className={styles.connectorArrow}>→</div>
                  </div>
                )}

                {/* Step Card */}
                <div className={styles.stepCard}>
                  {/* Icon */}
                  <div 
                    className={styles.stepIcon}
                    ref={el => iconsRef.current[index] = el}
                  >
                    <span className={styles.iconEmoji}>{step.icon}</span>
                  </div>

                  {/* Content */}
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                    
                    {/* Deliverables */}
                    <div className={styles.deliverables}>
                      {step.deliverables.map((item, idx) => (
                        <span key={idx} className={styles.deliverableItem}>
                          <span className={styles.deliverableDot}></span>
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Step Meta */}
                    <div className={styles.stepMeta}>
                      <span className={styles.stepDuration}>
                        <span className={styles.metaIcon}>⏱️</span>
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={styles.cardGlow}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Stats */}
        <div className={styles.processStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100+</span>
            <span className={styles.statLabel}>Projects Delivered</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Client Satisfaction</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>5+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
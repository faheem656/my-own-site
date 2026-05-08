'use client'
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import styles from './page.module.css';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const inputsRef = useRef([]);
  const formElementRef = useRef(null);

  // EmailJS initialization
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(infoRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (index) => {
    setFocusedField(index);
    gsap.to(inputsRef.current[index], {
      borderColor: '#FF0000',
      boxShadow: '0 0 0 4px rgba(255, 0, 0, 0.1)',
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleInputBlur = (index) => {
    setFocusedField(null);
    gsap.to(inputsRef.current[index], {
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 0 0 0 rgba(255, 0, 0, 0)',
      duration: 0.3,
      ease: "power2.out"
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      setError(result.message || 'Failed to send message');
    }
  } catch (error) {
    console.error('Error:', error);
    setError('Network error. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

  const services = [
    { value: 'web', label: 'Web Development' },
    { value: 'app', label: 'Mobile App Development' },
    { value: 'social', label: 'Social Media Management' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'other', label: 'Other' }
  ];

const budgets = [
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-2500', label: '$1,000 - $2,500' },
  { value: '2500-5000', label: '$2,500 - $5,000' },
  { value: '5000-10000', label: '$5,000 - $10,000' },
  { value: '10000-20000', label: '$10,000 - $20,000' },
  { value: '20000-plus', label: '$20,000+' },
  { value: 'Not sure yet', label: 'Not sure yet' }
];
  return (
    <div className={styles.contactPage} ref={pageRef}>
      {/* Hero Section */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>GET IN TOUCH</span>
            <h1 className={styles.heroTitle}>
              Let's <span className={styles.highlight}>Create</span> Something Amazing
            </h1>
            <p className={styles.heroSubtitle}>
              Have a project in mind? We'd love to hear about it. 
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <div className={styles.formWrapper} ref={formRef}>
              <h2 className={styles.formTitle}>Send Us a Message</h2>
              
              {error && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠️</span>
                  <p>{error}</p>
                </div>
              )}

              {isSubmitted ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} ref={formElementRef}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus(0)}
                        onBlur={() => handleInputBlur(0)}
                        ref={el => inputsRef.current[0] = el}
                        className={styles.input}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus(1)}
                        onBlur={() => handleInputBlur(1)}
                        ref={el => inputsRef.current[1] = el}
                        className={styles.input}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus(2)}
                        onBlur={() => handleInputBlur(2)}
                        ref={el => inputsRef.current[2] = el}
                        className={styles.input}
                        placeholder="+1 (234) 567-890"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Service Interested In *</label>
                      <div className={styles.selectWrapper}>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          onFocus={() => handleInputFocus(3)}
                          onBlur={() => handleInputBlur(3)}
                          ref={el => inputsRef.current[3] = el}
                          className={styles.select}
                          required
                        >
                          <option value="">Select a service</option>
                          {services.map(service => (
                            <option key={service.value} value={service.value}>
                              {service.label}
                            </option>
                          ))}
                        </select>
                        <span className={styles.selectArrow}>▼</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Budget Range</label>
                    <div className={styles.selectWrapper}>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        onFocus={() => handleInputFocus(4)}
                        onBlur={() => handleInputBlur(4)}
                        ref={el => inputsRef.current[4] = el}
                        className={styles.select}
                      >
                        <option value="">Select budget range</option>
                        {budgets.map(budget => (
                          <option key={budget.value} value={budget.value}>
                            {budget.label}
                          </option>
                        ))}
                      </select>
                      <span className={styles.selectArrow}>▼</span>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Project Details *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => handleInputFocus(5)}
                      onBlur={() => handleInputBlur(5)}
                      ref={el => inputsRef.current[5] = el}
                      className={styles.textarea}
                      rows="5"
                      placeholder="Tell us about your project, goals, and requirements..."
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span className={styles.btnIcon}>→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className={styles.infoWrapper} ref={infoRef}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Contact Information</h3>
                
                <div className={styles.infoItems}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>📧</div>
                    <div className={styles.infoContent}>
                      <h4>Email Us</h4>
                      <a href="mailto:contact@fn-developers.com">contact@fn-developers.com</a>
                      <a href="mailto:support@fn-developers.com">support@fn-developers.com</a>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>🕒</div>
                    <div className={styles.infoContent}>
                      <h4>Working Hours</h4>
                      <p>Monday - Friday: 9am - 6pm<br />Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className={styles.socialLinks}>
                  <h4>Follow Us</h4>
                  <div className={styles.socialIcons}>
                    <a href="#" className={styles.socialIcon}>f</a>
                    <a href="#" className={styles.socialIcon}>ig</a>
                    <a target='_blank' href="https://www.linkedin.com/company/fndevelopers" className={styles.socialIcon}>in</a>
                    <a href="#" className={styles.socialIcon}>X</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
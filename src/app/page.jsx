import Cta from '@/components/home/Cta/Cta';
import Hero from '@/components/home/Hero/Hero';
import LatestBlog from '@/components/home/LatestBlog/LatestBlog';
import Portfolio from '@/components/home/Portfolio/Portfolio';
import Process from '@/components/home/Process/Process';
import Services from '@/components/home/Services/Services';
import Testimonials from '@/components/home/Testimonials/Testimonials';

// Home page specific metadata (overrides layout defaults for title/description only)
export const metadata = {
  title: 'Expert Web Development & Digital Growth Agency | FN Developers',
  description: 'FN Developers delivers custom web applications, mobile apps, social media management, and digital strategy. 100+ projects completed with 98% client satisfaction. Get a free consultation today.',
  keywords: 'web development company, mobile app developers Pakistan, social media management agency, digital strategy firm, custom web apps, ecommerce development, SaaS platform development',
  alternates: {
    canonical: 'https://fn-developers.com/',
  },
  openGraph: {
    title: 'FN Developers - Transform Your Business with Digital Excellence',
    description: 'From custom web apps to social media growth — we build solutions that drive results. 50+ happy clients, 150+ projects. Start your journey today.',
    url: 'https://fn-developers.com/',
    images: [
      {
        url: 'https://fn-developers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FN Developers - Web Development and Digital Agency',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FN Developers - Transform Your Business with Digital Excellence',
    description: 'From custom web apps to social media growth — we build solutions that drive results.',
    images: ['https://fn-developers.com/og-image.png'],
  },
};

// Updated structured data (JSON-LD) for rich snippets
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'FN Developers',
  url: 'https://fn-developers.com',
  logo: 'https://fn-developers.com/logo.svg',
  description: 'Web development, mobile app development, social media management, UI/UX design, and digital strategy agency.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
    addressRegion: 'Punjab/Sindh',
    addressLocality: 'Pakistan',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '45',
    bestRating: '5',
    worstRating: '1',
  },
  priceRange: '$$',
  telephone: '+923001234567', // 🔴 Replace with your actual business phone number
  email: 'info@fn-developers.com', // 🔴 Replace with your actual email
  sameAs: [
    'https://www.facebook.com/fndevelopers',
    'https://www.linkedin.com/company/fn-developers',
    'https://twitter.com/fndevelopers',
    'https://www.instagram.com/fndevelopers',
  ],
  serviceArea: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
    },
  },
  knowsAbout: ['Web Development', 'Mobile App Development', 'Social Media Management', 'UI/UX Design', 'Digital Strategy', 'SEO Optimization'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Development',
          description: 'Custom web applications, e-commerce solutions, and SaaS platforms'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
          description: 'iOS and Android apps using React Native'
        }
      }
    ]
  }
};

export default function Home() {

  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <Process />
        <LatestBlog />
        <Cta />
      </main>
    </>
  );
}
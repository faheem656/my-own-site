import ServicesClient from './ServicesClient';
import { getAllServices } from './data/servicesData';

export const metadata = {
  title: 'Professional Web Development & Digital Marketing Services | FN Developers',
  description: 'Expert web development, mobile app development, social media management, UI/UX design, SEO and digital marketing services. 50+ projects delivered with 98% client satisfaction. Free consultation available.',
  keywords: 'web development services Pakistan, mobile app development company, social media management agency, UI/UX design services, SEO services Pakistan, digital marketing agency, custom software development, React development, Next.js experts',
  alternates: {
    canonical: 'https://fn-developers.com/services',
  },
  openGraph: {
    title: 'Digital Services for Business Growth | FN Developers',
    description: 'From web apps to social media management — comprehensive digital solutions tailored to your business needs. Get a free consultation today.',
    url: 'https://fn-developers.com/services',
    type: 'website',
    siteName: 'FN Developers',
    images: [
      {
        url: 'https://fn-developers.com/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'FN Developers Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Services for Business Growth | FN Developers',
    description: 'Web development, mobile apps, SMM, UI/UX design, SEO and more.',
    images: ['https://fn-developers.com/og-services.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  const services = getAllServices();
  return <ServicesClient initialServices={services} />;
}
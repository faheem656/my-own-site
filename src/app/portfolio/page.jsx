import PortfolioClient from './PortfolioClient';
import { getAllProjects, getCategories } from './data/projects.js';

export const metadata = {
  title: 'Portfolio | Web Development & Mobile App Projects | FN Developers',
  description: 'Explore our successful projects in web development, mobile app development, social media management, and UI/UX design. See how we help businesses grow with innovative digital solutions.',
  keywords: 'portfolio, web development projects, mobile app projects, case studies, digital agency portfolio, React projects, Next.js projects, ecommerce projects, Pakistan portfolio',
  alternates: {
    canonical: 'https://fn-developers.com/portfolio',
  },
  openGraph: {
    title: 'Our Portfolio | FN Developers - Digital Success Stories',
    description: 'Discover our latest work in web development, mobile apps, and digital marketing. 50+ successful projects delivered with 98% client satisfaction.',
    url: 'https://fn-developers.com/portfolio',
    type: 'website',
    siteName: 'FN Developers',
    images: [
      {
        url: 'https://fn-developers.com/og-portfolio.jpg',
        width: 1200,
        height: 630,
        alt: 'FN Developers Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Portfolio | FN Developers',
    description: 'Explore our successful digital projects and case studies.',
    images: ['https://fn-developers.com/og-portfolio.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Server component to fetch data
export default function PortfolioPage() {
  const projects = getAllProjects();
  const categories = getCategories();
  
  return (
    <PortfolioClient 
      initialProjects={projects}
      initialCategories={categories}
    />
  );
}
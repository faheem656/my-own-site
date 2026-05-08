import AboutClient from './AboutClient';

export const metadata = {
  title: 'About FN Developers | Expert Web, Mobile App & Digital Marketing Team',
  description: 'Meet Faheem Ejaz (Lead Developer & React Native Expert), Naeem Ejaz (CEO & Team Leader), and Akhtar Ali (Social Media Manager). 80+ projects delivered with 98% client satisfaction.',
  keywords: 'about FN Developers, web development team Pakistan, mobile app developers Pakistan, React Native expert, Faheem Ejaz developer, Naeem Ejaz team leader, Akhtar Ali social media, digital agency Pakistan, app development company',
  alternates: {
    canonical: 'https://fn-developers.com/about',
  },
  openGraph: {
    title: 'About FN Developers | Expert Development Team in Pakistan',
    description: 'Professional web development, mobile app development (React Native), and digital marketing team. 80+ projects delivered.',
    url: 'https://fn-developers.com/about',
    type: 'website',
    siteName: 'FN Developers',
    images: [
      {
        url: 'https://fn-developers.com/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'FN Developers Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About FN Developers | Expert Team',
    description: 'Meet our expert team of developers and strategists.',
    images: ['https://fn-developers.com/og-about.jpg'],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
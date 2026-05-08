import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientWrapper from '@/components/ClientWrapper';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
  metadataBase: new URL('https://fn-developers.com'),
  title: {
    default: 'FN Developers - Web, Mobile & Digital Growth Agency',
    template: '%s | FN Developers'
  },
  description: 'FN Developers provides custom web development, mobile app development, social media management, UI/UX design, and digital strategy services. Transform your business with our expert team.',
  keywords: 'web development Pakistan, mobile app development, social media management agency, UI/UX design, digital strategy, SEO optimization, custom web apps, ecommerce solutions, SaaS development, React Native apps',
  authors: [{ name: 'FN Developers' }],
  creator: 'FN Developers',
  publisher: 'FN Developers',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://fn-developers.com',
  },
  openGraph: {
    title: 'FN Developers - Build Websites, Apps & Grow Your Brand',
    description: 'Custom web development, mobile apps, social media management, and digital strategy. 100+ projects delivered with 98% client satisfaction.',
    url: 'https://fn-developers.com',
    siteName: 'FN Developers',
    images: [
      {
        url: 'https://fn-developers.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FN Developers - Digital Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FN Developers - Digital Growth Agency',
    description: 'Web development, mobile apps, SMM, UI/UX design, and digital strategy.',
    images: ['https://fn-developers.com/og-image.png'],
    creator: '@fndevelopers',
    site: '@fndevelopers',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Karachi, Lahore, Islamabad, Pakistan" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="General" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="https://fn-developers.com/sitemap.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning={true}>
        <ClientWrapper>
          <ScrollToTop>
          <Header />
          <main style={{ paddingTop: "80px" }}>{children}</main>
          <Footer />
          </ScrollToTop>
        </ClientWrapper>
      </body>
    </html>
  );
}
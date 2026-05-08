import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with FN Developers for your next project. We offer free consultations and respond within 24 hours.',
  keywords: 'contact, web development, app development, social media management, consultation',
  openGraph: {
    title: 'Contact FN Developers',
    description: 'Ready to start your project? Contact us today for a free consultation.',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
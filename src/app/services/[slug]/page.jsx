import ServiceDetailClient from './ServiceDetailClient';
import { getServiceBySlug, getAllSlugs } from '../data/servicesData';

// Generate static params for all services
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata
export async function generateMetadata({ params }) {
  // IMPORTANT: params is async in Next.js 15
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }
  
  return {
    title: `${service.title} Services | FN Developers`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }) {
  // IMPORTANT: await params - Next.js 15 requirement
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = getServiceBySlug(slug);
  
  return <ServiceDetailClient service={service} slug={slug} />;
}
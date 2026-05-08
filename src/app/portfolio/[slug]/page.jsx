import PortfolioDetailClient from './PortfolioDetailClient';
import { getProjectBySlug, getAllProjects } from '../data/projects';

// Generate static params for all portfolio projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

// Dynamic metadata for each portfolio project
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found | FN Developers',
      description: 'The requested project could not be found.',
    };
  }
  
  return {
    title: `${project.shortTitle} | ${project.type} Case Study | FN Developers`,
    description: project.description?.substring(0, 160) || `View our complete case study for ${project.shortTitle} - a ${project.type} project by FN Developers.`,
    keywords: `${project.shortTitle}, case study, ${project.type}, portfolio, ${project.category}, web development, mobile app`,
    alternates: {
      canonical: `https://fn-developers.com/portfolio/${slug}`,
    },
    openGraph: {
      title: `${project.shortTitle} - Case Study | FN Developers`,
      description: project.description?.substring(0, 160),
      url: `https://fn-developers.com/portfolio/${slug}`,
      type: 'article',
      images: project.heroImage ? [{
        url: project.heroImage,
        width: 1200,
        height: 630,
        alt: project.shortTitle,
      }] : [],
    },
  };
}

export default async function PortfolioDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const project = getProjectBySlug(slug);
  
  return <PortfolioDetailClient project={project} slug={slug} />;
}
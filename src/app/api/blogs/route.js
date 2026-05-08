import { getAllBlogs } from '@/app/data/blogs';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || 'all';
  const limit = 6;
  
  let blogs = getAllBlogs();
  
  // Filter by category
  if (category !== 'all') {
    blogs = blogs.filter(blog => blog.category === category);
  }
  
  const totalPages = Math.ceil(blogs.length / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedBlogs = blogs.slice(start, end);
  
  return Response.json({
    blogs: paginatedBlogs,
    totalPages,
    currentPage: page,
    totalBlogs: blogs.length
  });
}
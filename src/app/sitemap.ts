import { MetadataRoute } from 'next'
import { blogPosts } from './blog/data'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devrajsinghtomar.com'
  
  // Static routes
  const routes = ['', '/about', '/ventures', '/blog', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: '2026-04-02',
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Blog post routes (auto-generated from data)
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.dateISO,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))
 
  return [...routes, ...blogRoutes]
}

import { MetadataRoute } from 'next'
import { blogPosts } from './blog/data'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devrajsinghtomar.com'
  
  // Static routes with image references
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: '2026-04-04',
      changeFrequency: 'monthly',
      priority: 1,
      images: [
        `${baseUrl}/devraj-singh-tomar.jpg`,
        `${baseUrl}/devraj-singh-tomar-mobile.jpg`,
        `${baseUrl}/og-image.png`,
      ],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2026-04-04',
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${baseUrl}/devraj-singh-tomar.jpg`],
    },
    {
      url: `${baseUrl}/ventures`,
      lastModified: '2026-04-04',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: '2026-04-04',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2026-04-04',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Blog post routes (auto-generated from data)
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.dateISO,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))
 
  return [...routes, ...blogRoutes]
}

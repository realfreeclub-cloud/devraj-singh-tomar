import { MetadataRoute } from 'next'
import { blogPosts } from './blog/data'
import { getAllCaseStudies } from '@/data/projectsData'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devrajsinghtomar.com'
  const today = new Date().toISOString().split('T')[0]
  
  // Static routes with image references
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${baseUrl}/devraj-singh-tomar.jpg`,
        `${baseUrl}/devraj-singh-tomar-mobile.jpg`,
        `${baseUrl}/og-image.png`,
      ],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
      images: [`${baseUrl}/devraj-singh-tomar.jpg`],
    },
    {
      url: `${baseUrl}/ventures`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: today,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/hire`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: today,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Blog post routes (auto-generated from data)
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.dateISO,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }))

  // Case Study routes (auto-generated from projectsData)
  const caseStudyRoutes = getAllCaseStudies().map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
    images: [`${baseUrl}/og-image.png`],
  }))
 
  return [...routes, ...blogRoutes, ...caseStudyRoutes]
}

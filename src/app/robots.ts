import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      'https://devrajsinghtomar.com/sitemap.xml',
      'https://devrajsinghtomar.com/image-sitemap.xml',
    ],
  }
}

// sitemap.ts
// Dynamic sitemap generation for Performance Driven Media

import { sanityClient } from './lib/sanity';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<Array<{
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}>> {
    const baseUrl = 'https://performancedrivenmedia.com'; // Update with your actual domain

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ];

  // Dynamic blog posts
  let blogPosts: Array<{ slug: { current: string }; publishedAt?: string; _updatedAt?: string }> = [];
  try {
    blogPosts = await sanityClient.fetch(`
      *[_type == "blogPost" && !(_id in path("drafts.**"))] {
        slug,
        publishedAt,
        _updatedAt
      }
    `);
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

    const blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug.current}`,
        lastModified: new Date(post._updatedAt || post.publishedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

  // Dynamic work/portfolio pages
  let workItems: Array<{ slug: { current: string }; _updatedAt?: string }> = [];
  try {
    workItems = await sanityClient.fetch(`
      *[_type == "portfolioItem" && !(_id in path("drafts.**"))] {
        slug,
        _updatedAt
      }
    `);
  } catch (error) {
    console.error('Error fetching work items for sitemap:', error);
  }

    const workPages = workItems.map((item) => ({
        url: `${baseUrl}/work/${item.slug.current}`,
        lastModified: new Date(item._updatedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...blogPages, ...workPages];
}

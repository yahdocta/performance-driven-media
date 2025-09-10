// seo.ts
// SEO utilities and metadata generation for Performance Driven Media

import { Metadata } from 'next';

// Base site configuration
export const siteConfig = {
    name: 'Performance Driven Media',
    description: 'High-converting video production agency specializing in direct-response marketing, infomercials, and performance-driven content that drives measurable results.',
    url: 'https://performancedrivenmedia.com', // Update with your actual domain
    ogImage: '/og-image.jpg', // You'll need to create this
    keywords: [
        'video production',
        'direct response marketing',
        'infomercial production',
        'performance marketing',
        'video advertising',
        'commercial production',
        'marketing videos',
        'conversion optimization',
        'video content creation',
        'advertising agency'
    ],
    authors: [{ name: 'Performance Driven Media' }],
    creator: 'Performance Driven Media',
    publisher: 'Performance Driven Media',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://performancedrivenmedia.com',
        siteName: 'Performance Driven Media',
        title: 'Performance Driven Media - High-Converting Video Production',
        description: 'High-converting video production agency specializing in direct-response marketing, infomercials, and performance-driven content that drives measurable results.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Performance Driven Media - Video Production Agency',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Performance Driven Media - High-Converting Video Production',
        description: 'High-converting video production agency specializing in direct-response marketing, infomercials, and performance-driven content that drives measurable results.',
        images: ['/og-image.jpg'],
        creator: '@performancedrivenmedia', // Update with your actual Twitter handle
    },
    verification: {
        google: 'your-google-verification-code', // Add your Google Search Console verification code
        // yandex: 'your-yandex-verification-code',
        // yahoo: 'your-yahoo-verification-code',
    },
};

// Generate page-specific metadata
export function generateMetadata({
    title,
    description,
    keywords = [],
    image,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    section,
    tags,
}: {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
}): Metadata {
    const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
    const fullDescription = description || siteConfig.description;
    const fullKeywords = [...siteConfig.keywords, ...keywords];
    const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
    const fullImage = image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.ogImage}`;

    const metadata: Metadata = {
        title: fullTitle,
        description: fullDescription,
        keywords: fullKeywords,
        authors: siteConfig.authors,
        creator: siteConfig.creator,
        publisher: siteConfig.publisher,
        robots: siteConfig.robots,
        alternates: {
            canonical: fullUrl,
        },
        openGraph: {
            type,
            locale: siteConfig.openGraph.locale,
            url: fullUrl,
            siteName: siteConfig.openGraph.siteName,
            title: fullTitle,
            description: fullDescription,
            images: [
                {
                    url: fullImage,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                },
            ],
            ...(type === 'article' && {
                publishedTime,
                modifiedTime,
                authors: authors?.map(name => ({ name })),
                section,
                tags,
            }),
        },
        twitter: {
            ...siteConfig.twitter,
            title: fullTitle,
            description: fullDescription,
            images: [fullImage],
        },
        verification: siteConfig.verification,
    };

    return metadata;
}

// Generate JSON-LD structured data
export function generateStructuredData({
  type,
  data,
}: {
  type: 'Organization' | 'WebSite' | 'Article' | 'VideoObject' | 'Service';
  data: Record<string, unknown>;
}) {
    const baseStructuredData = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data,
    };

    return baseStructuredData;
}

// Common structured data for the organization
export const organizationStructuredData = generateStructuredData({
    type: 'Organization',
    data: {
        name: 'Performance Driven Media',
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        description: siteConfig.description,
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'US',
            // Add your actual address
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-XXX-XXX-XXXX', // Add your actual phone
            contactType: 'customer service',
        },
        sameAs: [
            // Add your social media URLs
            'https://www.linkedin.com/company/performance-driven-media',
            'https://twitter.com/performancedrivenmedia',
            'https://www.youtube.com/channel/your-channel-id',
        ],
        foundingDate: '2020', // Update with actual founding date
        numberOfEmployees: '10-50', // Update with actual range
        industry: 'Video Production',
        services: [
            'Video Production',
            'Direct Response Marketing',
            'Infomercial Production',
            'Commercial Production',
            'Performance Marketing',
        ],
    },
});

// Website structured data
export const websiteStructuredData = generateStructuredData({
    type: 'WebSite',
    data: {
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    },
});

// SEOHead.tsx
// Additional SEO components and structured data for Performance Driven Media

import { generateStructuredData } from '../lib/seo';

interface SEOHeadProps {
    type?: 'Article' | 'VideoObject' | 'Service' | 'Organization' | 'WebSite';
    data?: Record<string, unknown>;
    breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function SEOHead({ type, data, breadcrumbs }: SEOHeadProps) {
    if (!type || !data) return null;

    const structuredData = generateStructuredData({ type, data });

    return (
        <>
            {/* Additional structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />

            {/* Breadcrumb structured data */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BreadcrumbList',
                            itemListElement: breadcrumbs.map((crumb, index) => ({
                                '@type': 'ListItem',
                                position: index + 1,
                                name: crumb.name,
                                item: crumb.url,
                            })),
                        }),
                    }}
                />
            )}
        </>
    );
}

// FAQ structured data component
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
    if (!faqs || faqs.length === 0) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: faqs.map(faq => ({
                        '@type': 'Question',
                        name: faq.question,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: faq.answer,
                        },
                    })),
                }),
            }}
        />
    );
}

// Video structured data component
export function VideoStructuredData({
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
}: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration: string;
    contentUrl: string;
    embedUrl: string;
}) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'VideoObject',
                    name,
                    description,
                    thumbnailUrl,
                    uploadDate,
                    duration,
                    contentUrl,
                    embedUrl,
                    publisher: {
                        '@type': 'Organization',
                        name: 'Performance Driven Media',
                        url: 'https://performancedrivenmedia.com',
                    },
                }),
            }}
        />
    );
}

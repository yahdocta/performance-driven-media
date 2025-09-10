// robots.ts
// Robots.txt configuration for Performance Driven Media

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/admin/',
                '/_next/',
                '/static/',
                '/pdmsite/sanity/',
                '/sanity/',
            ],
        },
        sitemap: 'https://performancedrivenmedia.com/sitemap.xml', // Update with your actual domain
    };
}

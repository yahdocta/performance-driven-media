// blog/[slug]/page.tsx
// Dynamic route for individual blog posts

import { sanityClient } from '@/app/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateMetadata as generateSEOMetadata } from '../../lib/seo';
import { Metadata } from 'next';

// Blog post type
interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  category?: string;
  readTime?: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  publishedAt?: string;
  body?: Array<{
    _type: string;
    children?: Array<{
      _type: string;
      text: string;
      marks?: string[];
    }>;
    style?: string;
    listItem?: string;
    level?: number;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await sanityClient.fetch(
    `*[_type == "blogPost"] {
      slug
    }`
  );

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

// Generate SEO metadata for individual blog posts
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Fetch the specific blog post from Sanity
  const post: BlogPost = await sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      title,
      excerpt,
      category,
      publishedAt,
      mainImage {
        asset -> {
          url
        }
      }
    }`,
    { slug }
  );

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = `${post.title} | Performance Driven Media Blog`;
  const description = post.excerpt || `Discover insights about ${post.title} from Performance Driven Media's expert team. Learn proven strategies for video production, direct-response marketing, and performance-driven content.`;
  const image = post.mainImage?.asset?.url;

  return generateSEOMetadata({
    title,
    description,
    keywords: [
      'performance driven media',
      'video production blog',
      'direct response marketing',
      'infomercial production',
      'performance marketing',
      'video advertising',
      'commercial production',
      'marketing videos',
      'conversion optimization',
      'video content creation',
      'advertising agency',
      '30 minute infomercials',
      'long form video content',
      post.category || '',
      post.title.toLowerCase(),
    ].filter(Boolean),
    image,
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    authors: ['Performance Driven Media'],
    section: post.category,
    tags: [post.category, 'video production', 'marketing', 'performance driven media'].filter(Boolean) as string[],
  });
}

// Main BlogPost component
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // Await params for Next.js 15 compatibility
  const { slug } = await params;

  // Fetch the specific blog post from Sanity
  const post: BlogPost = await sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      category,
      readTime,
      mainImage {
        asset -> {
          url
        }
      },
      publishedAt,
      body
    }`,
    { slug }
  );

  // Fetch related posts (same category or recent posts)
  const relatedPosts: BlogPost[] = await sanityClient.fetch(
    `*[_type == "blogPost" && _id != $postId] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      category,
      readTime,
      mainImage {
        asset -> {
          url
        }
      },
      publishedAt
    }`,
    { postId: post?._id }
  );

  // If post doesn't exist, return 404
  if (!post) {
    notFound();
  }

  // Format the published date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Generate comprehensive structured data for the blog post
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || `Discover insights about ${post.title} from Performance Driven Media's expert team.`,
    image: post.mainImage?.asset?.url ? [post.mainImage.asset.url] : [],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Performance Driven Media',
      url: 'https://performancedrivenmedia.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://performancedrivenmedia.com/og-image.svg',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Performance Driven Media',
      url: 'https://performancedrivenmedia.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://performancedrivenmedia.com/og-image.svg',
        width: 1200,
        height: 630,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://performancedrivenmedia.com/blog/${slug}`,
    },
    articleSection: post.category || 'Video Production',
    wordCount: post.body?.length || 0,
    keywords: [
      'performance driven media',
      'video production',
      'direct response marketing',
      post.category || '',
      post.title.toLowerCase(),
    ].filter(Boolean).join(', '),
    about: {
      '@type': 'Thing',
      name: 'Video Production and Direct Response Marketing',
    },
    mentions: [
      {
        '@type': 'Organization',
        name: 'Performance Driven Media',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white" aria-current="page">
                  {post.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Category Badge */}
          {post.category && (
            <div className="block mb-8">
              <span className="inline-block bg-red-500/20 text-red-400 px-4 py-2 rounded text-sm font-medium">
                {post.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex items-center space-x-6 text-gray-400">
            {post.publishedAt && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Image */}
      {post.mainImage && (
        <section className="py-12 bg-black">
          <div className="max-w-3xl mx-auto px-4">
            <div className="relative">
              <Image
                src={post.mainImage.asset.url}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <article className="prose prose-invert prose-lg max-w-none">
            {post.body && <PortableText value={post.body} />}
          </article>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              More from Performance Driven Media
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost._id}
                  className="bg-black border border-gray-800 p-6 hover:border-red-500 transition-colors duration-300 group"
                >
                  {relatedPost.mainImage && (
                    <div className="mb-4">
                      <Image
                        src={relatedPost.mainImage.asset.url}
                        alt={relatedPost.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  )}

                  {relatedPost.category && (
                    <div className="inline-block bg-red-500/20 text-red-400 px-3 py-1 rounded text-sm font-medium mb-4">
                      {relatedPost.category}
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-3 group-hover:text-red-400 transition-colors">
                    <Link href={`/blog/${relatedPost.slug.current}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>

                  {relatedPost.excerpt && (
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {relatedPost.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {relatedPost.readTime && (
                      <span className="text-sm text-gray-500">
                        {relatedPost.readTime}
                      </span>
                    )}

                    <Link
                      href={`/blog/${relatedPost.slug.current}`}
                      className="text-red-500 hover:text-red-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-red-800/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to See Real Results?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how performance-driven media can transform your business.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-red-500 hover:bg-red-600 text-black px-8 py-4 text-lg font-bold transition-colors duration-300"
          >
            Start Your Campaign
          </Link>
        </div>
      </section>
    </main>
  );
} 
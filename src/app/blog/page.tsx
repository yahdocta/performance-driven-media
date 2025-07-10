import { sanityClient } from '@/app/lib/sanity';

interface FeaturedCaseStudy {
  title: string;
  highlights: string[];
  ctaLabel: string;
  ctaLink: string;
}

interface Article {
  title: string;
  excerpt?: string;
  link?: string;
}

interface BlogPageData {
  sectionTitle: string;
  featuredCaseStudy: FeaturedCaseStudy;
  otherArticles: Article[];
}

export default async function BlogPage() {
  const data: BlogPageData = await sanityClient.fetch(
    `*[_type == "blogPage"][0]{
      sectionTitle,
      featuredCaseStudy {
        title,
        highlights,
        ctaLabel,
        ctaLink
      },
      otherArticles[]{
        title,
        excerpt,
        link
      }
    }`
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-20">
      {/* Section Title */}
      <h1 className="text-4xl font-bold mb-12">{data.sectionTitle}</h1>

      {/* Featured Case Study */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4">{data.featuredCaseStudy.title}</h2>
        <ul className="list-disc ml-6 mb-4 space-y-1">
          {data.featuredCaseStudy.highlights.map((highlight, idx) => (
            <li key={idx}>{highlight}</li>
          ))}
        </ul>
        {data.featuredCaseStudy.ctaLink && (
          <a
            href={data.featuredCaseStudy.ctaLink}
            className="inline-block bg-red-500 text-white px-8 py-4 rounded text-lg font-medium"
          >
            {data.featuredCaseStudy.ctaLabel}
          </a>
        )}
      </section>

      {/* Other Articles */}
      <section>
        <h3 className="text-2xl font-semibold mb-4">Other Articles</h3>
        <ul className="space-y-6">
          {data.otherArticles.map((article, idx) => (
            <li key={idx}>
              <h4 className="text-xl font-bold">{article.title}</h4>
              {article.excerpt && <p className="text-gray-700 mt-1">{article.excerpt}</p>}
              {article.link && (
                <a
                  href={article.link}
                  className="text-red-500 hover:underline mt-2 inline-block"
                >
                  Read More
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

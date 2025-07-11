import { sanityClient } from '@/app/lib/sanity';
import { PortableText } from '@portabletext/react';

interface TermsSection {
  title: string;
  content: Array<{
    _type: string;
    children?: Array<{
      _type: string;
      text: string;
    }>;
  }>;
}

interface TermsPageData {
  title: string;
  lastUpdated: string;
  sections: TermsSection[];
}

export default async function TermsPage() {
  const data: TermsPageData = await sanityClient.fetch(
    `*[_type == "termsPage"][0]{
      title,
      lastUpdated,
      sections[] {
        title,
        content
      }
    }`
  );

  // Fallback data
  const fallbackData: TermsPageData = {
    title: 'Terms of Service',
    lastUpdated: new Date().toISOString().split('T')[0],
    sections: [
      {
        title: 'Acceptance of Terms',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'By accessing and using the services of Performance Driven Media, you accept and agree to be bound by the terms and provision of this agreement.',
              },
            ],
          },
        ],
      },
      {
        title: 'Services',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Performance Driven Media provides video production, creative development, and direct-response marketing services. All services are provided "as is" and we make no warranties about the results or outcomes.',
              },
            ],
          },
        ],
      },
      {
        title: 'Payment Terms',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Payment terms will be specified in individual project agreements. Late payments may result in suspension of services and additional fees.',
              },
            ],
          },
        ],
      },
      {
        title: 'Intellectual Property',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Upon full payment, clients receive rights to the final deliverables as specified in their project agreement. Performance Driven Media retains the right to use work for portfolio and marketing purposes.',
              },
            ],
          },
        ],
      },
      {
        title: 'Limitation of Liability',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Performance Driven Media shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.',
              },
            ],
          },
        ],
      },
      {
        title: 'Contact Information',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'For questions about these Terms of Service, please contact us at hello@performancedrivenmedia.com',
              },
            ],
          },
        ],
      },
    ],
  };

  const pageData = data || fallbackData;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            <span className="block mb-2">{pageData.title.split(' ')[0]}</span>
            <span className="block text-red-500">
              {pageData.title.split(' ')[1]} {pageData.title.split(' ')[2]}
            </span>
          </h1>
          <p className="text-lg text-gray-300">
            Last updated: {pageData.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {pageData.sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-black text-black mb-6">
                  {section.title}
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  <PortableText value={section.content} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 
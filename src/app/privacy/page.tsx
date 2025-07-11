import { sanityClient } from '@/app/lib/sanity';
import { PortableText } from '@portabletext/react';

interface PolicySection {
  title: string;
  content: Array<{
    _type: string;
    children?: Array<{
      _type: string;
      text: string;
    }>;
  }>;
}

interface PrivacyPageData {
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export default async function PrivacyPage() {
  const data: PrivacyPageData = await sanityClient.fetch(
    `*[_type == "privacyPage"][0]{
      title,
      lastUpdated,
      sections[] {
        title,
        content
      }
    }`
  );

  // Fallback data
  const fallbackData: PrivacyPageData = {
    title: 'Privacy Policy',
    lastUpdated: new Date().toISOString().split('T')[0],
    sections: [
      {
        title: 'Information We Collect',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We collect information you provide directly to us, such as when you contact us, request a quote, or sign up for our services. This may include your name, email address, phone number, company information, and project details.',
              },
            ],
          },
        ],
      },
      {
        title: 'How We Use Your Information',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We use the information we collect to provide, maintain, and improve our services, communicate with you, process transactions, and send you technical notices and support messages.',
              },
            ],
          },
        ],
      },
      {
        title: 'Information Sharing',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.',
              },
            ],
          },
        ],
      },
      {
        title: 'Data Security',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
              },
            ],
          },
        ],
      },
      {
        title: 'Contact Us',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'If you have any questions about this Privacy Policy, please contact us at hello@performancedrivenmedia.com',
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
              {pageData.title.split(' ')[1]}
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
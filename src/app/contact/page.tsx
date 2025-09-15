// contact/page.tsx
// Contact page for Performance Driven Media. Fetches contact data from Sanity and renders contact info, form, and stats sections.

import { sanityClient } from '@/app/lib/sanity';
import ContactForm from '../components/ContactForm';

// Stat type
interface Stat {
  number: string;
  label: string;
}

// Stats section type
interface Stats {
  title: string;
  stat1: Stat;
  stat2: Stat;
  stat3: Stat;
}

// Contact info type
interface ContactInfo {
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
}

// Form section type
interface FormSection {
  title: string;
  subtitle: string;
  submitButton: string;
}

// Contact page data structure
interface ContactPageData {
  heroTitle: string;
  heroSubtitle: string;
  contactInfo: ContactInfo;
  formSection: FormSection;
  stats: Stats;
}

// Main ContactPage component
export default async function ContactPage() {
  // Fetch contact page data from Sanity CMS
  const data: ContactPageData = await sanityClient.fetch(
    `*[_type == "contactPage"][0]{
      heroTitle,
      heroSubtitle,
      contactInfo {
        title,
        description,
        email,
        phone,
        location
      },
      formSection {
        title,
        subtitle,
        submitButton
      },
      stats {
        title,
        stat1 { number, label },
        stat2 { number, label },
        stat3 { number, label }
      }
    }`
  );

  // Fallback data to prevent runtime errors
  const fallbackData: ContactPageData = {
    heroTitle: 'Ready to Build Your Story?',
    heroSubtitle: 'Affordable production. Decades of success. Let\'s make content that performs.',
    contactInfo: {
      title: 'Get in Touch',
      description: 'Ready to discuss your next project? We\'re here to help you create content that drives results.',
      email: 'hello@performancedrivenmedia.com',
      phone: '+1 (555) 123-4567',
      location: 'Los Angeles, CA'
    },
    formSection: {
      title: 'Start Your Project',
      subtitle: 'Tell us about your vision and we\'ll help bring it to life.',
      submitButton: 'Send Message'
    },
    stats: {
      title: 'Why Choose Us',
      stat1: { number: '15+', label: 'Years Experience' },
      stat2: { number: '500+', label: 'Projects Completed' },
      stat3: { number: '98%', label: 'Client Satisfaction' }
    }
  };

  const pageData = data || fallbackData;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Contact Form Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {pageData.contactInfo.title}
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {pageData.contactInfo.description}
                </p>
              </div>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href={`mailto:${pageData.contactInfo.email}`} className="text-lg text-white hover:text-red-400 transition-colors">
                      {pageData.contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl"></div>
              <div className="relative">
                <h3 className="text-3xl font-bold mb-2">
                  {pageData.formSection.title}
                </h3>
                <p className="text-gray-300 mb-8">
                  {pageData.formSection.subtitle}
                </p>
                <ContactForm submitButtonText={pageData.formSection.submitButton} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="block mb-2">Why Choose</span>
              <span className="block text-red-500">Us</span>
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: pageData.stats.stat1, icon: "🎯", delay: 0 },
              { stat: pageData.stats.stat2, icon: "🚀", delay: 200 },
              { stat: pageData.stats.stat3, icon: "⭐", delay: 400 }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-800/50 to-black/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center group hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 hover:border-red-500/50"
                style={{ animationDelay: `${item.delay}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="text-5xl md:text-6xl font-black text-red-500 mb-4 group-hover:text-red-400 transition-colors">
                  {item.stat.number}
                </div>
                <div className="text-xl text-gray-300 font-semibold">
                  {item.stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import { sanityClient } from '@/app/lib/sanity';

interface Stat {
  number: string;
  label: string;
}

interface Stats {
  title: string;
  stat1: Stat;
  stat2: Stat;
  stat3: Stat;
}

interface ContactInfo {
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
}

interface FormSection {
  title: string;
  subtitle: string;
  submitButton: string;
}

interface ContactPageData {
  heroTitle: string;
  heroSubtitle: string;
  contactInfo: ContactInfo;
  formSection: FormSection;
  stats: Stats;
}

export default async function ContactPage() {
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-700/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
            {pageData.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {pageData.heroSubtitle}
          </p>
          
          {/* Scroll Indicator */}
          <div className="mt-16 flex justify-center">
            <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23dc2626&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-red-400">
            {pageData.stats.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { stat: pageData.stats.stat1, delay: 0 },
              { stat: pageData.stats.stat2, delay: 200 },
              { stat: pageData.stats.stat3, delay: 400 }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="text-center group hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${item.delay}ms` }}
              >
                <div className="text-6xl md:text-7xl font-bold text-red-500 mb-4 group-hover:text-red-400 transition-colors">
                  {item.stat.number}
                </div>
                <div className="text-xl text-gray-300 font-medium">
                  {item.stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
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

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href={`tel:${pageData.contactInfo.phone}`} className="text-lg text-white hover:text-red-400 transition-colors">
                      {pageData.contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-lg text-white">
                      {pageData.contactInfo.location}
                    </p>
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

                <form className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Project Type"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Budget Range"
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-red-500 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={5}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-red-500 focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-black px-8 py-4 text-lg font-bold transition-colors duration-300"
                  >
                    {pageData.formSection.submitButton}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

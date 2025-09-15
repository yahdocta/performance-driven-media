// ServicesSection.tsx
// Services section component for the home page, copied from the services page

interface ServicesSectionData {
    headline: string;
    subhead: string;
    creativeDevelopment: {
        title: string;
        services: string[];
    };
    production: {
        title: string;
        services: string[];
    };
    postProduction: {
        title: string;
        services: string[];
    };
}

// Fallback data
const fallbackData: ServicesSectionData = {
    headline: 'From 30-Second Spots',
    subhead: 'to 30-Minute Epics',
    creativeDevelopment: {
        title: 'Creative Development',
        services: ['Concept ideation', 'Scriptwriting & messaging', 'Direct-response strategy']
    },
    production: {
        title: 'Production',
        services: ['On-location shoots', 'Newsroom Quality Sets', 'Multi-camera setups', 'Direction & casting']
    },
    postProduction: {
        title: 'Post-Production & Repurposing',
        services: ['Editing & pacing optimization', 'Cutdowns for social and digital', 'Landing page VSLs', 'Graphics & supers']
    }
};

export default function ServicesSection() {
    const data = fallbackData;

    return (
        <section className="py-20 px-4 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-red-100 rounded-full opacity-50"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-red-50 rounded-full opacity-50"></div>

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-8 text-black leading-tight">
                    <span className="block mb-2">{data.headline}</span>
                    <span className="block text-red-600">{data.subhead}</span>
                </h2>

                <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-16">
                    While we specialize in high-converting long-form content, we&apos;re masters of all formats—from quick social media hits to comprehensive educational campaigns.
                </p>

                {/* Services - Process Flow Layout */}
                <div className="relative mb-16">
                    {/* Process Flow Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-200 via-red-400 to-red-200 transform -translate-y-1/2 z-0"></div>

                    <div className="relative z-10 grid lg:grid-cols-3 gap-8">
                        {/* Creative Development */}
                        <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center z-20">
                                <span className="text-white font-bold text-sm">1</span>
                            </div>
                            <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-4 text-center">{data.creativeDevelopment.title}</h3>
                            <ul className="space-y-3 text-left">
                                {data.creativeDevelopment.services.map((service, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0 mt-2"></div>
                                        <span className="text-gray-700">{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Production */}
                        <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center z-20">
                                <span className="text-white font-bold text-sm">2</span>
                            </div>
                            <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-4 text-center">{data.production.title}</h3>
                            <ul className="space-y-3 text-left">
                                {data.production.services.map((service, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0 mt-2"></div>
                                        <span className="text-gray-700">{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Post-Production */}
                        <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl relative">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center z-20">
                                <span className="text-white font-bold text-sm">3</span>
                            </div>
                            <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-4 text-center">{data.postProduction.title}</h3>
                            <ul className="space-y-3 text-left">
                                {data.postProduction.services.map((service, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0 mt-2"></div>
                                        <span className="text-gray-700">{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

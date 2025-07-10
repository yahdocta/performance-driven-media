import { sanityClient } from '@/app/lib/sanity';

interface ServicesPageData {
  headline: string;
  subhead: string;
  creativeDevelopment: string[];
  production: string[];
  postProduction: string[];
  cta: {
    label: string;
    link: string;
  };
}

export default async function ServicesPage() {
  const data: ServicesPageData = await sanityClient.fetch(
    `*[_type == "servicesPage"][0]{
      headline,
      subhead,
      creativeDevelopment,
      production,
      postProduction,
      cta
    }`
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-4">{data.headline}</h1>
      <p className="text-xl text-gray-700 mb-12">{data.subhead}</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Creative Development</h2>
        <ul className="list-disc ml-6 space-y-2">
          {data.creativeDevelopment.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Production</h2>
        <ul className="list-disc ml-6 space-y-2">
          {data.production.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Post-Production & Repurposing</h2>
        <ul className="list-disc ml-6 space-y-2">
          {data.postProduction.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="mt-12 text-center">
        <a
          href={data.cta.link}
          className="inline-block bg-red-500 text-white px-8 py-4 rounded text-lg font-medium"
        >
          {data.cta.label}
        </a>
      </div>
    </main>
  );
}

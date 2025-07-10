import { sanityClient } from '@/app/lib/sanity';

interface CTA {
  label: string;
  link: string;
}

interface ContactPageData {
  headline: string;
  subhead: string;
  formFields: {
    name: string;
    email: string;
    projectType: string;
    budgetRange: string;
    message: string;
  };
  ctas: CTA[];
}

export default async function ContactPage() {
  const data: ContactPageData = await sanityClient.fetch(
    `*[_type == "contactPage"][0]{
      headline,
      subhead,
      formFields,
      ctas
    }`
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      {/* Headline */}
      <h1 className="text-4xl font-bold mb-4 text-center">{data.headline}</h1>

      {/* Subhead */}
      <p className="text-lg text-gray-700 mb-12 text-center">{data.subhead}</p>

      {/* Contact Form */}
      <form className="space-y-6">
        <input
          type="text"
          placeholder="Name"
          className="w-full border px-4 py-3 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Project Type"
          className="w-full border px-4 py-3 rounded"
        />
        <input
          type="text"
          placeholder="Budget Range"
          className="w-full border px-4 py-3 rounded"
        />
        <textarea
          placeholder="Message"
          className="w-full border px-4 py-3 rounded"
          rows={5}
        ></textarea>

        <div className="flex flex-col md:flex-row gap-4">
          {data.ctas.map((cta, idx) => (
            <a
              key={idx}
              href={cta.link}
              className="bg-red-500 text-white px-8 py-4 rounded text-center font-medium"
            >
              {cta.label}
            </a>
          ))}
        </div>
      </form>
    </main>
  );
}

import { defineType } from 'sanity';

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'subhead',
      title: 'Subhead',
      type: 'string',
    },
    {
      name: 'creativeDevelopment',
      title: 'Creative Development',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'production',
      title: 'Production',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'postProduction',
      title: 'Post-Production & Repurposing',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        { name: 'label', title: 'Button Label', type: 'string' },
        { name: 'link', title: 'Button Link', type: 'string' },
      ],
    },
  ],
});

import { defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline for the hero section',
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'string',
      description: 'Subheadline under the hero title',
    },
    {
      name: 'primaryCTA',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'url',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'url',
          title: 'Button URL',
          type: 'url',
        },
      ],
    },
    {
      name: 'introStatement',
      title: 'Intro Statement',
      type: 'text',
      description: 'Introductory text below hero section',
    },
    {
      name: 'logoCarousel',
      title: 'Logo Carousel',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Logos displayed in the trusted by section',
    },
  ],
});

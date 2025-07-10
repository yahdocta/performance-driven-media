import { defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'reelVideo',
      title: 'Reel Video',
      type: 'file',
      description: 'Autoplay looping reel video for hero background',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline text displayed over the hero video',
    },
    {
      name: 'primaryCTA',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'Use a relative path (e.g. /contact) or a full URL',
        },
      ],
    },
    {
      name: 'secondaryCTA',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'Use a relative path (e.g. /services) or a full URL',
        },
      ],
    },
    {
      name: 'logoCarousel',
      title: 'Logo Carousel',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Trusted by legal leaders, health innovators, beauty disruptors, and bold consumer brands.',
          description: 'Heading displayed above the logo carousel',
        },
        {
          name: 'logos',
          title: 'Logos',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Alternative text for accessibility',
                  validation: Rule => Rule.required(),
                },
              ],
            },
          ],
          description: 'Upload logos to display in the carousel',
        },
      ],
    },
  ],
});

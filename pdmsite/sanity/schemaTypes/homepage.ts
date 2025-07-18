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
      name: 'introHeadline',
      title: 'Intro Headline',
      type: 'string',
      description: 'Headline for the intro section (e.g., Infomercials have evolved.)',
    },
    {
      name: 'introParagraph',
      title: 'Intro Paragraph',
      type: 'text',
      description: 'Paragraph for the intro section below the headline.',
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
    {
      name: 'favicon',
      title: 'Site Favicon',
      type: 'image',
      description: 'Upload a square image (32x32 or 64x64 pixels recommended) for the browser tab icon',
      options: {
        accept: 'image/*',
      },
    },
  ],
});

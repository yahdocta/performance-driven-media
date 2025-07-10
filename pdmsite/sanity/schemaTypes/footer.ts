import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      description: 'Upload the footer logo (currently /logo.svg)',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Ready to accelerate your business growth?',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      initialValue: 'Get Started Today',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/contact',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: `© ${new Date().getFullYear()} Performance Driven Media. All rights reserved.`,
      validation: Rule => Rule.required(),
      description: 'You can customize this if needed, but it will auto-update year in the frontend.',
    }),
  ],
});

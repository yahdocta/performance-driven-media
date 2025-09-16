import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'From 30-Second Spots',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subhead',
      title: 'Subheadline',
      type: 'string',
      initialValue: 'to 30-Minute Epics',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: 'While we specialize in high-converting long-form content, we\'re masters of all formats—from quick social media hits to comprehensive educational campaigns.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'creativeDevelopment',
      title: 'Creative Development',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Creative Development',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'Concept ideation',
            'Scriptwriting & messaging',
            'Direct-response strategy'
          ],
          validation: Rule => Rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: 'production',
      title: 'Production',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Production',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'On-location shoots',
            'Newsroom Quality Sets',
            'Multi-camera setups',
            'Direction & casting'
          ],
          validation: Rule => Rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: 'postProduction',
      title: 'Post-Production & Repurposing',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Post-Production & Repurposing',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'Editing & pacing optimization',
            'Cutdowns for social and digital',
            'Landing page VSLs',
            'Graphics & supers'
          ],
          validation: Rule => Rule.required().min(1),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subhead',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Services Section',
        subtitle: subtitle || 'Services section configuration',
      };
    },
  },
});

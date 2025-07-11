import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Us Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      initialValue: 'Your Story. Our Strategy. Limitless Possibilities.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subhead',
      title: 'Subhead',
      type: 'string',
      initialValue: 'Fusing Hollywood storytelling with performance-driven strategy.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Overview Bullets',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Experience in legal, health, consumer sectors',
        'Offices in [City], clients across U.S. & Canada',
        'Leadership from TV, DRTV, and digital ad backgrounds',
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'logoStyle',
      title: 'Logo Style Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'The Racing Stripe Mark',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Symbol of motion and precision. Works in print, embroidery, animation.',
        }),
        defineField({
          name: 'image',
          title: 'Optional Logo Image',
          type: 'image',
        }),
      ],
    }),
  ],
}); 
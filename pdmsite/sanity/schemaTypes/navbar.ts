import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      initialValue: 'Performance Driven Media',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'string' },
          ],
        }),
      ],
      initialValue: [
        { label: 'Home', url: '/' },
        { label: 'Work', url: '/work' },
        { label: 'Services', url: '/services' },
        { label: 'Contact', url: '/contact' },
      ],
    }),
  ],
});

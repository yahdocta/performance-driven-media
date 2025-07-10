import { defineType } from 'sanity';

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
        name: 'videoClip',
        title: 'Short Clip',
        type: 'file',
        description: 'Short looping clip for autoplay in Work page grid',
        options: {
          accept: 'video/*',
        },
    },      
    {
        name: 'fullVideo',
        title: 'YouTube Video ID',
        type: 'string',
        description: 'e.g., dQw4w9WgXcQ',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image (optional fallback)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alternative Text', type: 'string' },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
});

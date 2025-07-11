import { defineType } from 'sanity';

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Our Services',
    },
    {
      name: 'subhead',
      title: 'Hero Subhead',
      type: 'text',
      initialValue: 'Direct-response campaigns that drive measurable results through strategic creative and cinematic production',
    },
    {
      name: 'overviewSection',
      title: 'Services Overview Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Complete Production Pipeline',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'From concept to final delivery, we handle every aspect of your direct-response campaign with precision and creativity.',
        },
      ],
    },
    {
      name: 'creativeDevelopment',
      title: 'Creative Development Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Creative Development',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'Strategic creative development that transforms your message into compelling visual narratives designed to drive action.',
        },
        {
          name: 'services',
          title: 'Services List',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'cardTitle',
          title: 'Feature Card Title',
          type: 'string',
          initialValue: 'Strategic Creative',
        },
        {
          name: 'cardDescription',
          title: 'Feature Card Description',
          type: 'text',
          initialValue: 'We develop creative concepts that resonate with your target audience and drive measurable results through compelling storytelling and strategic messaging.',
        },
      ],
    },
    {
      name: 'production',
      title: 'Production Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Production Excellence',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'Cinematic production services that bring your creative vision to life with professional quality and attention to detail.',
        },
        {
          name: 'services',
          title: 'Services List',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'cardTitle',
          title: 'Feature Card Title',
          type: 'string',
          initialValue: 'Cinematic Production',
        },
        {
          name: 'cardDescription',
          title: 'Feature Card Description',
          type: 'text',
          initialValue: 'Professional production with state-of-the-art equipment and experienced crews to capture your vision with cinematic quality and precision.',
        },
      ],
    },
    {
      name: 'postProduction',
      title: 'Post-Production Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Post-Production & Repurposing',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'Expert editing, color grading, and content repurposing to maximize your campaign\'s reach and effectiveness across all platforms.',
        },
        {
          name: 'services',
          title: 'Services List',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'cardTitle',
          title: 'Feature Card Title',
          type: 'string',
          initialValue: 'Content Optimization',
        },
        {
          name: 'cardDescription',
          title: 'Feature Card Description',
          type: 'text',
          initialValue: 'Professional editing, color grading, and strategic repurposing to create multiple assets from your core content for maximum ROI.',
        },
      ],
    },
    {
      name: 'ctaSection',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Ready to Get Started?',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'Let\'s discuss your project and create a direct-response campaign that drives real results for your business.',
        },
        {
          name: 'buttonLabel',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Get Started',
        },
        {
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
          initialValue: '/contact',
        },
      ],
    },
  ],
});

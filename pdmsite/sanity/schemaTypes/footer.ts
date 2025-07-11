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
      name: 'getInTouchTitle',
      title: 'Get In Touch Section Title',
      type: 'string',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'getInTouchSubtitle',
      title: 'Get In Touch Subtitle',
      type: 'string',
      initialValue: 'Ready to start your project?',
    }),
    defineField({
      name: 'getInTouchDescription',
      title: 'Get In Touch Description',
      type: 'text',
      initialValue: "Let's discuss how we can help drive results for your business.",
    }),
    defineField({
      name: 'contactInfoTitle',
      title: 'Contact Info Section Title',
      type: 'string',
      initialValue: 'Contact Info',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      initialValue: '(555) 123-4567',
    }),
    defineField({
      name: 'emailAddress',
      title: 'Email Address',
      type: 'string',
      initialValue: 'hello@performancedrivenmedia.com',
    }),
    defineField({
      name: 'privacyPolicyLink',
      title: 'Privacy Policy Link',
      type: 'string',
      initialValue: '/privacy',
    }),
    defineField({
      name: 'termsOfServiceLink',
      title: 'Terms of Service Link',
      type: 'string',
      initialValue: '/terms',
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

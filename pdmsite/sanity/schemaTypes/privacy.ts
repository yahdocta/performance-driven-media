import { defineType } from 'sanity';

export default defineType({
  name: 'privacyPage',
  title: 'Privacy Policy Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Privacy Policy',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    },
    {
      name: 'sections',
      title: 'Policy Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
      initialValue: [
        {
          title: 'Information We Collect',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'We collect information you provide directly to us, such as when you contact us, request a quote, or sign up for our services. This may include your name, email address, phone number, company information, and project details.',
                },
              ],
            },
          ],
        },
        {
          title: 'How We Use Your Information',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'We use the information we collect to provide, maintain, and improve our services, communicate with you, process transactions, and send you technical notices and support messages.',
                },
              ],
            },
          ],
        },
        {
          title: 'Information Sharing',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy or as required by law.',
                },
              ],
            },
          ],
        },
        {
          title: 'Data Security',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
                },
              ],
            },
          ],
        },
        {
          title: 'Contact Us',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'If you have any questions about this Privacy Policy, please contact us at hello@performancedrivenmedia.com',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}); 
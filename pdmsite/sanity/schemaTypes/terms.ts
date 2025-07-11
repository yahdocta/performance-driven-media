import { defineType } from 'sanity';

export default defineType({
  name: 'termsPage',
  title: 'Terms of Service Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Terms of Service',
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    },
    {
      name: 'sections',
      title: 'Terms Sections',
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
          title: 'Acceptance of Terms',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'By accessing and using the services of Performance Driven Media, you accept and agree to be bound by the terms and provision of this agreement.',
                },
              ],
            },
          ],
        },
        {
          title: 'Services',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Performance Driven Media provides video production, creative development, and direct-response marketing services. All services are provided "as is" and we make no warranties about the results or outcomes.',
                },
              ],
            },
          ],
        },
        {
          title: 'Payment Terms',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Payment terms will be specified in individual project agreements. Late payments may result in suspension of services and additional fees.',
                },
              ],
            },
          ],
        },
        {
          title: 'Intellectual Property',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Upon full payment, clients receive rights to the final deliverables as specified in their project agreement. Performance Driven Media retains the right to use work for portfolio and marketing purposes.',
                },
              ],
            },
          ],
        },
        {
          title: 'Limitation of Liability',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Performance Driven Media shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.',
                },
              ],
            },
          ],
        },
        {
          title: 'Contact Information',
          content: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'For questions about these Terms of Service, please contact us at hello@performancedrivenmedia.com',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}); 
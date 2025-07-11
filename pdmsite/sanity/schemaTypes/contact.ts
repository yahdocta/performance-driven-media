import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            initialValue: 'Ready to Build Your Story?',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            initialValue: 'Affordable production. Decades of success. Let\'s make content that performs.',
        }),
        defineField({
            name: 'contactInfo',
            title: 'Contact Information',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Get in Touch',
                },
                {
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    initialValue: 'Ready to discuss your next project? We\'re here to help you create content that drives results.',
                },
                {
                    name: 'email',
                    title: 'Email',
                    type: 'string',
                    initialValue: 'hello@performancedrivenmedia.com',
                },
                {
                    name: 'phone',
                    title: 'Phone',
                    type: 'string',
                    initialValue: '+1 (555) 123-4567',
                },
                {
                    name: 'location',
                    title: 'Location',
                    type: 'string',
                    initialValue: 'Los Angeles, CA',
                },
            ],
        }),
        defineField({
            name: 'formSection',
            title: 'Form Section',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Form Title',
                    type: 'string',
                    initialValue: 'Start Your Project',
                },
                {
                    name: 'subtitle',
                    title: 'Form Subtitle',
                    type: 'text',
                    initialValue: 'Tell us about your vision and we\'ll help bring it to life.',
                },
                {
                    name: 'submitButton',
                    title: 'Submit Button Text',
                    type: 'string',
                    initialValue: 'Send Message',
                },
            ],
        }),

        defineField({
            name: 'stats',
            title: 'Stats Section',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Stats Title',
                    type: 'string',
                    initialValue: 'Why Choose Us',
                },
                {
                    name: 'stat1',
                    title: 'Stat 1',
                    type: 'object',
                    fields: [
                        {name: 'number', title: 'Number', type: 'string', initialValue: '15+'},
                        {name: 'label', title: 'Label', type: 'string', initialValue: 'Years Experience'},
                    ],
                },
                {
                    name: 'stat2',
                    title: 'Stat 2',
                    type: 'object',
                    fields: [
                        {name: 'number', title: 'Number', type: 'string', initialValue: '500+'},
                        {name: 'label', title: 'Label', type: 'string', initialValue: 'Projects Completed'},
                    ],
                },
                {
                    name: 'stat3',
                    title: 'Stat 3',
                    type: 'object',
                    fields: [
                        {name: 'number', title: 'Number', type: 'string', initialValue: '98%'},
                        {name: 'label', title: 'Label', type: 'string', initialValue: 'Client Satisfaction'},
                    ],
                },
            ],
        }),
    ],
})
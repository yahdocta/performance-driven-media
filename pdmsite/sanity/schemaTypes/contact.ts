import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    fields: [
        defineField({
            name: 'headline',
            title: 'Headline',
            type: 'string',
            initialValue: 'Ready to Build Your Story?',
            readOnly: true,
        }),
        defineField({
            name: 'subhead',
            title: 'Subhead',
            type: 'string',
            initialValue: 'Affordable production. Decades of success. Let’s make content that performs.',
            readOnly: true,
        }),
        defineField({
            name: 'formFields',
            title: 'Form Fields',
            type: 'object',
            fields: [
                {name: 'name', title: 'Name', type: 'string'},
                {name: 'email', title: 'Email', type: 'string'},
                {name: 'projectType', title: 'Project Type', type: 'string'},
                {name: 'budgetRange', title: 'Budget Range', type: 'string'},
                {name: 'message', title: 'Message', type: 'text'},
            ],
        }),
        defineField({
            name: 'ctas',
            title: 'CTAs',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {name: 'label', title: 'Label', type: 'string'},
                        {name: 'link', title: 'Link', type: 'url'},
                    ],
                },
            ],
            initialValue: [
                {label: 'Start a Project', link: ''},
                {label: 'Schedule a Strategy Call', link: ''},
            ],
        }),
    ],
})
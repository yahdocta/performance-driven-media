import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'workPage',
    title: 'Work Page',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            initialValue: 'Our Work',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            initialValue: 'Direct-response campaigns that drive measurable results through strategic creative and cinematic production',
        }),
        defineField({
            name: 'heroStats',
            title: 'Hero Stats',
            type: 'object',
            fields: [
                {
                    name: 'stat1',
                    title: 'Stat 1',
                    type: 'object',
                    fields: [
                        {name: 'number', title: 'Number', type: 'string', initialValue: '100+'},
                        {name: 'label', title: 'Label', type: 'string', initialValue: 'Projects Delivered'},
                    ],
                },
                {
                    name: 'stat2',
                    title: 'Stat 2',
                    type: 'object',
                    fields: [
                        {name: 'number', title: 'Number', type: 'string', initialValue: '$50M+'},
                        {name: 'label', title: 'Label', type: 'string', initialValue: 'Revenue Generated'},
                    ],
                },
                {
                    name: 'stat3',
                    title: 'Stat 3',
                    type: 'object',
                    fields: [
                        {name: 'number', title: 'Number', type: 'string', initialValue: '24/7'},
                        {name: 'label', title: 'Label', type: 'string', initialValue: 'Support'},
                    ],
                },
            ],
        }),
        defineField({
            name: 'projectsSection',
            title: 'Projects Section',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Featured Projects',
                },
                {
                    name: 'subtitle',
                    title: 'Section Subtitle',
                    type: 'text',
                    initialValue: 'Explore our latest direct-response campaigns that drive real results for our clients',
                },
                {
                    name: 'projectBadge',
                    title: 'Project Badge Text',
                    type: 'string',
                    initialValue: 'Direct Response',
                },
                {
                    name: 'viewProjectText',
                    title: 'View Project Text',
                    type: 'string',
                    initialValue: 'View Project',
                },
            ],
        }),
        defineField({
            name: 'clientsSection',
            title: 'Clients Section',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Our Clients',
                },
                {
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    initialValue: 'We partner with leading brands, attorneys, healthcare innovators, and consumer companies to produce high-impact direct-response campaigns that drive real results.',
                },
            ],
        }),
        defineField({
            name: 'whyChooseSection',
            title: 'Why Choose Us Section',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Why Choose Performance Driven Media?',
                },
                {
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                    initialValue: 'We don\'t just produce content – we create direct-response campaigns engineered for measurable performance. From strategic creative development to cinematic production and optimized post, our team delivers video that sells, educates, and inspires action across every platform.',
                },
                {
                    name: 'ctaButton',
                    title: 'CTA Button Text',
                    type: 'string',
                    initialValue: 'Start Your Project',
                },
                {
                    name: 'ctaLink',
                    title: 'CTA Link',
                    type: 'string',
                    initialValue: '/contact',
                },
            ],
        }),
    ],
})

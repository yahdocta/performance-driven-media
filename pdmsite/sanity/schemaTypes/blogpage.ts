import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'blogPage',
    title: 'Blog Page',
    type: 'document',
    fields: [
        defineField({
            name: 'sectionTitle',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Real Results. Real Returns.',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'featuredCaseStudy',
            title: 'Featured Case Study',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                    initialValue: 'How Drill Doctor Sold 2 Million Units Through Long‑Form Infomercials',
                    validation: Rule => Rule.required(),
                },
                {
                    name: 'highlights',
                    title: 'Highlights',
                    type: 'array',
                    of: [{type: 'string'}],
                    initialValue: [
                        '30-minute demo-heavy infomercial',
                        '2M+ units sold',
                        '6 years of broadcast ROI',
                        'Visual proof + product education = success'
                    ],
                },
                {
                    name: 'ctaLabel',
                    title: 'CTA Label',
                    type: 'string',
                    initialValue: 'Read Full Case Study',
                },
                {
                    name: 'ctaLink',
                    title: 'CTA Link',
                    type: 'url',
                },
            ],
        }),
        defineField({
            name: 'otherArticles',
            title: 'Other Articles',
            type: 'array',
            of: [
                defineField({
                    name: 'article',
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: 'excerpt',
                            title: 'Excerpt',
                            type: 'text',
                        },
                        {
                            name: 'link',
                            title: 'Link',
                            type: 'url',
                        },
                    ],
                }),
            ],
            initialValue: [
                {title: 'Why Long-Form Still Wins in 2025'},
                {title: 'Short vs. Long: Where Your Funnel Actually Converts'},
                {title: 'Top Performing Infomercial Formats in 2024–2025'},
            ],
        }),
    ],
})

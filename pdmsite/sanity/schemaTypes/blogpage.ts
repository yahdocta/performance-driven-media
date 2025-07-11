import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'blogPage',
    title: 'Blog Page',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            initialValue: 'Insights & Results',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            initialValue: 'Real strategies that drive real returns. Discover the tactics behind successful performance-driven media campaigns.',
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
                    initialValue: 'Proven Performance',
                },
                {
                    name: 'stat1',
                    title: 'Stat 1',
                    type: 'object',
                    fields: [
                        {name: 'number', title: 'Number', type: 'string', initialValue: '2M+'},
                        {name: 'label', title: 'Label', type: 'string', initialValue: 'Units Sold'},
                    ],
                },
                {
                    name: 'stat2',
                    title: 'Stat 2',
                    type: 'object',
                    fields: [
                        {name: 'number', title: 'Number', type: 'string', initialValue: '6 Years'},
                        {name: 'label', title: 'Label', type: 'string', initialValue: 'ROI Tracked'},
                    ],
                },
                {
                    name: 'stat3',
                    title: 'Stat 3',
                    type: 'object',
                    fields: [
                        {name: 'number', title: 'Number', type: 'string', initialValue: '30 Min'},
                        {name: 'label', title: 'Label', type: 'string', initialValue: 'Avg. Runtime'},
                    ],
                },
            ],
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
                    name: 'subtitle',
                    title: 'Subtitle',
                    type: 'string',
                    initialValue: 'A deep dive into the strategy that revolutionized direct response television',
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
            name: 'articlesSection',
            title: 'Articles Section',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Latest Insights',
                },
                {
                    name: 'subtitle',
                    title: 'Section Subtitle',
                    type: 'text',
                    initialValue: 'Expert analysis and proven strategies from the front lines of performance-driven media.',
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
                            name: 'category',
                            title: 'Category',
                            type: 'string',
                        },
                        {
                            name: 'readTime',
                            title: 'Read Time',
                            type: 'string',
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
                {
                    title: 'Why Long-Form Still Wins in 2025',
                    excerpt: 'Despite the rise of short-form content, long-form infomercials continue to deliver superior conversion rates and ROI.',
                    category: 'Strategy',
                    readTime: '8 min read'
                },
                {
                    title: 'Short vs. Long: Where Your Funnel Actually Converts',
                    excerpt: 'Data-driven analysis of conversion rates across different content lengths and formats.',
                    category: 'Analytics',
                    readTime: '6 min read'
                },
                {
                    title: 'Top Performing Infomercial Formats in 2024–2025',
                    excerpt: 'The most effective formats, timing, and creative approaches for maximum viewer engagement.',
                    category: 'Trends',
                    readTime: '10 min read'
                },
            ],
        }),
        defineField({
            name: 'ctaSection',
            title: 'CTA Section',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'CTA Title',
                    type: 'string',
                    initialValue: 'Ready to See Real Results?',
                },
                {
                    name: 'subtitle',
                    title: 'CTA Subtitle',
                    type: 'text',
                    initialValue: 'Let\'s discuss how performance-driven media can transform your business.',
                },
                {
                    name: 'buttonText',
                    title: 'Button Text',
                    type: 'string',
                    initialValue: 'Start Your Campaign',
                },
                {
                    name: 'buttonLink',
                    title: 'Button Link',
                    type: 'url',
                },
            ],
        }),
    ],
})

import { defineType } from 'sanity';

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Services Headline',
          type: 'string',
          initialValue: 'From Idea to Air—And Everywhere in Between',
        },
        {
          name: 'subhead',
          title: 'Services Subhead',
          type: 'text',
          initialValue: 'Strategy, production, and post—optimized for performance.',
        },
        {
          name: 'creativeDevelopment',
          title: 'Creative Development',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Creative Development',
            },
            {
              name: 'services',
              title: 'Services List',
              type: 'array',
              of: [{ type: 'string' }],
              initialValue: [
                'Concept ideation',
                'Scriptwriting & messaging',
                'Direct-response strategy'
              ],
            },
          ],
        },
        {
          name: 'production',
          title: 'Production',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Production',
            },
            {
              name: 'services',
              title: 'Services List',
              type: 'array',
              of: [{ type: 'string' }],
              initialValue: [
                'On-location shoots',
                'Multi-camera setups',
                'Direction & casting'
              ],
            },
          ],
        },
        {
          name: 'postProduction',
          title: 'Post-Production & Repurposing',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Post-Production & Repurposing',
            },
            {
              name: 'services',
              title: 'Services List',
              type: 'array',
              of: [{ type: 'string' }],
              initialValue: [
                'Editing & pacing optimization',
                'Cutdowns for social and digital',
                'Landing page VSLs',
                'Graphics & supers'
              ],
            },
          ],
        },
        {
          name: 'ctaButton',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Download Services Guide',
        },
        {
          name: 'ctaLink',
          title: 'CTA Button Link',
          type: 'string',
          initialValue: '/contact',
        },
      ],
    },
    {
      name: 'industriesSection',
      title: 'Industries We Serve Section',
      type: 'object',
      fields: [
        {
          name: 'header',
          title: 'Industries Header',
          type: 'string',
          initialValue: 'From Broadcast to Scroll-Stopping Campaigns',
        },
        {
          name: 'subhead',
          title: 'Industries Subhead',
          type: 'text',
          initialValue: 'We specialize in high-conversion verticals where education, emotion, and action intersect.',
        },
        {
          name: 'industries',
          title: 'Industries List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Industry Name',
                  type: 'string',
                },
                {
                  name: 'whyItWorks',
                  title: 'Why It Works',
                  type: 'text',
                },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'Icon name (e.g., "health", "legal", "diy")',
                },
                {
                  name: 'ctaText',
                  title: 'CTA Text',
                  type: 'string',
                  initialValue: 'See Campaigns in This Category',
                },
                {
                  name: 'ctaLink',
                  title: 'CTA Link',
                  type: 'string',
                  initialValue: '/work',
                },
              ],
            },
          ],
          initialValue: [
            {
              name: 'Health & Wellness',
              whyItWorks: 'Health products thrive on education and emotional connection. Our campaigns build trust through expert testimonials and before/after results.',
              icon: 'health',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'Legal Services & Mass Torts',
              whyItWorks: 'Legal campaigns require authority and empathy. We create compelling narratives that educate viewers about their rights and options.',
              icon: 'legal',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'DIY & Household',
              whyItWorks: 'DIY products need demonstration and problem-solving. Our campaigns show real solutions to everyday household challenges.',
              icon: 'diy',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'Home & Garden',
              whyItWorks: 'Home improvement thrives on transformation. We showcase dramatic before/after results that inspire immediate action.',
              icon: 'home',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'Education & Coaching',
              whyItWorks: 'Educational content builds authority and trust. Our campaigns position experts as the solution to viewers\' challenges.',
              icon: 'education',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'Subscription & Tech',
              whyItWorks: 'Tech products need explanation and demonstration. We break down complex features into compelling benefits.',
              icon: 'tech',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'Pet Products',
              whyItWorks: 'Pet products connect through emotional bonds. Our campaigns showcase the love between pets and owners.',
              icon: 'pets',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'Beauty & Anti-Aging',
              whyItWorks: 'Beauty products sell transformation and confidence. We create aspirational content that drives immediate purchase decisions.',
              icon: 'beauty',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'Plastic Surgery',
              whyItWorks: 'Medical procedures require trust and expertise. Our campaigns build confidence through doctor testimonials and patient results.',
              icon: 'surgery',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'Auto Dealerships',
              whyItWorks: 'Auto sales need urgency and value. We create campaigns that highlight limited-time offers and exclusive deals.',
              icon: 'auto',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'Real Estate Agencies',
              whyItWorks: 'Real estate thrives on local expertise and market knowledge. We position agents as the go-to resource for buyers and sellers.',
              icon: 'realestate',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            },
            {
              name: 'Foreclosure Auctions',
              whyItWorks: 'Auctions create urgency and opportunity. We build excitement around limited inventory and exclusive access.',
              icon: 'auction',
              ctaText: 'See Campaigns in This Category',
              ctaLink: '/work'
            }
          ],
        },
      ],
    },
  ],
});

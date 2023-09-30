export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: (Rule: any) => Rule.required(),
      options: {
        source: 'name',
        slugify: (input: any) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
      validation: (Rule: any) => Rule.required().min(10).max(200),
    },
    {name: 'github', title: 'Github', type: 'url'},
    {name: 'link', title: 'Link', type: 'url'},
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      validation: (Rule: any) => Rule.required(),
      of: [
        {type: 'block'},
        {
          name: 'code',
          title: 'Code Block',
          type: 'code',
          options: {
            withFilename: true, // optional
            highlightedLines: true, // optional
          },
        },
      ],
    },
    {name: 'vercel', title: 'Vercel', type: 'boolean', initialValue: false},
    {name: 'react', title: 'React', type: 'boolean', initialValue: false},
    {name: 'next', title: 'Next.JS', type: 'boolean', initialValue: false},
    {name: 'drizzle', title: 'Drizzle ORM', type: 'boolean', initialValue: false},
    {name: 'planetscale', title: 'Planetscale', type: 'boolean', initialValue: false},
    {name: 'neon', title: 'Neon', type: 'boolean', initialValue: false},
    {name: 'cloudflare', title: 'Cloudflare', type: 'boolean', initialValue: false},
    {name: 'ai', title: 'AI', type: 'boolean', initialValue: false},
    {name: 'tailwind', title: 'Tailwind CSS', type: 'boolean', initialValue: false},
  ],
}

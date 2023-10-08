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
    {
      name: 'image',
      type: 'object',
      title: 'Images',
      fields: [
        {
          name: 'light',
          type: 'image',
          title: 'Light Image',
        },
        {
          name: 'dark',
          type: 'image',
          title: 'Dark Image',
        },
      ],
    },
    {
      name: 'repo',
      type: 'string',
      title: 'Repo',
      validation: (Rule: any) => Rule.required().min(10).max(200),
    },
    {
      name: 'branch',
      type: 'string',
      title: 'Main Branch',
      initialValue: 'main',
      validation: (Rule: any) => Rule.required().min(1).max(200),
    },
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
    {
      name: 'stack',
      type: 'object',
      title: 'Tech Stack',
      fields: [
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
    },
  ],
}

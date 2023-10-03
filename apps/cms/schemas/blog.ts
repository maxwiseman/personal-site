export default {
  name: 'blog-post',
  type: 'document',
  title: 'Blog Post',
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
      name: 'cover',
      type: 'image',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
      validation: (Rule: any) => Rule.required().min(10).max(200),
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
  ],
}

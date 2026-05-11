import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

const revalidateSite = async () => {
  // Dynamic import so `next/cache` is only loaded inside the Next.js runtime,
  // not during standalone Payload CLI usage (migrations, seeding).
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/', 'layout')
  } catch {
    // Outside a Next.js request context (e.g. CLI) — nothing to revalidate.
  }
}

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'companies',
      admin: {
        useAsTitle: 'name',
      },
      hooks: {
        afterChange: [async () => { await revalidateSite() }],
        afterDelete: [async () => { await revalidateSite() }],
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL-friendly identifier (e.g., "microsoft", "turing")',
          },
        },
        { name: 'period', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'thumbnail', type: 'text' },
        {
          name: 'logo',
          type: 'group',
          fields: [
            { name: 'dark', type: 'text' },
            { name: 'light', type: 'text' },
          ],
        },
      ],
    },
    {
      slug: 'projects',
      admin: {
        useAsTitle: 'name',
      },
      hooks: {
        afterChange: [async () => { await revalidateSite() }],
        afterDelete: [async () => { await revalidateSite() }],
      },
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL-friendly identifier (e.g., "xbox-game-pass", "turing-ai")',
          },
        },
        {
          name: 'company',
          type: 'relationship',
          relationTo: 'companies',
          required: true,
        },
        { name: 'description', type: 'textarea' },
        { name: 'thumbnail', type: 'text' },
        {
          name: 'tags',
          type: 'array',
          fields: [{ name: 'tag', type: 'text' }],
        },
        { name: 'url', type: 'text' },
        { name: 'urlName', type: 'text' },
        {
          name: 'details',
          type: 'blocks',
          blocks: [
            {
              slug: 'textDetails',
              fields: [{ name: 'content', type: 'textarea' }],
            },
            {
              slug: 'caseStudy',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'projectOverview', type: 'textarea' },
                {
                  name: 'theChallenge',
                  type: 'group',
                  fields: [
                    { name: 'heading', type: 'text' },
                    { name: 'description', type: 'textarea' },
                    {
                      name: 'interfaceQualities',
                      type: 'array',
                      fields: [{ name: 'item', type: 'text' }],
                    },
                    {
                      name: 'animationGoals',
                      type: 'array',
                      fields: [{ name: 'item', type: 'text' }],
                    },
                  ],
                },
                {
                  name: 'ourApproach',
                  type: 'group',
                  fields: [
                    { name: 'heading', type: 'text' },
                    { name: 'description', type: 'textarea' },
                    {
                      name: 'phases',
                      type: 'array',
                      fields: [
                        { name: 'name', type: 'text' },
                        {
                          name: 'points',
                          type: 'array',
                          fields: [{ name: 'point', type: 'text' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'keyOutcomes',
                  type: 'group',
                  fields: [
                    { name: 'heading', type: 'text' },
                    {
                      name: 'points',
                      type: 'array',
                      fields: [{ name: 'point', type: 'text' }],
                    },
                  ],
                },
                {
                  name: 'lessonsLearned',
                  type: 'group',
                  fields: [
                    { name: 'heading', type: 'text' },
                    {
                      name: 'points',
                      type: 'array',
                      fields: [{ name: 'point', type: 'text' }],
                    },
                  ],
                },
                { name: 'conclusion', type: 'textarea' },
              ],
            },
            {
              slug: 'simpleDetails',
              fields: [
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'phases',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text' },
                    {
                      name: 'points',
                      type: 'array',
                      fields: [{ name: 'point', type: 'text' }],
                    },
                  ],
                },
                {
                  name: 'keyOutcomes',
                  type: 'group',
                  fields: [
                    { name: 'heading', type: 'text' },
                    {
                      name: 'points',
                      type: 'array',
                      fields: [{ name: 'point', type: 'text' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'services',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'testimonials',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    schemaName: 'payload',
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})
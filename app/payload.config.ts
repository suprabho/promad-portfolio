import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

// Choose the database adapter at runtime.
// Production (Vercel) sets DATABASE_URI and uses Postgres. The SQLite adapter
// is imported *lazily* and only in development, because it depends on the
// native `libsql` module which is NOT bundled into the Vercel serverless
// function — a static import there crashes module load with
// "Cannot find module 'libsql'" on every request.
const createDatabaseAdapter = async () => {
  if (process.env.DATABASE_URI) {
    return postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI,
        // Supabase's pooler presents a self-signed cert in the chain and
        // identifies the tenant via SNI, so SSL must be ON but unverified.
        // Without this, the pooler mis-auths as bare "postgres" and fails.
        ssl: { rejectUnauthorized: false },
      },
      schemaName: 'payload',
    })
  }
  const { sqliteAdapter } = await import('@payloadcms/db-sqlite')
  return sqliteAdapter({ client: { url: 'file:./payload-db.sqlite' } })
}

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

const buildAppConfig = async () => buildConfig({
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
  // Database adapter resolved at runtime (Postgres in prod, lazy SQLite in dev).
  db: await createDatabaseAdapter(),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})

// Payload (getPayload, the CLI, and withPayload) accepts a Promise<Config>,
// so exporting the resolved async config is supported.
export default buildAppConfig()
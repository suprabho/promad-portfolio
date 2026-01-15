# Duplicate Payload CMS Setup Guide

This guide walks you through setting up a duplicate Payload CMS in another Next.js project.

---

## Prerequisites

- Next.js 15+ project
- Node.js 18+
- pnpm (or npm/yarn)

---

## Step 1: Install Dependencies

Add the required Payload packages to your new project:

```bash
pnpm add payload @payloadcms/next @payloadcms/db-sqlite @payloadcms/richtext-lexical sharp graphql
```

**Optional:** If you prefer MongoDB instead of SQLite:
```bash
pnpm add @payloadcms/db-mongodb
```

---

## Step 2: Create the Payload Config

Create `app/payload.config.ts` in your new project:

```typescript
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { buildConfig } from 'payload'

export default buildConfig({
  editor: lexicalEditor(),

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
    // Add your collections here
    // Copy from the original project or create new ones
  ],

  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',

  db: sqliteAdapter({
    client: {
      url: 'file:./payload-db.sqlite',
    },
  }),

  sharp,
})
```

---

## Step 3: Create the Admin Route Group

Create the following folder structure:

```
app/
└── (payload)/
    ├── admin/
    │   └── [[...segments]]/
    │       ├── page.tsx
    │       └── not-found.tsx
    ├── api/
    │   ├── [...slug]/
    │   │   └── route.ts
    │   ├── graphql/
    │   │   └── route.ts
    │   └── graphql-playground/
    │       └── route.ts
    ├── layout.tsx
    └── custom.scss
```

### 3.1 Create `app/(payload)/layout.tsx`

```typescript
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
```

### 3.2 Create `app/(payload)/admin/[[...segments]]/page.tsx`

```typescript
import type { Metadata } from 'next'
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
```

### 3.3 Create `app/(payload)/admin/[[...segments]]/not-found.tsx`

```typescript
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config, params, searchParams })

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config, params, searchParams, importMap })

export default NotFound
```

### 3.4 Create `app/(payload)/api/[...slug]/route.ts`

```typescript
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST } from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const OPTIONS = REST_OPTIONS(config)
```

### 3.5 Create `app/(payload)/api/graphql/route.ts`

```typescript
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import { GRAPHQL_POST } from '@payloadcms/next/routes'

export const POST = GRAPHQL_POST(config)
```

### 3.6 Create `app/(payload)/api/graphql-playground/route.ts`

```typescript
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import { GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes'

export const GET = GRAPHQL_PLAYGROUND_GET(config)
```

### 3.7 Create `app/(payload)/custom.scss`

```scss
// Add custom admin panel styles here (optional)
```

---

## Step 4: Update TypeScript Config

Add the `@payload-config` path alias to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@payload-config": ["./app/payload.config.ts"]
    }
  }
}
```

---

## Step 5: Update Next.js Config

Update `next.config.mjs` to include Payload:

```javascript
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your existing config
}

export default withPayload(nextConfig)
```

---

## Step 6: Add Environment Variables

Create or update `.env`:

```env
PAYLOAD_SECRET=your-super-secret-key-change-this
```

**Important:** Use a unique, secure secret for each project.

---

## Step 7: Create Payload Helper (Optional)

Create `lib/payload.ts` for easier data fetching:

```typescript
import { getPayload } from 'payload'
import config from '@/app/payload.config'

export async function getPayloadClient() {
  return getPayload({ config })
}

// Add your data fetching functions here
export async function getItems() {
  const payload = await getPayloadClient()

  const items = await payload.find({
    collection: 'your-collection',
    limit: 100,
  })

  return items.docs
}
```

---

## Step 8: Generate Import Map & Run

Run the development server to generate the import map:

```bash
pnpm dev
```

The first run will:
1. Generate `app/(payload)/admin/importMap.js`
2. Create the SQLite database file (`payload-db.sqlite`)

---

## Step 9: Access the Admin Panel

1. Open `http://localhost:3000/admin`
2. Create your first admin user
3. Start adding content!

---

## Files to Copy (Quick Reference)

If copying from the original project, these are the key files:

| File | Purpose |
|------|---------|
| `app/payload.config.ts` | Collections & config |
| `app/(payload)/` | Entire admin route group |
| `lib/payload.ts` | Data fetching helpers |

---

## Troubleshooting

### "Cannot find module '@payload-config'"
- Ensure `tsconfig.json` has the path alias configured
- Restart the dev server

### "Import map not found"
- Run `pnpm dev` once to generate it
- Check `app/(payload)/admin/importMap.js` exists

### Database errors
- Delete `payload-db.sqlite` and restart to reset
- Ensure the file path in config is correct

---

## Notes

- Each project has its **own database** - content is not shared
- Each project has its **own admin panel** at `/admin`
- Collections can be customized per project
- Use different `PAYLOAD_SECRET` for each project

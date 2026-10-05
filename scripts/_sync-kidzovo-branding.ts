// One-off: push the Kidzovo "Branding, social media and growth" project from
// data/companies.json into Payload WITHOUT wiping other records (unlike seed.ts).
//
// Run it locally with the production DATABASE_URI (same as _sync-kidzovo-website.ts):
//   pnpm tsx --env-file=.env --env-file=.env.local scripts/_sync-kidzovo-branding.ts
//
// This project adds a new `gallery` array to the projects collection. Payload
// pushes that schema change automatically when this script connects in
// development mode, so run it BEFORE deploying the code that reads `gallery`.
import { getPayload } from 'payload'
import config from '../app/payload.config'
import companiesData from '../data/companies.json'

const SLUG = process.env.SLUG || 'kidzovo-branding-social-media-and-growth'

const run = async () => {
  const payload = await getPayload({ config })
  const company = companiesData.companies.find((c: any) => c.name === 'Kidzovo') as any
  const p = company.projects.find((x: any) => x.name === 'Branding, social media and growth')
  const d = p.details
  const pts = (a: string[] = []) => a.map((point) => ({ point }))

  const data = {
    description: p.description,
    thumbnail: p.thumbnail,
    tags: p.tags.map((tag: string) => ({ tag })),
    url: p.url,
    urlName: p.urlName,
    gallery: (p.gallery || []).map((g: any) => ({ image: g.image, caption: g.caption || '', alt: g.alt || '' })),
    details: [
      {
        blockType: 'caseStudy',
        title: d.title,
        projectOverview: d.projectOverview,
        theChallenge: {
          heading: d.theChallenge.heading,
          description: d.theChallenge.description,
          interfaceQualities: d.theChallenge.interfaceQualities.map((item: string) => ({ item })),
          animationGoals: [],
        },
        ourApproach: {
          heading: d.ourApproach.heading,
          description: d.ourApproach.description,
          phases: d.ourApproach.phases.map((ph: any) => ({ name: ph.name, points: pts(ph.points) })),
        },
        keyOutcomes: { heading: d.keyOutcomes.heading, points: pts(d.keyOutcomes.points) },
        lessonsLearned: { heading: d.lessonsLearned.heading, points: pts(d.lessonsLearned.points) },
        conclusion: d.conclusion,
      },
    ],
  }

  const res = await payload.update({ collection: 'projects', where: { slug: { equals: SLUG } }, data: data as any })
  console.log(`Updated ${res.docs.length} doc(s):`, res.docs.map((x) => `${x.id} ${x.slug}`), 'errors:', res.errors)
  process.exit(0)
}
run()

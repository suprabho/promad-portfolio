// One-off: push the Kidzovo "Website design and development" project from
// data/companies.json into Payload WITHOUT wiping other records (unlike seed.ts).
import { getPayload } from 'payload'
import config from '../app/payload.config'
import companiesData from '../data/companies.json'

const SLUG = process.env.SLUG || 'kidzovo-website-design-and-development'

const run = async () => {
  const payload = await getPayload({ config })
  const company = companiesData.companies.find((c: any) => c.name === 'Kidzovo') as any
  const p = company.projects.find((x: any) => x.name === 'Website design and development')
  const d = p.details
  const pts = (a: string[] = []) => a.map((point) => ({ point }))

  const data = {
    description: p.description,
    thumbnail: p.thumbnail,
    tags: p.tags.map((tag: string) => ({ tag })),
    url: p.url,
    urlName: p.urlName,
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

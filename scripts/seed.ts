import { getPayload } from 'payload'
import config from '../app/payload.config'
import companiesData from '../data/companies.json'

interface ProjectDetails {
  title?: string
  projectOverview?: string
  heading?: string
  description?: string
  theChallenge?: {
    heading?: string
    description?: string
    interfaceQualities?: string[]
    animationGoals?: string[]
  }
  ourApproach?: {
    heading?: string
    description?: string
    phases?: { name: string; points: string[] }[]
  }
  keyOutcomes?: {
    heading?: string
    points?: string[]
  }
  lessonsLearned?: {
    heading?: string
    points?: string[]
  }
  phases?: { name: string; points: string[] }[]
  conclusion?: string
}

interface ProjectData {
  name: string
  description: string
  thumbnail: string
  tags: string[]
  details?: string | ProjectDetails
  url?: string
  urlName?: string
}

interface CompanyData {
  name: string
  period: string
  description: string
  thumbnail: string
  logo?: {
    dark?: string
    light?: string
  }
  projects: ProjectData[]
}

async function seed() {
  console.log('🌱 Starting database seed...\n')

  // Initialize Payload
  const payload = await getPayload({ config })

  // Clear existing data (optional - comment out if you want to preserve existing data)
  console.log('🧹 Clearing existing data...')
  
  const existingProjects = await payload.find({ collection: 'projects', limit: 1000 })
  for (const project of existingProjects.docs) {
    await payload.delete({ collection: 'projects', id: project.id })
  }
  
  const existingCompanies = await payload.find({ collection: 'companies', limit: 1000 })
  for (const company of existingCompanies.docs) {
    await payload.delete({ collection: 'companies', id: company.id })
  }
  
  console.log('✅ Cleared existing data\n')

  // Import companies and projects
  for (const company of companiesData.companies as CompanyData[]) {
    console.log(`📦 Creating company: ${company.name}`)

    // Create the company
    const createdCompany = await payload.create({
      collection: 'companies',
      data: {
        name: company.name,
        period: company.period,
        description: company.description,
        thumbnail: company.thumbnail,
        logo: {
          dark: company.logo?.dark || '',
          light: company.logo?.light || '',
        },
      },
    })

    // Create each project under this company
    for (const project of company.projects) {
      // Transform tags array to match Payload's array structure
      const tags = project.tags.map((tag: string) => ({ tag }))

      // Handle details based on type
      let detailsBlocks: any[] = []

      if (typeof project.details === 'string') {
        // Simple text details
        detailsBlocks = [{ blockType: 'textDetails', content: project.details }]
      } else if (project.details && typeof project.details === 'object') {
        const details = project.details as ProjectDetails

        if ('title' in details && details.title) {
          // Full case study format
          detailsBlocks = [
            {
              blockType: 'caseStudy',
              title: details.title,
              projectOverview: details.projectOverview || '',
              theChallenge: {
                heading: details.theChallenge?.heading || '',
                description: details.theChallenge?.description || '',
                interfaceQualities:
                  details.theChallenge?.interfaceQualities?.map((item: string) => ({
                    item,
                  })) || [],
                animationGoals:
                  details.theChallenge?.animationGoals?.map((item: string) => ({
                    item,
                  })) || [],
              },
              ourApproach: {
                heading: details.ourApproach?.heading || '',
                description: details.ourApproach?.description || '',
                phases:
                  details.ourApproach?.phases?.map((phase) => ({
                    name: phase.name,
                    points: phase.points.map((point: string) => ({ point })),
                  })) || [],
              },
              keyOutcomes: {
                heading: details.keyOutcomes?.heading || '',
                points:
                  details.keyOutcomes?.points?.map((point: string) => ({ point })) || [],
              },
              lessonsLearned: {
                heading: details.lessonsLearned?.heading || '',
                points:
                  details.lessonsLearned?.points?.map((point: string) => ({ point })) || [],
              },
              conclusion: details.conclusion || '',
            },
          ]
        } else if ('heading' in details && details.heading) {
          // Simple details format
          detailsBlocks = [
            {
              blockType: 'simpleDetails',
              heading: details.heading,
              description: details.description || '',
              phases:
                details.phases?.map((phase) => ({
                  name: phase.name,
                  points: phase.points.map((point: string) => ({ point })),
                })) || [],
              keyOutcomes: details.keyOutcomes
                ? {
                    heading: details.keyOutcomes.heading || '',
                    points:
                      details.keyOutcomes.points?.map((point: string) => ({ point })) || [],
                  }
                : undefined,
            },
          ]
        }
      }

      await payload.create({
        collection: 'projects',
        data: {
          name: project.name,
          company: createdCompany.id,
          description: project.description,
          thumbnail: project.thumbnail,
          tags,
          url: project.url || '',
          urlName: project.urlName || '',
          details: detailsBlocks,
        },
      })

      console.log(`   ✅ Created project: ${project.name}`)
    }

    console.log('')
  }

  console.log('🎉 Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Error seeding database:', err)
  process.exit(1)
})

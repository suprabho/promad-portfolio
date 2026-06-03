import { getPayload } from 'payload'
import config from '@/app/payload.config'

export async function getPayloadClient() {
  return getPayload({ config })
}

export interface CompanyFromCMS {
  id: string
  name: string
  slug: string | null
  period: string | null
  description: string | null
  thumbnail: string | null
  logo: {
    dark: string | null
    light: string | null
  } | null
}

export interface ProjectFromCMS {
  id: string
  name: string
  slug: string | null
  company: string | CompanyFromCMS
  description: string | null
  thumbnail: string | null
  tags: { tag: string | null }[] | null
  url: string | null
  urlName: string | null
  details: any[] | null
}

export interface CompanyWithProjects extends CompanyFromCMS {
  projects: ProjectFromCMS[]
}

export async function getCompaniesWithProjects(): Promise<CompanyWithProjects[]> {
  let payload
  let companies
  let projects
  try {
    payload = await getPayloadClient()

    // Fetch all companies
    companies = await payload.find({
      collection: 'companies',
      limit: 100,
    })

    // Fetch all projects with company relationship
    projects = await payload.find({
      collection: 'projects',
      limit: 100,
      depth: 1, // Populates the company relationship
    })
  } catch (err) {
    // Never let a CMS/DB failure take down the homepage with a 500.
    // Log the real error (visible in Vercel function logs) and render an empty grid.
    console.error('[getCompaniesWithProjects] Payload/DB query failed:', err)
    return []
  }

  // Group projects by company
  const companiesWithProjects: CompanyWithProjects[] = companies.docs.map((company) => {
    const companyProjects = projects.docs.filter((project) => {
      const projectCompany = project.company
      if (typeof projectCompany === 'object' && projectCompany !== null) {
        return String((projectCompany as CompanyFromCMS).id) === String(company.id)
      }
      return String(projectCompany) === String(company.id)
    })

    return {
      id: String(company.id),
      name: company.name,
      slug: company.slug ?? null,
      period: company.period ?? null,
      description: company.description ?? null,
      thumbnail: company.thumbnail ?? null,
      logo: company.logo ?? null,
      projects: companyProjects.map((project) => ({
        id: String(project.id),
        name: project.name,
        slug: project.slug ?? null,
        company: project.company,
        description: project.description ?? null,
        thumbnail: project.thumbnail ?? null,
        tags: project.tags ?? null,
        url: project.url ?? null,
        urlName: project.urlName ?? null,
        details: project.details ?? null,
      })),
    }
  })

  return companiesWithProjects
}

export async function getCompanies(): Promise<CompanyFromCMS[]> {
  let companies
  try {
    const payload = await getPayloadClient()
    companies = await payload.find({
      collection: 'companies',
      limit: 100,
    })
  } catch (err) {
    console.error('[getCompanies] Payload/DB query failed:', err)
    return []
  }

  return companies.docs.map((company) => ({
    id: String(company.id),
    name: company.name,
    slug: company.slug ?? null,
    period: company.period ?? null,
    description: company.description ?? null,
    thumbnail: company.thumbnail ?? null,
    logo: company.logo ?? null,
  }))
}

export async function getProjects(): Promise<ProjectFromCMS[]> {
  let projects
  try {
    const payload = await getPayloadClient()
    projects = await payload.find({
      collection: 'projects',
      limit: 100,
      depth: 1,
    })
  } catch (err) {
    console.error('[getProjects] Payload/DB query failed:', err)
    return []
  }

  return projects.docs.map((project) => ({
    id: String(project.id),
    name: project.name,
    slug: project.slug ?? null,
    company: project.company,
    description: project.description ?? null,
    thumbnail: project.thumbnail ?? null,
    tags: project.tags ?? null,
    url: project.url ?? null,
    urlName: project.urlName ?? null,
    details: project.details ?? null,
  }))
}

// Get a single company by slug
export async function getCompanyBySlug(slug: string): Promise<CompanyWithProjects | null> {
  let company
  let projects
  try {
    const payload = await getPayloadClient()

    const companies = await payload.find({
      collection: 'companies',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    if (companies.docs.length === 0) return null

    company = companies.docs[0]

    // Fetch projects for this company
    projects = await payload.find({
      collection: 'projects',
      where: {
        company: { equals: company.id },
      },
      limit: 100,
      depth: 1,
    })
  } catch (err) {
    console.error('[getCompanyBySlug] Payload/DB query failed:', err)
    return null
  }

  return {
    id: String(company.id),
    name: company.name,
    slug: company.slug ?? null,
    period: company.period ?? null,
    description: company.description ?? null,
    thumbnail: company.thumbnail ?? null,
    logo: company.logo ?? null,
    projects: projects.docs.map((project) => ({
      id: String(project.id),
      name: project.name,
      slug: project.slug ?? null,
      company: project.company,
      description: project.description ?? null,
      thumbnail: project.thumbnail ?? null,
      tags: project.tags ?? null,
      url: project.url ?? null,
      urlName: project.urlName ?? null,
      details: project.details ?? null,
    })),
  }
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<ProjectFromCMS | null> {
  let projects
  try {
    const payload = await getPayloadClient()

    projects = await payload.find({
      collection: 'projects',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
      depth: 1,
    })
  } catch (err) {
    console.error('[getProjectBySlug] Payload/DB query failed:', err)
    return null
  }

  if (projects.docs.length === 0) return null

  const project = projects.docs[0]
  return {
    id: String(project.id),
    name: project.name,
    slug: project.slug ?? null,
    company: project.company,
    description: project.description ?? null,
    thumbnail: project.thumbnail ?? null,
    tags: project.tags ?? null,
    url: project.url ?? null,
    urlName: project.urlName ?? null,
    details: project.details ?? null,
  }
}

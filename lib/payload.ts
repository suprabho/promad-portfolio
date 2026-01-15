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
  const payload = await getPayloadClient()

  // Fetch all companies
  const companies = await payload.find({
    collection: 'companies',
    limit: 100,
  })

  // Fetch all projects with company relationship
  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
    depth: 1, // Populates the company relationship
  })

  // Group projects by company
  const companiesWithProjects: CompanyWithProjects[] = companies.docs.map((company) => {
    const companyProjects = projects.docs.filter((project) => {
      const projectCompany = project.company
      if (typeof projectCompany === 'object' && projectCompany !== null) {
        return (projectCompany as CompanyFromCMS).id === company.id
      }
      return projectCompany === company.id
    })

    return {
      id: company.id,
      name: company.name,
      slug: company.slug ?? null,
      period: company.period ?? null,
      description: company.description ?? null,
      thumbnail: company.thumbnail ?? null,
      logo: company.logo ?? null,
      projects: companyProjects.map((project) => ({
        id: project.id,
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
  const payload = await getPayloadClient()

  const companies = await payload.find({
    collection: 'companies',
    limit: 100,
  })

  return companies.docs.map((company) => ({
    id: company.id,
    name: company.name,
    slug: company.slug ?? null,
    period: company.period ?? null,
    description: company.description ?? null,
    thumbnail: company.thumbnail ?? null,
    logo: company.logo ?? null,
  }))
}

export async function getProjects(): Promise<ProjectFromCMS[]> {
  const payload = await getPayloadClient()

  const projects = await payload.find({
    collection: 'projects',
    limit: 100,
    depth: 1,
  })

  return projects.docs.map((project) => ({
    id: project.id,
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
  const payload = await getPayloadClient()

  const companies = await payload.find({
    collection: 'companies',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  if (companies.docs.length === 0) return null

  const company = companies.docs[0]

  // Fetch projects for this company
  const projects = await payload.find({
    collection: 'projects',
    where: {
      company: { equals: company.id },
    },
    limit: 100,
    depth: 1,
  })

  return {
    id: company.id,
    name: company.name,
    slug: company.slug ?? null,
    period: company.period ?? null,
    description: company.description ?? null,
    thumbnail: company.thumbnail ?? null,
    logo: company.logo ?? null,
    projects: projects.docs.map((project) => ({
      id: project.id,
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
  const payload = await getPayloadClient()

  const projects = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    depth: 1,
  })

  if (projects.docs.length === 0) return null

  const project = projects.docs[0]
  return {
    id: project.id,
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

import companiesData from '@/data/companies.json'
import type { Project } from '@/types/project'

// Portfolio content lives in data/companies.json and is read at build time.
// The order in the file is the order on the site: the homepage grid places
// companies by index, so moving an entry moves its card.

export interface PortfolioProject extends Project {
  slug: string
  company: { name: string; slug: string }
}

export interface Company {
  name: string
  slug: string
  period: string
  description: string
  thumbnail: string
  logo?: { dark?: string; light?: string }
  projects: PortfolioProject[]
}

interface CompanyData extends Omit<Company, 'slug' | 'projects'> {
  projects: Project[]
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const companies: Company[] = (companiesData.companies as CompanyData[]).map((company) => {
  const slug = slugify(company.name)
  return {
    ...company,
    slug,
    projects: company.projects.map((project) => ({
      ...project,
      slug: slugify(`${company.name}-${project.name}`),
      company: { name: company.name, slug },
    })),
  }
})

const projects = companies.flatMap((company) => company.projects)

for (const list of [companies, projects]) {
  const seen = new Set<string>()
  for (const { slug, name } of list) {
    if (seen.has(slug)) throw new Error(`Duplicate slug "${slug}" for "${name}" in data/companies.json`)
    seen.add(slug)
  }
}

export function getCompanies(): Company[] {
  return companies
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug)
}

export function getProjects(): PortfolioProject[] {
  return projects
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return projects.find((project) => project.slug === slug)
}

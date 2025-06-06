export interface CaseStudyDetails {
  title: string
  projectOverview: string
  theChallenge: {
    heading: string
    description: string
    interfaceQualities: string[]
  }
  ourApproach: {
    heading: string
    description: string
    phases: {
      name: string
      points: string[]
    }[]
  }
  keyOutcomes: {
    heading: string
    points: string[]
  }
  lessonsLearned: {
    heading: string
    points: string[]
  }
  conclusion: string
}

export interface Project {
  name: string
  logo?: {
    dark: string
    light: string
  }
  description: string
  thumbnail: string
  tags: string[]
  details?: string | CaseStudyDetails
  url?: string
  urlName?: string
} 
export interface CaseStudyDetails {
  title: string
  projectOverview: string
  theChallenge: {
    heading: string
    description: string
    interfaceQualities?: string[]
    animationGoals?: string[]
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

export interface SimpleDetails {
  heading: string
  description: string
  phases?: {
    name: string
    points: string[]
  }[]
  keyOutcomes?: {
    heading: string
    points: string[]
  }
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
  details?: string | CaseStudyDetails | SimpleDetails
  url?: string
  urlName?: string
} 
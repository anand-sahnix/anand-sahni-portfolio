export type SectionKey = 'about' | 'skills' | 'projects' | 'deepDives' | 'journey' | 'exploring' | 'contact'

export type FeatureFlags = {
  sections: Record<SectionKey, boolean>
  contactForm: boolean
  caseStudyRoutes: boolean
  customCursor: boolean
  introAnimation: boolean
  scrollProgress: boolean
  motionDebug: boolean
}

export const flags: FeatureFlags = {
  sections: {
    about: true,
    skills: true,
    projects: true,
    deepDives: true,
    journey: true,
    exploring: true,
    contact: true,
  },
  contactForm: false,
  caseStudyRoutes: false,
  customCursor: false,
  introAnimation: true,
  scrollProgress: true,
  motionDebug: false,
}

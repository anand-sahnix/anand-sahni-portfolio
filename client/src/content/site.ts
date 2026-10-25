export type SocialId = 'github' | 'linkedin' | 'instagram' | 'x'

export type SocialLink = {
  id: SocialId
  label: string
  url: string
  showInHero: boolean
  showInFooter: boolean
}

export const site = {
  name: 'Anand Kumar Sahni',
  shortName: 'Anand',
  monogram: 'AS',
  role: 'Computer Science Engineering Student · Full-Stack Developer · AI Enthusiast',
  tagline: 'Building intelligent products at the intersection of AI and software.',
  heroSubtext:
    "I'm a Computer Science Engineering student who builds full-stack applications and AI-powered products—from LLM-driven tools to trading analytics. I care about software that is useful, well-engineered, and honest about its limits.",
  email: null,
  resumeUrl: null,
  availability: {
    show: false,
    text: null,
  },
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/anand-sahnix',
      showInHero: true,
      showInFooter: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/anand-kumar-sahni',
      showInHero: true,
      showInFooter: true,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/anandsahni__/',
      showInHero: false,
      showInFooter: true,
    },
    {
      id: 'x',
      label: 'X',
      url: 'https://x.com/sahni223Anand',
      showInHero: false,
      showInFooter: true,
    },
  ] as SocialLink[],
  siteUrl: null,
  showBuildCredit: true,
} as const

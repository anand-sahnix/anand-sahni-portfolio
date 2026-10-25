export type JourneyType = 'education' | 'program' | 'hackathon' | 'milestone' | 'achievement'

export type JourneyEntry = {
  id: string
  type: JourneyType
  title: string
  organization?: string | null
  startDate?: string | null
  endDate?: string | null
  description?: string
  link?: string | null
  outcome?: 'participated' | 'finalist' | 'winner' | 'other'
  verified: boolean
}

export const journey: JourneyEntry[] = [
  {
    id: 'btech-cse',
    type: 'education',
    title: 'B.Tech in Computer Science Engineering',
    organization: null,
    startDate: '2023-08-01',
    endDate: null,
    description: '3rd year, ongoing. Building software, systems thinking, and product instincts while learning deeply across engineering fundamentals.',
    link: null,
    verified: true,
  },
  {
    id: 'ai-learning',
    type: 'milestone',
    title: 'Working on AI-driven product ideas',
    organization: null,
    startDate: '2024-01-01',
    endDate: null,
    description: 'Exploring agent workflows, RAG systems, and practical interfaces for AI products that are useful and understandable.',
    link: null,
    verified: true,
  },
]

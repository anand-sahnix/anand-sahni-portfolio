export type ProjectCategory = 'Full-Stack' | 'AI/ML' | 'Developer Tools' | 'Finance Technology'
export type ProjectVisibility = 'public' | 'hidden' | 'draft'
export type ProjectStatus = 'concept' | 'in-progress' | 'prototype' | 'completed'

export type Project = {
  slug: string
  title: string
  featured?: boolean
  visibility: ProjectVisibility
  status?: ProjectStatus
  category: ProjectCategory[]
  problem: string
  solution: string
  stack: string[]
  image?: { src: string; alt: string; width: number; height: number } | null
  repoUrl?: string | null
  liveUrl?: string | null
  preview?: { type: 'video'; src: string; poster: string; alt: string } | null
  caseStudy?: {
    problem?: string
    whyItMatters?: string
    architecture?: { text: string; diagram?: { src: string; alt: string } | { component: string } }
    challenges?: string[]
    howItWorks?: string
    tradeoffs?: string[]
    futureImprovements?: string[]
    metrics?: { label: string; value: string; method: string }[]
  } | null
  order?: number
}

export const projects: Project[] = [
  {
    slug: 'ai-mock-interview',
    title: 'AI Powered Mock Interview Platform',
    featured: true,
    visibility: 'public',
    status: 'in-progress',
    category: ['Full-Stack', 'AI/ML'],
    problem: 'Interview practice rarely gives structured, immediate feedback.',
    solution: 'A mock interview app that evaluates answers and presents actionable feedback to help candidates improve.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'LLM API'],
    repoUrl: null,
    liveUrl: null,
    caseStudy: {
      problem: 'Candidates often practice interviews without realistic coaching or a clear signal on how to improve.',
      whyItMatters: 'Interview performance is highly situational, so structured feedback helps users improve faster than generic advice.',
      architecture: {
        text: 'The product combines a conversational interview flow with backend orchestration, evaluation logic, and persistence to score responses over time.',
      },
      challenges: ['Designing realistic prompts without unpredictable answer quality', 'Keeping the feedback specific and actionable'],
      howItWorks: 'The frontend guides the interview, the backend manages session state, and the model evaluates answers against interview criteria.',
      tradeoffs: ['Prioritising reliability over richer multimodal interactions', 'Keeping evaluation grounded in clear rubric criteria'],
      futureImprovements: ['Session analytics for trends over time', 'Adaptive question generation based on user weak spots'],
    },
    order: 1,
  },
  // {
  //   slug: 'red-thread',
  //   title: 'Red Thread',
  //   featured: false,
  //   visibility: 'public',
  //   status: 'concept',
  //   category: ['AI/ML', 'Full-Stack'],
  //   problem: 'Detective games with free-form NPCs often break case logic.',
  //   solution: 'A concept for a narrative investigation game where clue state and suspect knowledge stay deterministic while NPC dialogue remains conversational.',
  //   stack: ['React', 'Node.js', 'LLM API'],
  //   repoUrl: null,
  //   liveUrl: null,
  //   caseStudy: {
  //     problem: 'Narrative games can feel inconsistent when the story logic drifts away from the actual evidence trail.',
  //     whyItMatters: 'A detective experience only works when the player can trust that clues and knowledge are consistent.',
  //     architecture: {
  //       text: 'The design centers on a clear world state that governs what each suspect knows and what evidence the player has discovered.',
  //     },
  //     challenges: ['Controlling AI-generated conversations without breaking case integrity', 'Balancing story freedom against deterministic logic'],
  //     howItWorks: 'The app tracks clues, evidence, and social context, then feeds only relevant context to the model for suspect dialogue.',
  //     tradeoffs: ['Less unrestricted chat, more reliable puzzle structure', 'Stronger game logic than fully open-ended storytelling'],
  //     futureImprovements: ['A stronger clue graph and branching narrative states', 'Dynamic difficulty tuning for clue hints'],
  //   },
  //   order: 2,
  // },
  {
    slug: 'tradeiq',
    title: 'TradeIQ',
    featured: false,
    visibility: 'public',
    status: 'in-progress',
    category: ['Finance Technology', 'Full-Stack'],
    problem: 'Traders need clearer analysis and disciplined risk control.',
    solution: 'A trading-analysis and risk-management experience designed to surface signals and keep decisions grounded in defined process.',
    stack: ['Python', 'React', 'Node.js'],
    repoUrl: null,
    liveUrl: null,
    caseStudy: {
      problem: 'Fast-moving market decisions can become noisy when teams lack a structured way to interpret data and risk.',
      whyItMatters: 'Good trading tools help users think more clearly, not just react faster.',
      architecture: {
        text: 'The concept blends data views, decision support, and risk checks into a workflow that is easy to reason about.',
      },
      challenges: ['Deciding which signals are truly actionable vs. distracting', 'Designing for clarity under time pressure'],
      howItWorks: 'Core workflows surface relevant market context and risk checks before a user acts, reducing the chance of impulsive decisions.',
      tradeoffs: ['Strong process over exhaustive data density', 'Simple decision surfaces before deep analytics'],
      futureImprovements: ['Scenario testing and risk simulation', 'Cross-asset comparison and portfolio-level views'],
    },
    order: 3,
  },
  {
    slug: 'hr-knowledge-assistant',
    title: 'HR Knowledge Assistant',
    featured: false,
    visibility: 'public',
    status: 'in-progress',
    category: ['AI/ML'],
    problem: 'Employees struggle to find accurate HR policy answers.',
    solution: 'A retrieval-augmented generation app that answers workforce questions using policy documents and verified knowledge sources.',
    stack: ['Python', 'Vector store', 'LLM API'],
    repoUrl: null,
    liveUrl: null,
    caseStudy: {
      problem: 'Policy questions often fail because people search through scattered documents instead of asking one clear question.',
      whyItMatters: 'An HR assistant should improve access to accurate information without making people second-guess official guidance.',
      architecture: {
        text: 'The system indexes policy sources, retrieves relevant documents, and answers question prompts with grounded context from the source corpus.',
      },
      challenges: ['Maintaining trust through source-grounded answers', 'Handling ambiguous policy questions carefully'],
      howItWorks: 'The app retrieves the most relevant policy sections and uses them as context before producing an answer.',
      tradeoffs: ['Grounded answers over confident speculation', 'A narrow but more reliable response pattern'],
      futureImprovements: ['Citation quality improvements', 'Better support for multi-document comparisons'],
    },
    order: 4,
  },
  {
    slug: 'ai-mystery-room',
    title: 'AI Mystery Room',
    featured: false,
    visibility: 'public',
    status: 'in-progress',
    category: ['AI/ML', 'Full-Stack'],
    problem: 'Investigation games often lack evidence-driven logic.',
    solution: 'An interactive mystery experience built around evidence, scenarios, and culprit discovery using structured decision-making.',
    stack: ['React', 'Node.js', 'LLM API'],
    repoUrl: null,
    liveUrl: null,
    caseStudy: {
      problem: 'Narrative games often feel arbitrary because the player can ask for anything without consistent evidence rules.',
      whyItMatters: 'A mystery experience needs to be puzzle-like, not just chat-based.',
      architecture: {
        text: 'The experience keeps evidence state explicit so every clue, deduction, and suspect interaction stays grounded in the scenario.',
      },
      challenges: ['Balancing player freedom with scenario constraints', 'Making clue logic understandable'],
      howItWorks: 'The game tracks narrative evidence and only reveals actions that make sense in the current state of the investigation.',
      tradeoffs: ['More structured exploration than open-ended dialogue', 'Predictable logic over chaotic improvisation'],
      futureImprovements: ['Expanded branching narratives', 'More dynamic clue generation and difficulty ramps'],
    },
    order: 5,
  },
]

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { z } from 'zod'

const bannedPhrases = [
  'lorem ipsum',
  'todo:',
  'coming soon',
  'click here',
  'best in the world',
  'revolutionary',
  'world-class',
  'ninja',
  'elite',
  'top performer',
]

const allowedSchemes = ['http:', 'https:', 'mailto:']

const socialIdSchema = z.enum(['github', 'linkedin', 'instagram', 'x'])
const siteSchema = z.object({
  name: z.literal('Anand Kumar Sahni'),
  shortName: z.literal('Anand'),
  monogram: z.literal('AS'),
  role: z.string(),
  tagline: z.string(),
  heroSubtext: z.string(),
  email: z.string().nullable(),
  resumeUrl: z.string().nullable(),
  availability: z.object({
    show: z.boolean(),
    text: z.string().nullable(),
  }),
  socials: z.array(
    z.object({
      id: socialIdSchema,
      label: z.string(),
      url: z.string(),
      showInHero: z.boolean(),
      showInFooter: z.boolean(),
    }),
  ),
  siteUrl: z.string().nullable(),
  showBuildCredit: z.boolean(),
})

const aboutSchema = z.object({
  heading: z.string(),
  paragraphs: z.array(z.string()).min(1),
  interests: z.array(z.string()).min(1),
  photo: z.any().nullable(),
})

const skillCategorySchema = z.enum(['frontend', 'backend', 'languages', 'databases', 'ai', 'tools', 'core-cs'])
const projectCategorySchema = z.enum(['Full-Stack', 'AI/ML', 'Developer Tools', 'Finance Technology'])
const projectStatusSchema = z.enum(['concept', 'in-progress', 'prototype', 'completed'])

const skillSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  category: skillCategorySchema,
  icon: z.string().optional(),
  visible: z.boolean().optional(),
})

const skillCategoryConfigSchema = z.object({
  id: skillCategorySchema,
  label: z.string().min(1),
  description: z.string().min(1),
})

const skillsFileSchema = z.object({
  skills: z.array(skillSchema).min(1),
  skillCategories: z.array(skillCategoryConfigSchema).min(1),
})

const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  featured: z.boolean().optional(),
  visibility: z.enum(['public', 'hidden', 'draft']),
  status: projectStatusSchema.optional(),
  category: z.array(projectCategorySchema).min(1),
  problem: z.string().max(140),
  solution: z.string().max(200),
  stack: z.array(z.string()).min(1),
  image: z.any().nullable().optional(),
  repoUrl: z.string().nullable().optional(),
  liveUrl: z.string().nullable().optional(),
  preview: z.any().nullable().optional(),
  caseStudy: z.any().nullable().optional(),
  order: z.number().int().optional(),
})

const journeyEntrySchema = z.object({
  id: z.string().min(1),
  type: z.enum(['education', 'program', 'hackathon', 'milestone', 'achievement']),
  title: z.string().min(1),
  organization: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  description: z.string().optional(),
  link: z.string().nullable().optional(),
  outcome: z.enum(['participated', 'finalist', 'winner', 'other']).optional(),
  verified: z.boolean(),
})

const exploringItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  note: z.string().min(1),
  icon: z.string().min(1),
  updated: z.string().optional(),
})

const flagsSchema = z.object({
  sections: z.object({
    about: z.boolean(),
    skills: z.boolean(),
    projects: z.boolean(),
    deepDives: z.boolean(),
    journey: z.boolean(),
    exploring: z.boolean(),
    contact: z.boolean(),
  }),
  contactForm: z.boolean(),
  caseStudyRoutes: z.boolean(),
  customCursor: z.boolean(),
  introAnimation: z.boolean(),
  scrollProgress: z.boolean(),
  motionDebug: z.boolean(),
})

const contentFiles = [
  ['src/content/site.ts', siteSchema],
  ['src/content/about.ts', aboutSchema],
  ['src/content/skills.ts', skillsFileSchema],
  ['src/content/projects.ts', z.array(projectSchema)],
  ['src/content/journey.ts', z.array(journeyEntrySchema)],
  ['src/content/exploring.ts', z.array(exploringItemSchema)],
  ['src/content/flags.ts', flagsSchema],
] as const

const rootDir = process.cwd()

function fail(message: string): never {
  console.error(message)
  process.exit(1)
}

function assertNoTODO(value: string, filePath: string) {
  if (value.toLowerCase().includes('todo:')) {
    fail(`${filePath}: contains TODO placeholder`)
  }
}

function assertBannedPhrases(value: string, filePath: string) {
  const lower = value.toLowerCase()
  for (const phrase of bannedPhrases) {
    if (lower.includes(phrase)) {
      fail(`${filePath}: banned phrase detected: ${phrase}`)
    }
  }
}

function assertUrl(url: string | null | undefined, filePath: string, label: string) {
  if (url == null || url === '') return

  try {
    const parsed = new URL(url, 'https://example.com')
    const scheme = parsed.protocol
    if (!allowedSchemes.includes(scheme) && !url.startsWith('/')) {
      fail(`${filePath}: invalid URL for ${label}: ${url}`)
    }
  } catch {
    fail(`${filePath}: invalid URL for ${label}: ${url}`)
  }

  if (url.includes(' ')) {
    fail(`${filePath}: invalid URL for ${label}: ${url}`)
  }
}

async function validateContentFile(filePath: string, schema: z.ZodTypeAny) {
  const fullPath = join(rootDir, filePath)
  const source = readFileSync(fullPath, 'utf8')
  assertNoTODO(source, filePath)
  assertBannedPhrases(source, filePath)

  const moduleUrl = pathToFileURL(fullPath).href
  const mod = await import(moduleUrl)
  const value = filePath.endsWith('skills.ts') ? mod : Object.values(mod).find((entry) => entry && typeof entry === 'object')

  if (!value) {
    fail(`${filePath}: module has no exported data`)
  }

  const parsed = schema.safeParse(value)
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => `${issue.path.join('.')} => ${issue.message}`).join('; ')
    fail(`${filePath}: schema validation failed: ${issues}`)
  }

  if (filePath.endsWith('site.ts')) {
    const site = value as z.infer<typeof siteSchema>
    assertUrl(site.email, filePath, 'email')
    assertUrl(site.resumeUrl, filePath, 'resumeUrl')
    assertUrl(site.siteUrl, filePath, 'siteUrl')
    site.socials.forEach((social) => assertUrl(social.url, filePath, social.id))
  }

  if (filePath.endsWith('projects.ts')) {
    const projects = value as z.infer<typeof projectSchema>[]
    const slugs = new Set<string>()
    for (const project of projects) {
      if (slugs.has(project.slug)) fail(`${filePath}: duplicate project slug: ${project.slug}`)
      slugs.add(project.slug)
      if (project.category.length === 0) fail(`${filePath}: project ${project.slug} has empty category list`)
      if (project.repoUrl) assertUrl(project.repoUrl, filePath, `${project.slug} repoUrl`)
      if (project.liveUrl) assertUrl(project.liveUrl, filePath, `${project.slug} liveUrl`)
    }
  }

  if (filePath.endsWith('journey.ts')) {
    const entries = value as z.infer<typeof journeyEntrySchema>[]
    const ids = new Set<string>()
    for (const entry of entries) {
      if (ids.has(entry.id)) fail(`${filePath}: duplicate journey id: ${entry.id}`)
      ids.add(entry.id)
    }
  }

  if (filePath.endsWith('exploring.ts')) {
    const items = value as z.infer<typeof exploringItemSchema>[]
    const ids = new Set<string>()
    for (const item of items) {
      if (ids.has(item.id)) fail(`${filePath}: duplicate exploring id: ${item.id}`)
      ids.add(item.id)
    }
  }

  if (filePath.endsWith('skills.ts')) {
    const skillSet = value as z.infer<typeof skillsFileSchema>
    const ids = new Set<string>()
    for (const skill of skillSet.skills ?? []) {
      if (ids.has(skill.id)) fail(`${filePath}: duplicate skill id: ${skill.id}`)
      ids.add(skill.id)
    }
    if (!skillSet.skillCategories || skillSet.skillCategories.length === 0) {
      fail(`${filePath}: skill categories are empty`)
    }
  }
}

async function main() {
  const contentDir = join(rootDir, 'src/content')
  const listed = ['src/content/site.ts', 'src/content/about.ts', 'src/content/skills.ts', 'src/content/projects.ts', 'src/content/journey.ts', 'src/content/exploring.ts', 'src/content/flags.ts']

  for (const file of listed) {
    if (!statSync(join(rootDir, file)).isFile()) {
      fail(`${file}: missing file`)
    }
  }

  for (const [filePath, schema] of contentFiles) {
    await validateContentFile(filePath, schema)
  }

  const assetFiles = new Set<string>()
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) walk(fullPath)
      else assetFiles.add(fullPath)
    }
  }
  walk(contentDir)

  if (assetFiles.size === 0) {
    fail('No content files were discovered')
  }

  console.log('Content validation passed')
}

void main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error)
  fail(message)
})

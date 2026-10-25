import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bot,
  BookOpen,
  Briefcase,
  ChevronRight,
  Code2,
  Database,
  ExternalLink,
  Globe,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'
import { about } from './content/about'
import { flags } from './content/flags'
import { exploring } from './content/exploring'
import { journey } from './content/journey'
import { projects } from './content/projects'
import { site } from './content/site'
import { skills, skillCategories } from './content/skills'

const navSections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

const socialIcons = {
  github: Globe,
  linkedin: Globe,
  instagram: Globe,
  x: Globe,
} as const

const focusIconMap = {
  sparkles: Sparkles,
  database: Database,
  chart: BarChart3,
  bot: Bot,
} as const

function App() {
  const publicProjects = projects.filter((project) => project.visibility === 'public')
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [navVisible, setNavVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const shouldSetScrolled = window.scrollY > 24
      setIsScrolled(shouldSetScrolled)

      const currentScrollY = window.scrollY
      if (currentScrollY > 400) {
        setNavVisible(false)
      } else {
        setNavVisible(true)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    const targets = document.querySelectorAll('section[id], footer[id]')
    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  const categories = useMemo(
    () => ['All', ...new Set(publicProjects.flatMap((project) => project.category))],
    [publicProjects],
  )

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return publicProjects
    }
    return publicProjects.filter((project) => project.category.includes(activeFilter as (typeof project.category)[number]))
  }, [activeFilter, publicProjects])

  const visibleNavItems = navSections.filter((section) => {
    if (section.id === 'projects') {
      return publicProjects.length > 0 && flags.sections.projects
    }
    return flags.sections[section.id as keyof typeof flags.sections]
  })

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <header className={`topbar ${isScrolled ? 'scrolled' : ''} ${!navVisible ? 'hidden' : ''}`}>
        <div className="container nav-shell">
          <a className="brand" href="#home" aria-label="Go to home section">
            <span className="brand-mark">AS</span>
            <span className="brand-name">{site.shortName}</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {visibleNavItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'nav-link active' : 'nav-link'}
              >
                {item.label}
              </a>
            ))}
            {site.resumeUrl ? (
              <a href={site.resumeUrl} className="button button-primary nav-resume" target="_blank" rel="noreferrer noopener">
                Resume
              </a>
            ) : null}
          </nav>

          <button
            type="button"
            className="menu-toggle"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="mobile-menu" role="dialog" aria-modal="true">
            <div className="mobile-menu-inner">
              {visibleNavItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="mobile-link"
                  style={{ transitionDelay: `${index * 40}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {site.resumeUrl ? (
                <a href={site.resumeUrl} className="button button-primary" target="_blank" rel="noreferrer noopener">
                  Resume
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>

      <main id="main">
        <section id="home" className="hero-section section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Anand Kumar Sahni · CSE Student</p>
              <h1>
                Building intelligent products at the intersection of{' '}
                <span className="gradient-text">AI and software</span>.
              </h1>
              <p className="lead">{site.heroSubtext}</p>

              {site.availability.show && site.availability.text ? (
                <div className="availability" aria-live="polite">
                  <span className="availability-dot" aria-hidden="true" />
                  <span>{site.availability.text}</span>
                </div>
              ) : null}

              <div className="cta-row">
                <a href="#projects" className="button button-primary">
                  Explore My Projects <ArrowRight size={18} />
                </a>
                <a href="#contact" className="button button-secondary">
                  Contact Me
                </a>
              </div>

              <div className="hero-socials" aria-label="Social links">
                {site.socials
                  .filter((social) => social.showInHero)
                  .map((social) => {
                    const Icon = socialIcons[social.id]
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        className="icon-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <Icon size={18} />
                      </a>
                    )
                  })}
              </div>
            </div>

            <div className="signal-graph" aria-hidden="true">
              <div className="graph-orb orb-one" />
              <div className="graph-orb orb-two" />
              <div className="graph-node node-1" />
              <div className="graph-node node-2" />
              <div className="graph-node node-3" />
              <div className="graph-node node-4" />
              <div className="graph-node node-5" />
              <div className="graph-node node-6" />
              <div className="graph-line line-1" />
              <div className="graph-line line-2" />
              <div className="graph-line line-3" />
              <div className="graph-line line-4" />
            </div>
          </div>
          <div className="scroll-indicator" aria-hidden="true">
            <span className="scroll-line" />
            <span className="scroll-dot" />
          </div>
        </section>

        {flags.sections.about ? (
          <section id="about" className="section">
            <div className="container">
              <div className="section-heading-row">
                <p className="section-label">01 — About</p>
                <h2>{about.heading}</h2>
              </div>

              <div className="about-grid">
                <div className="about-copy">
                  {about.paragraphs.map((paragraph, index) => (
                    <p key={`${paragraph}-${index}`}>{paragraph}</p>
                  ))}

                  <div className="focus-card">
                    <div className="focus-header">
                      <Briefcase size={16} />
                      <span>Current focus</span>
                    </div>
                    <ul>
                      {exploring.slice(0, 3).map((item) => {
                        const Icon = focusIconMap[item.icon as keyof typeof focusIconMap] ?? Code2
                        return (
                          <li key={item.id}>
                            <Icon size={14} />
                            <span>{item.title}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

                <div className="about-side">
                  <div className="interest-wrap">
                    <p className="section-kicker">Interests</p>
                    <div className="chip-list">
                      {about.interests.map((interest) => (
                        <span key={interest} className="chip">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {flags.sections.skills ? (
          <section id="skills" className="section">
            <div className="container">
              <div className="section-heading-row">
                <p className="section-label">02 — Skills</p>
                <h2>Tools, systems, and product instincts</h2>
              </div>

              <div className="skills-grid">
                {skillCategories.map((category) => {
                  const categorySkills = skills.filter((skill) => skill.category === category.id)
                  if (categorySkills.length === 0) return null

                  return (
                    <div key={category.id} className="skill-card">
                      <div className="skill-header">
                        <h3>{category.label}</h3>
                        <p>{category.description}</p>
                      </div>
                      <div className="skill-list">
                        {categorySkills.map((skill) => (
                          <span key={skill.id} className="skill-chip">
                            <Code2 size={12} />
                            {skill.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {flags.sections.projects && publicProjects.length > 0 ? (
          <section id="projects" className="section">
            <div className="container">
              <div className="section-heading-row projects-head">
                <div>
                  <p className="section-label">03 — Projects</p>
                  <h2>Selected work and experiments</h2>
                </div>
                <div className="filter-row" aria-label="Project filters" role="tablist">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={activeFilter === category ? 'filter-chip active' : 'filter-chip'}
                      role="tab"
                      aria-pressed={activeFilter === category}
                      onClick={() => setActiveFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="project-grid" aria-live="polite">
                {filteredProjects.map((project) => {
                  const hue = (project.slug.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360) + 30
                  const visibleStack = project.stack.slice(0, 5)
                  const overflow = project.stack.length > 5 ? project.stack.length - 5 : 0

                  return (
                    <article key={project.slug} className="project-card">
                      <div className="project-visual" style={{ ['--project-hue' as string]: hue }}>
                        <div className="project-pattern" aria-hidden="true" />
                        <span>{project.title.slice(0, 2).toUpperCase()}</span>
                      </div>

                      <div className="project-body">
                        <div className="meta-row">
                          {project.status ? <span className="badge status-badge">{project.status}</span> : null}
                          {project.category.slice(0, 2).map((category) => (
                            <span key={`${project.slug}-${category}`} className="badge category-badge">
                              {category}
                            </span>
                          ))}
                        </div>

                        <h3>{project.title}</h3>
                        <p className="problem-copy">{project.problem}</p>
                        <p className="solution-copy">{project.solution}</p>

                        <div className="stack-row">
                          {visibleStack.map((item) => (
                            <span key={`${project.slug}-${item}`} className="stack-chip">
                              {item}
                            </span>
                          ))}
                          {overflow > 0 ? <span className="stack-chip more">+{overflow}</span> : null}
                        </div>

                        <div className="card-actions">
                          {project.repoUrl ? (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                              GitHub <ExternalLink size={14} />
                            </a>
                          ) : null}
                          {project.liveUrl ? (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              Live demo <ExternalLink size={14} />
                            </a>
                          ) : null}
                          {project.caseStudy ? (
                            <a href="#deep-dives">
                              Deep dive <ChevronRight size={14} />
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {flags.sections.deepDives && projects.some((project) => project.caseStudy) ? (
          <section id="deep-dives" className="section">
            <div className="container">
              <div className="section-heading-row">
                <p className="section-label">04 — Deep Dives</p>
                <h2>Design thinking behind the ideas</h2>
              </div>

              <div className="deep-dive-list">
                {projects
                  .filter((project) => project.caseStudy)
                  .map((project) => (
                    <article key={project.slug} className="deep-dive-item">
                      <div className="deep-dive-header">
                        <div>
                          <h3>{project.title}</h3>
                          <p>{project.solution}</p>
                        </div>
                        {project.status ? <span className="badge status-badge">{project.status}</span> : null}
                      </div>

                      <div className="deep-dive-body">
                        {project.caseStudy?.problem ? <div><h4>The Problem</h4><p>{project.caseStudy.problem}</p></div> : null}
                        {project.caseStudy?.whyItMatters ? <div><h4>Why It Matters</h4><p>{project.caseStudy.whyItMatters}</p></div> : null}
                        {project.caseStudy?.architecture ? <div><h4>Architecture & Technical Decisions</h4><p>{project.caseStudy.architecture.text}</p></div> : null}
                        {project.caseStudy?.challenges && project.caseStudy.challenges.length > 0 ? <div><h4>Major Challenges</h4><ul>{project.caseStudy.challenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul></div> : null}
                        {project.caseStudy?.howItWorks ? <div><h4>How the Solution Works</h4><p>{project.caseStudy.howItWorks}</p></div> : null}
                        {project.caseStudy?.tradeoffs && project.caseStudy.tradeoffs.length > 0 ? <div><h4>Trade-offs & Limitations</h4><ul>{project.caseStudy.tradeoffs.map((tradeoff) => <li key={tradeoff}>{tradeoff}</li>)}</ul></div> : null}
                        {project.caseStudy?.futureImprovements && project.caseStudy.futureImprovements.length > 0 ? <div><h4>Future Improvements</h4><ul>{project.caseStudy.futureImprovements.map((item) => <li key={item}>{item}</li>)}</ul></div> : null}
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </section>
        ) : null}

        {flags.sections.journey && journey.length > 0 ? (
          <section id="journey" className="section">
            <div className="container">
              <div className="section-heading-row">
                <p className="section-label">05 — Journey</p>
                <h2>Building toward stronger product thinking</h2>
              </div>

              <div className="timeline">
                {journey.map((entry) => (
                  <article key={entry.id} className="timeline-item">
                    <div className="timeline-dot" aria-hidden="true" />
                    <div className="timeline-card">
                      <span className="timeline-type">{entry.type}</span>
                      <h3>{entry.title}</h3>
                      {entry.organization ? <p className="timeline-org">{entry.organization}</p> : null}
                      {entry.description ? <p>{entry.description}</p> : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {flags.sections.exploring && exploring.length > 0 ? (
          <section id="exploring" className="section">
            <div className="container">
              <div className="section-heading-row">
                <p className="section-label">06 — Exploring</p>
                <h2>Current interests and learning loops</h2>
              </div>

              <div className="exploring-grid">
                {exploring.map((item) => {
                  const Icon = focusIconMap[item.icon as keyof typeof focusIconMap] ?? BookOpen
                  return (
                    <article key={item.id} className="exploring-card">
                      <div className="exploring-icon">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: item.note }} />
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {flags.sections.contact ? (
          <section id="contact" className="section">
            <div className="container contact-grid">
              <div>
                <p className="section-label">07 — Contact</p>
                <h2>Let&apos;s build something useful.</h2>
                <p className="contact-copy">If you are looking for a builder who enjoys product thinking, strong engineering fundamentals, and practical AI integration, I&apos;d love to connect.</p>
                {site.email ? (
                  <a href={`mailto:${site.email}`} className="contact-email">
                    {site.email}
                  </a>
                ) : (
                  <p className="contact-fallback">Find me on GitHub or LinkedIn.</p>
                )}

                <div className="contact-links">
                  {site.socials.map((social) => {
                    const Icon = socialIcons[social.id]
                    return (
                      <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="social-link">
                        <Icon size={16} />
                        <span>{social.label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>

              {!flags.contactForm ? (
                <div className="contact-panel">
                  <p>Prefer a quick intro?</p>
                  <a href={site.socials[0]?.url ?? '#home'} target="_blank" rel="noopener noreferrer" className="button button-primary">
                    Reach out on GitHub <ArrowRight size={18} />
                  </a>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}
      </main>

      <footer id="footer">
        <div className="container footer-row">
          <div className="footer-brand">
            <span className="brand-mark">AS</span>
            <span>{site.name}</span>
          </div>

          <nav aria-label="Footer navigation" className="footer-nav">
            {visibleNavItems.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-actions">
            {site.socials
              .filter((social) => social.showInFooter)
              .map((social) => {
                const Icon = socialIcons[social.id]
                return (
                  <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <Icon size={16} />
                  </a>
                )
              })}
            <a href="#home" className="back-top" aria-label="Back to top">
              <ArrowUp size={16} />
            </a>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {currentYear} {site.name}</p>
          {site.showBuildCredit ? <p className="build-credit">Built with Love</p> : null}
        </div>
      </footer>
    </>
  )
}

export default App

export type SkillCategoryId =
  | 'frontend'
  | 'backend'
  | 'languages'
  | 'databases'
  | 'ai'
  | 'tools'
  | 'core-cs'

export type Skill = {
  id: string
  label: string
  category: SkillCategoryId
  icon?: string
  visible?: boolean
}

export const skillCategories: Array<{ id: SkillCategoryId; label: string; description: string }> = [
  { id: 'frontend', label: 'Frontend Development', description: 'Interfaces and interactive experiences' },
  { id: 'backend', label: 'Backend Development', description: 'APIs, services, and application logic' },
  { id: 'languages', label: 'Programming Languages', description: 'Core problem-solving languages' },
  { id: 'databases', label: 'Databases', description: 'Data modeling and persistence' },
  { id: 'ai', label: 'AI and Generative AI', description: 'LLMs, RAG, and agent workflows' },
  { id: 'tools', label: 'Developer Tools', description: 'Shipping and improving software' },
  { id: 'core-cs', label: 'Core Computer Science', description: 'Foundations that support product quality' },
]

export const skills: Skill[] = [
  { id: 'html', label: 'HTML', category: 'frontend', visible: true },
  { id: 'css', label: 'CSS', category: 'frontend', visible: true },
  { id: 'javascript', label: 'JavaScript', category: 'frontend', visible: true },
  { id: 'react', label: 'React', category: 'frontend', visible: true },
  { id: 'tailwind', label: 'Tailwind CSS', category: 'frontend', visible: true },
  { id: 'vite', label: 'Vite', category: 'frontend', visible: true },
  { id: 'node', label: 'Node.js', category: 'backend', visible: true },
  { id: 'express', label: 'Express.js', category: 'backend', visible: true },
  { id: 'rest', label: 'REST APIs', category: 'backend', visible: true },
  { id: 'ts', label: 'TypeScript', category: 'languages', visible: true },
  { id: 'python', label: 'Python', category: 'languages', visible: true },
  { id: 'cpp', label: 'C++', category: 'languages', visible: true },
  { id: 'mongodb', label: 'MongoDB', category: 'databases', visible: true },
  { id: 'sql', label: 'SQL', category: 'databases', visible: true },
  { id: 'llm-api', label: 'LLM API integration', category: 'ai', visible: true },
  { id: 'prompt-design', label: 'Prompt design', category: 'ai', visible: true },
  { id: 'rag', label: 'Retrieval-Augmented Generation (RAG)', category: 'ai', visible: true },
  { id: 'ai-agents', label: 'AI agents', category: 'ai', visible: true },
  { id: 'git', label: 'Git', category: 'tools', visible: true },
  { id: 'github', label: 'GitHub', category: 'tools', visible: true },
  { id: 'vscode', label: 'VS Code', category: 'tools', visible: true },
  { id: 'dsa', label: 'Data Structures & Algorithms', category: 'core-cs', visible: true },
  { id: 'oop', label: 'OOP', category: 'core-cs', visible: true },
  { id: 'dbms', label: 'DBMS', category: 'core-cs', visible: true },
  { id: 'os', label: 'Operating Systems', category: 'core-cs', visible: true },
  { id: 'cn', label: 'Computer Networks', category: 'core-cs', visible: true },
]

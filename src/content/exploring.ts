export type ExploringItem = {
  id: string
  title: string
  note: string
  icon: string
  updated?: string
}

export const exploring: ExploringItem[] = [
  {
    id: 'llm-product-patterns',
    title: 'LLM product patterns',
    note: 'Designing <strong>useful</strong> workflows that keep feedback grounded and understandable.',
    icon: 'sparkles',
    updated: 'Now',
  },
  {
    id: 'rag-ops',
    title: 'RAG and retrieval design',
    note: 'Improving document grounding, chunking, and evidence quality for information products.',
    icon: 'database',
    updated: 'This month',
  },
  {
    id: 'trading-analytics',
    title: 'Trading analytics',
    note: 'Studying meaningful metrics, risk framing, and decision-support tooling.',
    icon: 'chart',
    updated: 'This month',
  },
  {
    id: 'agent-workflows',
    title: 'AI agents',
    note: 'Thinking through tool use, task boundaries, and practical product loops.',
    icon: 'bot',
    updated: 'Next',
  },
]

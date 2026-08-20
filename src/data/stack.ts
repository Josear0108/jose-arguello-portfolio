export interface StackItem {
  label: string
  slug?: string
}

export interface StackCategory {
  name: string
  desc: string
  icon: string
  items: StackItem[]
}

export const stackCategories: StackCategory[] = [
  {
    name: 'Frontend Development',
    desc: 'React avanzado con foco en performance y experiencia de usuario.',
    icon: 'M8 3 3 8l5 5M16 3l5 5-5 5M13 3l-2 18',
    items: [
      { label: 'React (Avanzado)', slug: 'react' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'Tailwind CSS', slug: 'tailwindcss' },
      { label: 'Shadcn UI', slug: 'shadcnui' },
      { label: 'Framer Motion', slug: 'framer' },
      { label: 'Zustand' },
      { label: 'TanStack Query', slug: 'reactquery' },
      { label: 'Zod', slug: 'zod' },
    ],
  },
  {
    name: 'Backend Development',
    desc: 'APIs y arquitecturas escalables sobre .NET y Node, sin atajos.',
    icon: 'M4 3h16v6H4zM4 15h16v6H4zM8 6h.01M8 18h.01',
    items: [
      { label: '.NET Core', slug: 'dotnet' },
      { label: '.NET Framework', slug: 'dotnet' },
      { label: 'C#' },
      { label: 'Node.js', slug: 'nodedotjs' },
      { label: 'Express', slug: 'express' },
      { label: 'APIs REST' },
    ],
  },
  {
    name: 'Bases de Datos',
    desc: 'Modelado y lógica de negocio directo en SQL Server.',
    icon: 'M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3zM4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6',
    items: [{ label: 'SQL Server' }, { label: 'Stored Procedures' }, { label: 'Triggers' }],
  },
  {
    name: 'AI-Powered Development',
    desc: 'Orquesto agentes de IA como parte real del flujo de trabajo, no como buzzword.',
    icon: 'M9 3h6v4H9zM4 21v-6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M9 12V7M15 12V7M4 21h16M7 17h.01M17 17h.01',
    items: [
      { label: 'Claude Code & API', slug: 'anthropic' },
      { label: 'Cursor AI' },
      { label: 'GitHub Copilot', slug: 'githubcopilot' },
      { label: 'Orquestación de agentes' },
    ],
  },
  {
    name: 'Herramientas',
    desc: 'Control de versiones y entornos que sostienen el trabajo en equipo.',
    icon: 'M14.7 6.3a3 3 0 1 1-4.2 4.2L3 18v3h3l7.5-7.5a3 3 0 1 1 4.2-4.2z',
    items: [{ label: 'Git', slug: 'git' }, { label: 'GitHub', slug: 'github' }, { label: 'Azure DevOps' }, { label: 'Visual Studio / VS Code' }],
  },
]

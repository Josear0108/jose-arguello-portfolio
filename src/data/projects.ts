export interface StackItem {
  label: string
  slug?: string
}

export interface Project {
  name: string
  summary: string
  detail: string
  stack: StackItem[]
  span: 1 | 2
  internal?: boolean
  link?: string
}

export const projects: Project[] = [
  {
    name: 'Plantilla Transversal de Autenticación y Seguridad',
    summary: 'Punto de entrada estandarizado adoptado en ~15 proyectos empresariales.',
    detail:
      'Incluye autenticación, perfilamiento, seguridad y cumplimiento normativo. Reduce significativamente el tiempo de configuración inicial en cada nuevo proyecto.',
    stack: [{ label: '.NET', slug: 'dotnet' }, { label: 'React', slug: 'react' }, { label: 'SQL Server' }],
    span: 2,
    internal: true,
  },
  {
    name: 'Librería de Componentes Transversales',
    summary: 'Formularios, cargue de archivos y visor de PDFs usados por todo el equipo.',
    detail: 'Componentes reutilizables adoptados como estándar del equipo de desarrollo, mejorando la eficiencia general en 30%+.',
    stack: [{ label: 'React', slug: 'react' }, { label: 'TypeScript', slug: 'typescript' }, { label: 'Zustand' }],
    span: 1,
    internal: true,
  },
  {
    name: 'Gestor de Estados de Trámites',
    summary: 'Flujos de trabajo para múltiples trámites empresariales con vistas estandarizadas.',
    detail: 'Reducción del 40% en el tiempo de implementación de pantallas gracias a vistas y estados estandarizados.',
    stack: [{ label: 'React', slug: 'react' }, { label: 'Express.js', slug: 'express' }, { label: 'SQL Server' }],
    span: 1,
    internal: true,
  },
  {
    name: 'Patitas Unidas',
    summary: 'Plataforma para fundaciones de animales con escasos recursos.',
    detail: 'Adopción, voluntariado, campañas y apadrinamiento en una sola plataforma — proyecto personal construido de punta a punta.',
    stack: [{ label: 'React', slug: 'react' }, { label: '.NET', slug: 'dotnet' }, { label: 'SQL Server' }],
    span: 1,
  },
  {
    name: 'Colombia Explorer',
    summary: 'Aplicación interactiva que consume la API pública de datos de Colombia.',
    detail: 'Exploración visual de datos abiertos de Colombia, desplegada en Vercel.',
    stack: [{ label: 'React', slug: 'react' }, { label: 'API REST' }, { label: 'Vercel', slug: 'vercel' }],
    span: 1,
  },
]

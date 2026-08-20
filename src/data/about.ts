export interface Stat {
  prefix: string
  value: number
  suffix: string
  label: string
}

export interface Fact {
  label: string
  value: string
}

export const stats: Stat[] = [
  { prefix: '', value: 4, suffix: '+', label: 'Años de experiencia' },
  { prefix: '~', value: 15, suffix: '', label: 'Proyectos empresariales' },
  { prefix: '', value: 30, suffix: '%+', label: 'Eficiencia del equipo' },
]

export const facts: Fact[] = [
  { label: 'Educación', value: 'Ing. de Sistemas — Universidad Cooperativa de Colombia, 2022' },
  { label: 'Certificaciones', value: 'APIs .NET, Automatizaciones n8n, Claude Code — Platzi 2025' },
  { label: 'Idiomas', value: 'Español (nativo) · Inglés (básico, A2 en estudio)' },
]

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
  images?: string[]
  role: string
  year: string
  challenge: string
  results: string[]
}

export const projects: Project[] = [
  {
    name: 'Bandeja de Trabajo (Work Tray)',
    summary: 'Módulo central de gestión de trámites de una plataforma documental empresarial — el más grande del monorepo, con más de 160 commits propios.',
    detail:
      'Librería React embebible que centraliza consulta, asignación y ejecución de acciones sobre trámites. Incluye un sistema de navegación pluggable (view registry) que permite extender el módulo con vistas nuevas sin tocar el shell de la aplicación host, y un visor de documentos multi-formato que carga PDF.js en un Web Worker propio.',
    stack: [
      { label: 'React', slug: 'react' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'Express', slug: 'express' },
      { label: 'SQL Server' },
    ],
    span: 2,
    internal: true,
    images: ['/projects/work-tray.png', '/projects/work-tray-2.png', '/projects/work-tray-3.png'],
    role: 'Desarrollador full stack',
    year: '2026',
    challenge:
      'Múltiples equipos gestionaban trámites documentales sin una vista centralizada — cada trámite requería consultar, asignar y ejecutar acciones desde pantallas distintas según su tipo.',
    results: [
      'Módulo más grande del monorepo — 164 commits propios',
      'Sistema de navegación pluggable que permite añadir vistas nuevas sin tocar el shell de la app',
      'Visor de documentos multi-formato con PDF.js corriendo en un Web Worker propio',
    ],
  },
  {
    name: 'Renderizador de Formularios (Form Forge)',
    summary: 'Motor de renderizado dinámico de formularios dirigido 100% por contrato JSON — dar de alta un trámite nuevo no requiere tocar código.',
    detail:
      'Valida, calcula, autocompleta y gestiona adjuntos según reglas declarativas: visibilidad condicional, validaciones cruzadas y validación asíncrona contra servicios externos. La lógica de evaluación se comparte entre cliente y servidor vía un paquete TypeScript puro, evitando que el frontend permita algo que el backend rechace. Cubierto por 367 tests, incluyendo end-to-end con Playwright y pruebas de carga con k6 (p99 < 3s).',
    stack: [
      { label: 'React', slug: 'react' },
      { label: 'TypeScript', slug: 'typescript' },
      { label: 'PostgreSQL', slug: 'postgresql' },
      { label: 'Playwright' },
    ],
    span: 1,
    internal: true,
    images: ['/projects/form-forge.png', '/projects/form-forge-2.png', '/projects/form-forge-3.png'],
    role: 'Desarrollador full stack',
    year: '2026',
    challenge:
      'Dar de alta un trámite nuevo significaba escribir código de formulario a la medida cada vez — validaciones, cálculos y reglas de negocio duplicadas entre frontend y backend.',
    results: [
      '367 tests — incluyendo end-to-end con Playwright y carga con k6 (p99 < 3s)',
      'Lógica de validación compartida entre cliente y servidor vía un paquete TypeScript puro',
      'Un trámite nuevo se da de alta por configuración, sin tocar código',
    ],
  },
  {
    name: 'Gestión de Usuarios',
    summary: 'Librería de administración de usuarios con doble modo de operación, reutilizada sin duplicar código entre distintos contextos de la plataforma.',
    detail:
      'Arquitectura hexagonal con un Domain Model Facade que unifica en un único modelo de dominio los datos que llegan de un servicio externo legacy (SOAP) y de la base de datos local. La orquestación de negocio varía según el modo de operación en la capa de aplicación, manteniendo el dominio y el frontend agnósticos al contexto que los monta.',
    stack: [{ label: 'React', slug: 'react' }, { label: 'Express', slug: 'express' }, { label: 'SQL Server' }],
    span: 1,
    internal: true,
    images: ['/projects/users.png', '/projects/users-2.png'],
    role: 'Desarrollador senior',
    year: '2026',
    challenge:
      'La administración de usuarios variaba según el contexto (empresa vs. entidad-cliente), y cada caso terminaba duplicando lógica y pantallas.',
    results: [
      'Una sola librería sirviendo dos modos de operación sin duplicar código',
      'Domain Model Facade que unifica datos de un servicio SOAP legacy con la base de datos local',
      'Flujo guiado de creación con detección automática de duplicados por documento',
    ],
  },
  {
    name: 'Motor de Reglas de Asignación',
    summary: 'Motor de reglas configurable para asignar trámites automáticamente a oficinas y responsables según criterios de negocio.',
    detail:
      'Reglas priorizadas y activables en caliente (sin despliegue), con criterios dinámicos de asignación y alcance global o por entidad. Permite a un administrador ajustar el comportamiento de asignación de la plataforma sin intervención de desarrollo.',
    stack: [{ label: 'React', slug: 'react' }, { label: 'TypeScript', slug: 'typescript' }, { label: 'SQL Server' }],
    span: 1,
    internal: true,
    images: ['/projects/rules-engine.png', '/projects/rules-engine-2.png'],
    role: 'Desarrollador full stack',
    year: '2026',
    challenge:
      'La asignación de trámites a oficinas y responsables dependía de reglas de negocio que cambiaban constantemente y requerían intervención de desarrollo cada vez.',
    results: [
      'Reglas priorizadas, activables y desactivables sin necesidad de despliegue',
      'Alcance configurable: regla global o restringida a una entidad',
      'Administradores ajustan el comportamiento de asignación de forma autónoma',
    ],
  },
  {
    name: 'DevDocs — Portal de Documentación Técnica',
    summary: 'Portal de documentación técnica con contenido gobernado por base de datos — editable sin desplegar código, con historial de revisiones y revert.',
    detail:
      'Modelo de dominio agnóstico al tipo de artefacto documentado (componentes, paquetes, APIs), con un playground interactivo que renderiza componentes reales y genera el código JSX correspondiente en tiempo real. Expone además un servidor MCP propio, para que agentes de IA consulten la documentación directamente durante el desarrollo.',
    stack: [
      { label: '.NET', slug: 'dotnet' },
      { label: 'React', slug: 'react' },
      { label: 'PostgreSQL', slug: 'postgresql' },
      { label: 'Redis', slug: 'redis' },
    ],
    span: 1,
    internal: true,
    images: ['/projects/devdocs.png', '/projects/devdocs-2.png', '/projects/devdocs-3.png'],
    role: 'Autor — proyecto propio del equipo',
    year: '2025 — 2026',
    challenge:
      'La documentación técnica de las librerías internas vivía en wikis estáticas que quedaban desactualizadas apenas se publicaba una nueva versión de un componente.',
    results: [
      'Contenido editable desde base de datos, con historial de revisiones y revert',
      'Playground interactivo que renderiza componentes reales y genera el JSX en vivo',
      'Servidor MCP propio — la misma documentación es consultable por agentes de IA',
    ],
  },
  {
    name: 'Patitas Unidas',
    summary: 'Plataforma para fundaciones de animales con escasos recursos.',
    detail: 'Adopción, voluntariado, campañas y apadrinamiento en una sola plataforma — proyecto personal construido de punta a punta.',
    stack: [{ label: 'React', slug: 'react' }, { label: '.NET', slug: 'dotnet' }, { label: 'SQL Server' }],
    span: 1,
    role: 'Proyecto personal — punta a punta',
    year: '2024',
    challenge:
      'Las fundaciones de animales con pocos recursos gestionan adopciones, voluntariado y campañas por WhatsApp y hojas de cálculo, sin ningún sistema centralizado.',
    results: [
      'Adopción, voluntariado, campañas y apadrinamiento en una sola plataforma',
      'Diseño y desarrollo completos por mi cuenta, de cero a producción',
    ],
  },
  {
    name: 'Colombia Explorer',
    summary: 'Aplicación interactiva que consume la API pública de datos de Colombia.',
    detail: 'Exploración visual de datos abiertos de Colombia, desplegada en Vercel.',
    stack: [{ label: 'React', slug: 'react' }, { label: 'API REST' }, { label: 'Vercel', slug: 'vercel' }],
    span: 1,
    role: 'Proyecto personal',
    year: '2023',
    challenge: 'Los datos abiertos de Colombia están disponibles públicamente pero son difíciles de explorar sin conocimiento técnico.',
    results: ['Exploración visual e interactiva de datos públicos', 'Desplegada en Vercel'],
  },
]

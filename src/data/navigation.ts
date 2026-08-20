export interface NavItem {
  label: string
  sectionId: string
}

export const navItems: NavItem[] = [
  { label: 'Sobre mí', sectionId: 'section-about' },
  { label: 'Trayectoria', sectionId: 'section-trajectory' },
  { label: 'Stack', sectionId: 'section-stack' },
  { label: 'Proyectos', sectionId: 'section-projects' },
  { label: 'Contáctame', sectionId: 'section-contact' },
]

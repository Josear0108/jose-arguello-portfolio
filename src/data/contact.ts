export interface SocialLink {
  label: string
  href?: string
}

export const contact = {
  email: 'josearguello0108@gmail.com',
  phone: '+57 316 553 9645',
  location: 'Bucaramanga, Colombia',
}

// href pendiente: agregar la URL real cuando esté disponible.
export const socialLinks: SocialLink[] = [{ label: 'LinkedIn' }, { label: 'GitHub' }]

import { useEffect, useState } from 'react'
import type { NavItem } from '../data/navigation'

const MARKER_RATIO = 0.35
const FALLBACK_INTERVAL_MS = 400

export function useActiveSection(navItems: NavItem[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const update = () => {
      const marker = window.innerHeight * MARKER_RATIO
      let next: string | null = null
      for (const item of navItems) {
        const el = document.getElementById(item.sectionId)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= marker && rect.bottom > marker) {
          next = item.sectionId
          break
        }
      }
      setActiveId((prev) => (prev === next ? prev : next))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const interval = window.setInterval(update, FALLBACK_INTERVAL_MS)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.clearInterval(interval)
    }
  }, [navItems])

  return activeId
}

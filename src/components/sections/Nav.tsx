import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useCursor } from '../../hooks/useCursor'
import { useActiveSection } from '../../hooks/useActiveSection'
import { navItems } from '../../data/navigation'
import { scrollToSection, scrollToTop } from '../../hooks/scroll'

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { onEnter, onLeave } = useCursor()
  const activeId = useActiveSection(navItems)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (menuOpen) closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false)
    scrollToSection(sectionId)
  }

  return (
    <>
      <div className="fixed top-4 left-1/2 z-[100] w-[calc(100%-32px)] max-w-[1080px] -translate-x-1/2">
        <motion.nav
          layout
          className="flex items-center justify-between gap-3 rounded-full border border-white/[0.08] bg-surface/80 py-3 pr-3 pl-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-lg"
        >
          <button
            type="button"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onClick={scrollToTop}
            className="p-1 font-display text-lg font-extrabold tracking-[-0.02em] text-ink"
          >
            JMA
          </button>

          <div className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => {
              const isActive = activeId === item.sectionId
              return (
                <button
                  key={item.sectionId}
                  type="button"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                  onClick={() => handleNavClick(item.sectionId)}
                  className={`relative rounded-full px-3.5 py-[7px] text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                    isActive ? 'text-ink-strong' : 'text-[#B8B8C2] hover:text-ink'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="pointer-events-none absolute inset-x-4 bottom-0.5 h-px rounded-full bg-white/70 shadow-[0_0_4px_0px_rgba(255,255,255,0.35)]"
                    />
                  )}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-[10px] border border-white/[0.16] md:hidden"
          >
            <span className="h-0.5 w-[18px] bg-ink" />
            <span className="h-0.5 w-[18px] bg-ink" />
            <span className="h-0.5 w-[18px] bg-ink" />
          </button>
        </motion.nav>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center gap-8 bg-bg/97 backdrop-blur-md">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            className="absolute top-6 right-6 p-2 text-[28px] text-ink"
          >
            ✕
          </button>
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              type="button"
              onClick={() => handleNavClick(item.sectionId)}
              className="text-[22px] font-bold text-ink transition-colors hover:text-accent"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

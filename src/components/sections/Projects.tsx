import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Eyebrow } from '../Eyebrow'
import { TechChip } from '../TechChip'
import { useCursor } from '../../hooks/useCursor'
import { projects, type Project } from '../../data/projects'

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const FOLDER_ICON = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (el: HTMLButtonElement) => void }) {
  const { onEnter, onLeave } = useCursor()

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.button
      type="button"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardReveal}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onPointerMove={handlePointerMove}
      onClick={(e) => onOpen(e.currentTarget)}
      className={`glow-card block w-full overflow-hidden rounded-[20px] border border-white/[0.06] bg-surface-2 text-left transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-accent/40 ${
        project.span === 2 ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="flex h-[220px] items-center justify-center bg-[#202024] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_14px)]">
        <div className="font-mono text-xs tracking-wide text-[#6C6C78]">CAPTURA PENDIENTE</div>
      </div>
      <div className="p-6">
        <div className="mb-2 text-[17px] font-bold text-ink-strong">{project.name}</div>
        <p className="m-0 mb-4 text-sm leading-[1.6] text-ink-faint text-pretty">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <TechChip key={s.label} item={s} tone="accent" size="sm" />
          ))}
        </div>
      </div>
    </motion.button>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setSelected(project)
  }

  const closeProject = () => {
    setSelected(null)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    if (selected) closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
    }
  }, [selected])

  useEffect(() => {
    if (!selected) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProject()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <>
      <motion.section
        id="section-projects"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={reveal}
        className="px-[clamp(20px,6vw,80px)] py-[clamp(80px,10vw,140px)]"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-4">
            <Eyebrow icon={FOLDER_ICON}>Proyectos</Eyebrow>
          </div>
          <h2 className="m-0 mb-3.5 font-display text-[clamp(40px,6vw,80px)] leading-none font-extrabold tracking-[-0.03em] text-ink-strong">
            Selección de trabajo
          </h2>
          <p className="m-0 mb-12 text-[15px] text-ink-faint">
            Capturas pendientes — click en cualquier tarjeta para ver el detalle.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} onOpen={(el) => openProject(project, el)} />
            ))}
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="project-modal-overlay"
            onClick={closeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(8,8,9,0.82)] p-6 backdrop-blur-md"
          >
            <motion.div
              ref={dialogRef}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="max-h-[84vh] w-full max-w-[640px] overflow-y-auto rounded-3xl border border-white/10 bg-surface-3 p-[clamp(28px,4vw,48px)]"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div id="project-modal-title" className="max-w-[480px] font-display text-2xl font-extrabold text-ink-strong">
                  {selected.name}
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeProject}
                  aria-label="Cerrar detalle"
                  className="p-1 text-2xl leading-none text-ink-faint"
                >
                  ✕
                </button>
              </div>
              <p className="m-0 mb-6 text-[15.5px] leading-[1.8] text-ink-soft text-pretty">{selected.detail}</p>
              <div className="mb-7 flex flex-wrap gap-2">
                {selected.stack.map((s) => (
                  <TechChip key={s.label} item={s} tone="accent" size="sm" />
                ))}
              </div>
              {selected.link ? (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-accent hover:underline"
                >
                  Ver proyecto →
                </a>
              ) : selected.internal ? (
                <div className="text-[13px] font-semibold text-ink-faint">Proyecto empresarial interno</div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

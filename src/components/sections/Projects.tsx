import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { Eyebrow } from '../Eyebrow'
import { TechChip } from '../TechChip'
import { useCursor } from '../../hooks/useCursor'
import { useScrollLock } from '../../hooks/useScrollLock'
import { projects, type Project } from '../../data/projects'

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const FOLDER_ICON = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
const SHOTS_ICON = 'M3 5h18v12H3zM7 21h10'
const CHEVRON_LEFT = 'M15 18l-6-6 6-6'
const CHEVRON_RIGHT = 'M9 18l6-6-6-6'
const CHECK_ICON = 'M20 6L9 17l-5-5'
const AUTOPLAY_MS = 5000

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
  const cover = project.images?.[0]

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
      <div className="relative h-[220px] overflow-hidden bg-[#202024]">
        {cover ? (
          <img
            src={cover}
            alt={`Captura de pantalla de ${project.name}`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_14px)]">
            <div className="font-mono text-xs tracking-wide text-[#6C6C78]">CAPTURA PENDIENTE</div>
          </div>
        )}
        {project.images && project.images.length > 0 && (
          <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-bg/72 px-2.5 py-1.5 text-[11px] font-bold text-ink-soft backdrop-blur-md">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d={SHOTS_ICON} />
            </svg>
            {project.images.length}
          </div>
        )}
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
  const [shotIndex, setShotIndex] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const { onEnter, onLeave } = useCursor()
  const reducedMotion = useReducedMotion()

  const shots = selected?.images ?? []
  const shotCount = shots.length

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setShotIndex(0)
    setAutoplayPaused(false)
    setSelected(project)
  }

  const closeProject = () => {
    setSelected(null)
    triggerRef.current?.focus()
  }

  const goShot = (n: number) => {
    if (shotCount === 0) return
    setShotIndex(((n % shotCount) + shotCount) % shotCount)
  }
  const prevShot = () => goShot(shotIndex - 1)
  const nextShot = () => goShot(shotIndex + 1)

  useScrollLock(!!selected)

  useEffect(() => {
    if (selected) closeButtonRef.current?.focus()
  }, [selected])

  useEffect(() => {
    if (!selected || shotCount <= 1 || autoplayPaused || reducedMotion) return
    const id = window.setInterval(() => {
      setShotIndex((i) => (i + 1) % shotCount)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [selected, shotIndex, shotCount, autoplayPaused, reducedMotion])

  useEffect(() => {
    if (!selected) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProject()
        return
      }
      if (e.key === 'ArrowLeft' && shotCount > 1) {
        prevShot()
        return
      }
      if (e.key === 'ArrowRight' && shotCount > 1) {
        nextShot()
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
  }, [selected, shotIndex, shotCount])

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
          <p className="m-0 mb-12 text-[15px] text-ink-faint">Click en cualquier proyecto para ver el detalle y las capturas.</p>

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
              className="flex max-h-[88vh] w-full max-w-[760px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface-3"
            >
              <div className="modal-scroll min-h-0 flex-1 overflow-y-auto">
                {shotCount > 0 && (
                  <div
                    className="relative h-[clamp(220px,34vw,340px)] overflow-hidden bg-[#202024]"
                    onMouseEnter={() => setAutoplayPaused(true)}
                    onMouseLeave={() => setAutoplayPaused(false)}
                  >
                    <div
                      className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ transform: `translateX(-${shotIndex * 100}%)` }}
                    >
                      {shots.map((shot, i) => (
                        <div key={shot} className="h-full w-full flex-none">
                          <img
                            src={shot}
                            alt={`Captura ${i + 1} de ${selected.name}`}
                            className="h-full w-full object-cover object-top"
                          />
                        </div>
                      ))}
                    </div>

                    {shotCount > 1 && (
                      <>
                        <button
                          type="button"
                          onMouseEnter={onEnter}
                          onMouseLeave={onLeave}
                          onClick={prevShot}
                          aria-label="Imagen anterior"
                          className="absolute top-1/2 left-3.5 flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-bg/72 text-ink backdrop-blur-md transition-colors duration-200 hover:border-accent hover:bg-accent/90"
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                            <path d={CHEVRON_LEFT} />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onMouseEnter={onEnter}
                          onMouseLeave={onLeave}
                          onClick={nextShot}
                          aria-label="Imagen siguiente"
                          className="absolute top-1/2 right-3.5 flex h-[38px] w-[38px] -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-bg/72 text-ink backdrop-blur-md transition-colors duration-200 hover:border-accent hover:bg-accent/90"
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                            <path d={CHEVRON_RIGHT} />
                          </svg>
                        </button>
                        <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-bg/72 px-3.5 py-2 backdrop-blur-md">
                          {shots.map((shot, i) => (
                            <button
                              key={shot}
                              type="button"
                              onClick={() => goShot(i)}
                              aria-label={`Ver imagen ${i + 1}`}
                              aria-current={i === shotIndex}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                i === shotIndex ? 'w-[22px] bg-accent' : 'w-1.5 bg-white/25 hover:bg-white/45'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <button
                      ref={closeButtonRef}
                      type="button"
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                      onClick={closeProject}
                      aria-label="Cerrar detalle"
                      className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-bg/72 text-lg leading-none text-ink backdrop-blur-md"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="p-[clamp(28px,4vw,44px)]">
                  {shotCount === 0 && (
                    <div className="mb-6 flex justify-end">
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
                  )}

                  <div className="mb-3.5 flex flex-wrap items-center gap-2.5 text-xs font-bold tracking-[0.06em] text-ink-dim uppercase">
                    <span>{selected.role}</span>
                    <span className="h-[3px] w-[3px] rounded-full bg-[#55555E]" />
                    <span>{selected.year}</span>
                  </div>
                  <div
                    id="project-modal-title"
                    className="mb-6 font-display text-[clamp(22px,3vw,30px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-ink-strong"
                  >
                    {selected.name}
                  </div>

                  <div className="mb-2 text-[11.5px] font-bold tracking-[0.09em] text-accent uppercase">El reto</div>
                  <p className="m-0 mb-6 text-[15.5px] leading-[1.75] text-ink-soft text-pretty">{selected.challenge}</p>

                  <div className="mb-2 text-[11.5px] font-bold tracking-[0.09em] text-accent uppercase">Qué construí</div>
                  <p className="m-0 mb-6 text-[15.5px] leading-[1.75] text-ink-soft text-pretty">{selected.detail}</p>

                  <div className="mb-3 text-[11.5px] font-bold tracking-[0.09em] text-accent uppercase">Resultados</div>
                  <div className="mb-7 flex flex-col gap-2.5">
                    {selected.results.map((res) => (
                      <div key={res} className="flex items-start gap-2.5 text-[15px] leading-[1.6] text-ink-soft">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mt-[3px] flex-none text-accent"
                        >
                          <path d={CHECK_ICON} />
                        </svg>
                        {res}
                      </div>
                    ))}
                  </div>

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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

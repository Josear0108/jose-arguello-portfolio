import { useRef } from 'react'
import { motion, useInView, useScroll, type Variants } from 'framer-motion'
import { Eyebrow } from '../Eyebrow'
import { trajectory, type TrajectoryRole } from '../../data/trajectory'

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const TRAJECTORY_ICON = 'M3 17l6-6 4 4 8-8M21 7v6h-6'

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

function TrajectoryRow({ role }: { role: TrajectoryRole }) {
  const dotRef = useRef<HTMLDivElement>(null)
  const reached = useInView(dotRef, { once: true, amount: 0.5 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="relative grid grid-cols-[28px_1fr] gap-6 pb-12"
    >
      <div className="relative z-10 flex flex-col items-center">
        <div
          ref={dotRef}
          className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-accent transition-[opacity,box-shadow] duration-300 ${
            reached ? 'opacity-100 shadow-[0_0_0_5px_rgba(124,108,255,0.25)]' : 'opacity-35'
          }`}
        />
      </div>
      <div className="pb-2">
        <div className="mb-1.5 flex flex-wrap items-baseline gap-2.5">
          <div className="text-[19px] font-bold text-ink-strong">{role.title}</div>
          <div className="text-[13px] font-semibold text-ink-dim">{role.dates}</div>
        </div>
        <div className="mb-3 text-sm font-semibold text-accent">{role.company}</div>
        <p className="m-0 max-w-[600px] text-[15px] leading-[1.7] text-ink-muted text-pretty">{role.desc}</p>
      </div>
    </motion.div>
  )
}

export function Trajectory() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  })

  return (
    <motion.section
      id="section-trajectory"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      className="px-[clamp(20px,6vw,80px)] py-[clamp(80px,10vw,140px)]"
    >
      <div className="mx-auto max-w-[900px]">
        <div className="mb-4">
          <Eyebrow icon={TRAJECTORY_ICON}>Trayectoria</Eyebrow>
        </div>
        <h2 className="m-0 mb-3 font-display text-[clamp(32px,4vw,52px)] font-extrabold tracking-[-0.02em] text-ink-strong">
          Cuatro años, una línea recta
        </h2>
        <p className="m-0 mb-14 text-base text-ink-soft">La misma empresa, cada vez más responsabilidad.</p>

        <div ref={trackRef} className="relative flex flex-col">
          <div className="absolute top-1.5 bottom-1.5 left-[13px] w-px bg-white/10" />
          <motion.div
            className="absolute top-1.5 bottom-1.5 left-[13px] w-px bg-accent"
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          />
          {trajectory.map((role) => (
            <TrajectoryRow key={role.title} role={role} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

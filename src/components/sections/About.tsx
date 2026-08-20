import { motion, type Variants } from 'framer-motion'
import { Eyebrow } from '../Eyebrow'
import { StatsRow } from '../StatCounter'
import { stats, facts } from '../../data/about'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

const PERSON_ICON = 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM4 21a8 8 0 0 1 16 0'

export function About() {
  return (
    <motion.section
      id="section-about"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      className="relative overflow-hidden bg-surface px-[clamp(20px,6vw,80px)] py-[clamp(80px,10vw,140px)]"
    >
      <div className="relative z-10 mx-auto max-w-[1180px]">
        <div className="mb-4">
          <Eyebrow icon={PERSON_ICON}>Sobre mí</Eyebrow>
        </div>

        <h2 className="m-0 mb-[clamp(40px,5vw,60px)] max-w-[900px] font-display text-[clamp(26px,3.4vw,44px)] leading-[1.18] font-extrabold tracking-[-0.02em] text-ink-strong text-pretty">
          Cuatro años construyendo productos donde el código y el diseño no se turnan — trabajan juntos.
        </h2>

        <div className="grid grid-cols-1 items-start gap-[clamp(40px,7vw,100px)] min-[861px]:grid-cols-[1.45fr_1fr]">
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[16.5px] leading-[1.8] text-ink-muted">
              Empecé como aprendiz en React y .NET; hoy lidero arquitectura de componentes usados en ~15 proyectos
              empresariales y mentorio a desarrolladores junior. Cada interfaz que construyo pasa primero por cómo
              se siente usarla — la solidez técnica viene después, no al revés.
            </p>
            <p className="m-0 text-[16.5px] leading-[1.8] text-ink-muted">
              Uso Claude, Cursor y Copilot como parte real de cómo trabajo: orquesto agentes para acelerar el
              desarrollo sin ceder criterio sobre lo que construyo.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-white/[0.07]">
            {facts.map((fact) => (
              <div key={fact.label} className="py-4 first:pt-0">
                <div className="mb-[7px] text-[11.5px] font-bold tracking-[0.09em] text-ink-faint uppercase">{fact.label}</div>
                <div className="text-[14.5px] leading-[1.55] text-ink-soft">{fact.value}</div>
              </div>
            ))}
          </div>
        </div>

        <StatsRow stats={stats} />
      </div>
    </motion.section>
  )
}

import { motion, type Variants } from 'framer-motion'
import { Eyebrow } from '../Eyebrow'
import { useCursor } from '../../hooks/useCursor'
import { scrollToSection } from '../../hooks/scroll'
import profilePhoto from '../../assets/image.jpg'

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const COMPASS_ICON = 'M8 3 3 8l5 5M16 3l5 5-5 5M13 3l-2 18'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
}

export function Hero() {
  const { onEnter, onLeave } = useCursor()

  return (
    <section
      id="section-hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-[clamp(20px,6vw,80px)] pt-[clamp(150px,18vw,210px)] pb-[100px]"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-wrap items-center gap-[clamp(24px,5vw,64px)] max-[760px]:flex-col max-[760px]:gap-8"
      >
        <div className="min-w-[280px] flex-[1_1_420px] max-[760px]:w-full max-[760px]:min-w-0 max-[760px]:text-center">
          <motion.div variants={item} className="mb-6">
            <Eyebrow icon={COMPASS_ICON}>4 años · React + .NET</Eyebrow>
          </motion.div>

          <motion.h1
            variants={item}
            className="m-0 mb-7 font-display text-[clamp(42px,6.4vw,86px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink-strong max-[760px]:mb-5"
          >
            <span className="mb-2.5 block font-sans text-[clamp(17px,1.8vw,22px)] font-semibold tracking-[0.01em] text-ink-faint">
              Hola, soy
            </span>
            Jose <span className="outline-name">Argüello</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="m-0 mb-10 max-w-[720px] text-[clamp(18px,2.2vw,26px)] leading-[1.5] font-medium text-ink-soft text-pretty max-[760px]:mx-auto max-[760px]:mb-8 max-[760px]:max-w-[420px] max-[760px]:text-[17px]"
          >
            Ingeniero de Sistemas. Diseño interfaces con React, las sostengo con .NET, y orquesto agentes de IA
            como parte del flujo de trabajo.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-4 max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:gap-3"
          >
            <button
              type="button"
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onClick={() => scrollToSection('section-contact')}
              className="rounded-full bg-accent px-8 py-4 text-[15px] font-bold text-bg transition duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:shadow-[0_0_0_8px_rgba(124,108,255,0.16),0_0_30px_rgba(124,108,255,0.55)] max-[760px]:w-full max-[760px]:text-center"
            >
              Hablemos
            </button>
            <button
              type="button"
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
              onClick={() => scrollToSection('section-projects')}
              className="rounded-full border border-white/[0.16] bg-transparent px-8 py-4 text-[15px] font-bold whitespace-nowrap text-ink transition-colors hover:border-accent max-[760px]:w-full max-[760px]:text-center"
            >
              Ver proyectos
            </button>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="relative mx-[clamp(0px,4vw,52px)] flex w-[clamp(200px,24vw,300px)] flex-none justify-center max-[900px]:w-[220px] max-[760px]:order-first max-[760px]:mx-0 max-[760px]:w-[150px]"
        >
          <div className="absolute -inset-[15%] -z-10 rounded-full bg-accent opacity-10 blur-[70px]" />
          <div className="relative aspect-square w-full">
            <svg viewBox="0 0 200 200" className="animate-orbit absolute -inset-4 h-[calc(100%+32px)] w-[calc(100%+32px)]">
              <circle
                cx={100}
                cy={100}
                r={98}
                fill="none"
                stroke="#7C6CFF"
                strokeOpacity={0.55}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="18 14 6 14 30 20"
              />
            </svg>
            <svg viewBox="0 0 200 200" className="animate-orbit-reverse absolute -inset-8 h-[calc(100%+64px)] w-[calc(100%+64px)]">
              <circle
                cx={100}
                cy={100}
                r={98}
                fill="none"
                stroke="#7C6CFF"
                strokeOpacity={0.32}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeDasharray="10 22 26 18"
              />
            </svg>
            <div className="pointer-events-none absolute -inset-2 rounded-full shadow-[0_0_60px_6px_rgba(124,108,255,0.3)]" />

            <img
              src={profilePhoto}
              alt="José Manuel Argüello Pico"
              width={300}
              height={300}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full rounded-full border-2 border-accent/50 object-cover [filter:brightness(0.86)_contrast(1.06)_saturate(0.9)]"
            />

            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(124,108,255,0)_45%,rgba(124,108,255,0.22)_100%)]" />

            <div className="absolute top-[3%] left-[-19%] rounded-[10px] border border-accent/35 bg-surface-2 px-[11px] py-1.5 font-mono text-[11px] whitespace-nowrap text-accent shadow-[0_6px_18px_rgba(0,0,0,0.5)] max-[760px]:hidden">
              {'</> React'}
            </div>
            <div className="absolute top-[46%] right-[-21%] rounded-[10px] border border-accent/35 bg-surface-2 px-[11px] py-1.5 font-mono text-[11px] whitespace-nowrap text-accent shadow-[0_6px_18px_rgba(0,0,0,0.5)] max-[760px]:hidden">
              AI Agents
            </div>
            <div className="absolute bottom-[5%] left-[-15%] rounded-[10px] border border-accent/35 bg-surface-2 px-[11px] py-1.5 font-mono text-[11px] whitespace-nowrap text-accent shadow-[0_6px_18px_rgba(0,0,0,0.5)] max-[760px]:hidden">
              .NET
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: EASE_OUT }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="animate-bounce-cue flex flex-col items-center gap-2">
          <span className="text-[11px] font-semibold tracking-widest text-ink-dim">SCROLL</span>
          <span className="h-8 w-px bg-linear-to-b from-ink-dim to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}

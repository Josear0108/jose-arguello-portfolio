import { motion, type Variants } from 'framer-motion'
import { Eyebrow } from '../Eyebrow'
import { TechChip } from '../TechChip'
import { stackCategories, type StackCategory } from '../../data/stack'

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const LAYERS_ICON = 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

function StackCard({ category }: { category: StackCategory }) {
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardReveal}
      onPointerMove={handlePointerMove}
      className="glow-card rounded-2xl border border-white/[0.06] border-t-[3px] border-t-accent/25 bg-surface-2 px-6 pt-7 pb-6 transition-[transform,border-color] duration-300 hover:-translate-y-[5px] hover:border-t-accent"
    >
      <div className="mb-[18px] flex h-11 w-11 items-center justify-center rounded-full bg-accent/[0.12]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C6CFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d={category.icon} />
        </svg>
      </div>
      <div className="mb-2.5 font-display text-[17px] font-extrabold tracking-[-0.01em] text-ink-strong">{category.name}</div>
      <p className="m-0 mb-[18px] text-sm leading-[1.6] text-ink-faint text-pretty">{category.desc}</p>
      <div className="flex flex-wrap gap-2">
        {category.items.map((tech) => (
          <TechChip key={tech.label} item={tech} tone="neutral" size="md" />
        ))}
      </div>
    </motion.div>
  )
}

export function Stack() {
  return (
    <motion.section
      id="section-stack"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      className="bg-surface px-[clamp(20px,6vw,80px)] py-[clamp(80px,10vw,140px)]"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-4">
          <Eyebrow icon={LAYERS_ICON}>Stack tecnológico</Eyebrow>
        </div>
        <h2 className="m-0 mb-3 font-display text-[clamp(32px,4vw,52px)] font-extrabold tracking-[-0.02em] text-ink-strong">
          Herramientas que uso todos los días
        </h2>
        <p className="m-0 mb-14 text-base text-ink-soft">
          Del frontend a la IA aplicada, sin dejar de lado el backend que lo sostiene.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 min-[980px]:grid-cols-3">
          {stackCategories.map((category) => (
            <StackCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

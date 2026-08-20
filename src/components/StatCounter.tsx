import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import type { Stat } from '../data/about'

const DIGIT_FACES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const DIGIT_DELAY_STEP = 0.18
const ROLL_DURATION = '2.1s'
const ROLL_EASE = 'cubic-bezier(0.22,1,0.36,1)'

function DigitColumn({ digit, delay, rolled }: { digit: string; delay: number; rolled: boolean }) {
  const target = Number(digit)
  return (
    <span className="inline-block h-[1em] overflow-hidden [font-variant-numeric:tabular-nums]">
      <span
        className="block"
        style={{
          transform: rolled ? `translateY(-${target}em)` : 'translateY(0)',
          transition: `transform ${ROLL_DURATION} ${ROLL_EASE}`,
          transitionDelay: `${delay}s`,
        }}
      >
        {DIGIT_FACES.map((face) => (
          <span key={face} className="block h-[1em] text-center leading-none">
            {face}
          </span>
        ))}
      </span>
    </span>
  )
}

function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reducedMotion = useReducedMotion()
  const rolled = inView || !!reducedMotion
  const digits = String(stat.value).split('')

  return (
    <div className="flex flex-1 items-center justify-between gap-4 border-b border-white/[0.07] px-0 py-4 last:border-b-0 sm:block sm:border-b-0 sm:px-[clamp(12px,3vw,32px)] sm:py-0 sm:first:pl-0 sm:last:pr-0">
      <div
        ref={ref}
        className="flex items-start font-display text-[30px] leading-none font-extrabold tracking-[-0.03em] text-accent sm:text-[clamp(32px,4vw,52px)]"
      >
        <span>{stat.prefix}</span>
        {digits.map((digit, i) => (
          <DigitColumn key={i} digit={digit} delay={reducedMotion ? 0 : i * DIGIT_DELAY_STEP} rolled={rolled} />
        ))}
        <span>{stat.suffix}</span>
      </div>
      <div className="text-right text-[12.5px] font-semibold text-ink-faint sm:mt-2.5 sm:text-left">{stat.label}</div>
    </div>
  )
}

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="mt-[clamp(48px,6vw,72px)] flex flex-col border-t border-white/[0.08] pt-[clamp(32px,4vw,44px)] sm:flex-row sm:divide-x sm:divide-white/[0.08]">
      {stats.map((stat) => (
        <StatCounter key={stat.label} stat={stat} />
      ))}
    </div>
  )
}

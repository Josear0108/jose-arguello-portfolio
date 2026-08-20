import { motion, type Variants } from 'framer-motion'
import { Eyebrow } from '../Eyebrow'
import { useCursor } from '../../hooks/useCursor'
import { contact, socialLinks } from '../../data/contact'

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const MAIL_ICON = 'M4 4h16v16H4zM22 6l-10 7L2 6'

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

export function Contact() {
  const { onEnter, onLeave } = useCursor()

  return (
    <motion.section
      id="section-contact"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={reveal}
      className="px-[clamp(20px,6vw,80px)] pt-[clamp(80px,9vw,120px)] pb-12"
    >
      <div className="mx-auto max-w-[900px] text-center">
        <div className="mb-5">
          <Eyebrow icon={MAIL_ICON}>Contáctame</Eyebrow>
        </div>
        <h2 className="m-0 mb-6 font-display text-[clamp(36px,6vw,72px)] font-extrabold tracking-[-0.02em] text-ink-strong">
          Hablemos de tu próximo proyecto
        </h2>
        <p className="m-0 mb-9 text-[17px] text-ink-muted">
          Frontend con criterio de diseño, backend sólido, y un flujo de trabajo potenciado por IA.
        </p>
        <a
          href={`mailto:${contact.email}`}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="inline-flex items-center gap-2.5 rounded-full bg-accent px-10 py-[18px] text-base font-bold text-bg no-underline transition duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:shadow-[0_0_0_8px_rgba(124,108,255,0.16),0_0_30px_rgba(124,108,255,0.55)]"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d={MAIL_ICON} />
          </svg>
          Contáctame
        </a>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-7 text-sm font-semibold text-ink-faint">
          <div>{contact.location}</div>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href ?? '#'}
              target={social.href ? '_blank' : undefined}
              rel={social.href ? 'noopener noreferrer' : undefined}
              title={social.href ? undefined : `Pendiente: agregar URL de ${social.label}`}
              className="border-b border-dashed border-[#55555E] text-ink-faint no-underline transition-colors hover:border-accent hover:text-accent"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-16 text-center text-xs text-[#55555E]">José Manuel Argüello Pico — 2026</div>
    </motion.section>
  )
}

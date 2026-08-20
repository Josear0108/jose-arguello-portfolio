import type { ReactNode } from 'react'

interface EyebrowProps {
  icon: string
  children: ReactNode
}

export function Eyebrow({ icon, children }: EyebrowProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.12] px-4 py-2 text-xs font-bold tracking-widest text-accent uppercase">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d={icon} />
      </svg>
      {children}
    </div>
  )
}

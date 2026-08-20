import type { StackItem } from '../data/stack'

interface TechChipProps {
  item: StackItem
  tone?: 'neutral' | 'accent'
  size?: 'sm' | 'md'
}

const TONE_CLASSES: Record<NonNullable<TechChipProps['tone']>, string> = {
  neutral: 'bg-white/5 border border-white/[0.06] text-ink-soft',
  accent: 'bg-accent/[0.12] text-accent',
}

const SIZE_CLASSES: Record<NonNullable<TechChipProps['size']>, string> = {
  sm: 'gap-1.5 px-2.5 py-[5px] text-[11px]',
  md: 'gap-[7px] px-[13px] py-[7px] text-[12.5px]',
}

export function TechChip({ item, tone = 'neutral', size = 'md' }: TechChipProps) {
  return (
    <div className={`inline-flex items-center rounded-full font-semibold ${TONE_CLASSES[tone]} ${SIZE_CLASSES[size]}`}>
      {item.slug ? (
        <img src={`https://cdn.simpleicons.org/${item.slug}`} alt="" loading="lazy" className="block h-3.5 w-3.5" />
      ) : (
        <span className="h-1.5 w-1.5 flex-none rounded-full bg-accent/55" />
      )}
      {item.label}
    </div>
  )
}

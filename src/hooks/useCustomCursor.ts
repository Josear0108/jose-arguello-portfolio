import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 7}px, ${e.clientY - 7}px)`
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const grow = () => {
    const el = cursorRef.current
    if (!el) return
    el.style.width = '44px'
    el.style.height = '44px'
  }

  const shrink = () => {
    const el = cursorRef.current
    if (!el) return
    el.style.width = '14px'
    el.style.height = '14px'
  }

  return { cursorRef, grow, shrink }
}

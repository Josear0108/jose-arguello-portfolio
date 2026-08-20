import type { ReactNode } from 'react'
import { CursorContext } from '../hooks/useCursor'
import { useCustomCursor } from '../hooks/useCustomCursor'

export function CursorProvider({ children }: { children: ReactNode }) {
  const { cursorRef, grow, shrink } = useCustomCursor()

  return (
    <CursorContext.Provider value={{ onEnter: grow, onLeave: shrink }}>
      <div ref={cursorRef} aria-hidden="true" className="custom-cursor" />
      {children}
    </CursorContext.Provider>
  )
}

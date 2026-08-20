import { createContext, useContext } from 'react'

interface CursorHandlers {
  onEnter: () => void
  onLeave: () => void
}

const noop = () => {}

export const CursorContext = createContext<CursorHandlers>({ onEnter: noop, onLeave: noop })

export function useCursor() {
  return useContext(CursorContext)
}

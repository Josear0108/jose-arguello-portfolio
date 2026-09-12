import { useEffect } from 'react'

/**
 * Locks page scroll while `active` is true, using `position:fixed` on `body`
 * instead of plain `overflow:hidden` — that alone leaves background scroll
 * reachable via keyboard/touch and doesn't block iOS Safari's touch scroll.
 * Compensates the scrollbar width so removing it doesn't shift the layout,
 * and restores the exact scroll position on unlock.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return

    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    const html = document.documentElement.style
    const body = document.body.style

    html.overflow = 'hidden'
    body.overflow = 'hidden'
    body.position = 'fixed'
    body.top = `-${scrollY}px`
    body.width = '100%'
    body.paddingRight = `${scrollbarWidth}px`

    return () => {
      html.overflow = ''
      body.overflow = ''
      body.position = ''
      body.top = ''
      body.width = ''
      body.paddingRight = ''
      window.scrollTo(0, scrollY)
    }
  }, [active])
}

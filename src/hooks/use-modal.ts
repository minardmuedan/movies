import { useCallback, useEffect, useRef, useState } from 'react'

export function useModalHistory() {
  const [open, setOpenState] = useState(false)
  const pushed = useRef(false)

  const setOpen = useCallback((next: boolean) => {
    if (next) {
      if (!pushed.current) {
        window.history.pushState({ modal: true }, '')
        pushed.current = true
      }
      setOpenState(true)
    } else if (pushed.current) {
      window.history.back()
    } else {
      setOpenState(false)
    }
  }, [])

  useEffect(() => {
    const onPopState = () => {
      pushed.current = false
      setOpenState(false)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return [open, setOpen] as const
}

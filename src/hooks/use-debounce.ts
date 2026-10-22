import { useEffect, useState } from 'react'

export default function useDebounce(delay = 500) {
  const [value, setValue] = useState('')
  const [debounceValue, setDebounceValue] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeoutId)
  }, [value])

  return [debounceValue, value, setValue] as const
}

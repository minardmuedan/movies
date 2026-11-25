import { useEffect, useState } from 'react'

export const useTvSeries = (id: number) => {
  const STORAGE_KEY = `series:${id}`

  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)

  const changeSeason = (v: number) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([v, 1]))
    setSeason(v)
    setEpisode(1)
  }

  const changeEpisode = (v: number) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([season, v]))
    setEpisode(v)
  }

  useEffect(() => {
    try {
      const ls = localStorage.getItem(STORAGE_KEY)
      if (ls) {
        const [s, e] = JSON.parse(ls)
        if (Number.isInteger(s) && Number.isInteger(e)) {
          setSeason(s)
          setEpisode(e)
        }
      }
    } catch {}
  }, [STORAGE_KEY])

  return { season, episode, changeSeason, changeEpisode }
}

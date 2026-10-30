'use client'

import { useEffect, useState } from 'react'
import TMDBImage from '../image'

export default function MediaBackdrop({ backdrops }: { backdrops: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
    const intervalId = setInterval(() => setActiveIndex((a) => (a + 1) % backdrops.length), 3500)

    return () => clearInterval(intervalId)
  }, [backdrops.length])

  return (
    <div aria-label="background" className="bg-accent absolute -top-14 left-0 -z-1 min-h-svh w-full opacity-25">
      {backdrops.map((src, i) => (
        <TMDBImage
          key={i}
          type="backdrop"
          src={src}
          alt=""
          sizes="100vw"
          className={`absolute inset-0 transition-opacity duration-1000 ${i === activeIndex ? 'opacity-100' : 'opacity-0'}`}
          showError={false}
        />
      ))}

      <div className="to-background/0 from-background absolute bottom-0 h-1/2 w-full bg-linear-to-t">
        <span className="sr-only">overlay</span>
      </div>
    </div>
  )
}

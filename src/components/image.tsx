'use client'

import { cn } from 'cn'
import Image, { type ImageProps } from 'next/image'

export default function TMDBImage({ className, type, sizes, src }: ImageProps & { type: 'poster' | 'backdrop' }) {
  return (
    <div className={cn('relative size-full overflow-hidden', className)}>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        loader={({ width }) => {
          let size = ''
          if (type === 'poster') size = width <= 185 ? 'w185' : width <= 342 ? 'w342' : width <= 500 ? 'w500' : width <= 780 ? 'w780' : 'original'
          if (type === 'backdrop') size = width <= 300 ? 'w300' : width <= 780 ? 'w780' : width <= 1280 ? 'w1280' : 'original'
          return `https://image.tmdb.org/t/p/${size}/${src}`
        }}
      />
    </div>
  )
}

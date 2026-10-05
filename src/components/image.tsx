'use client'

import { cn } from 'cn'
import { ImageOffIcon } from 'lucide-react'
import Image, { type ImageProps } from 'next/image'

/*
 "profile_sizes": [
      "w45",
      "w185",
      "h632",
      "original"
*/

export default function TMDBImage({
  src,
  className,
  type,
  ...props
}: Omit<ImageProps, 'src'> & { src?: string; type: 'poster' | 'backdrop' | 'profile' }) {
  return (
    <div className={cn('relative overflow-hidden', className, !src ? 'border' : 'bg-accent')}>
      {src ? (
        <Image
          src={src}
          fill
          loading={type === 'backdrop' ? 'eager' : 'lazy'}
          className="object-cover object-center"
          loader={({ width }) => {
            let size = ''
            if (type === 'poster') size = width <= 185 ? 'w185' : width <= 342 ? 'w342' : width <= 500 ? 'w500' : width <= 780 ? 'w780' : 'original'
            if (type === 'backdrop') size = width <= 300 ? 'w300' : width <= 780 ? 'w780' : width <= 1280 ? 'w1280' : 'original'
            if (type === 'profile') size = 'w185'
            return `https://image.tmdb.org/t/p/${size}/${src}`
          }}
          {...props}
        />
      ) : (
        <div className="text-muted-foreground grid size-full place-items-center">
          <ImageOffIcon className="mx-auto" />
          <span className="sr-only">no image</span>
        </div>
      )}
    </div>
  )
}

export function YoutubeImage({ src, className }: { src: string; className?: string }) {
  return (
    <Image
      src={src}
      alt="youtube picture"
      fill
      loader={() => `https://img.youtube.com/vi/${src}/maxresdefault.jpg`}
      className={cn('object-cover object-center', className)}
    />
  )
}

'use client'

import Image, { type ImageProps } from 'next/image'

export default function TMDBImage({ ...props }: ImageProps) {
  return (
    <Image
      src={props.src}
      alt=""
      width={200}
      height={200}
      loader={() => {
        return `https://image.tmdb.org/t/p/w500/${props.src}`
      }}
    />
  )
}

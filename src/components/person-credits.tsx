'use client'

import type { TPersonCombinedCreditsCast, TPersonCombinedCreditsCrew } from '@/types/tmdb'
import Link from 'next/link'
import { useState } from 'react'
import TMDBImage from './image'
import { MediaRating } from './medias/media-rating'

type Props = { media: Record<string, (TPersonCombinedCreditsCast | TPersonCombinedCreditsCrew)[]> }

export default function PersonCreditsClient({ media }: Props) {
  const [activeDepartment, setActiveDepartment] = useState<string>('All')

  return (
    <section className="flex gap-14">
      <aside className="sticky top-16 hidden h-fit min-w-52 shrink-0 md:inline-block">
        <h2>Department</h2>
        <nav className="space-y-2">
          {Object.entries(media).map(([department, data], i) => (
            <button
              key={i}
              className={`${activeDepartment === department ? 'accent-muted' : 'border-transparent'} hover:bg-accent flex w-full cursor-pointer items-center justify-between gap-6 rounded-md border px-3 py-3 text-sm transition-colors`}
              onClick={() => setActiveDepartment(department)}
            >
              <h3>{department}</h3>
              <span className="sm-muted">{data.length}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1">
        <h2>Credits</h2>
        <ul className="space-y-3">
          {media[activeDepartment].map((media, i) => (
            <li key={i}>
              <Link href={`/${media.media_type}/${media.id}`} className="accent-muted flex h-40 w-full gap-3 rounded-lg border p-2">
                <TMDBImage type="poster" src={media.poster_path} alt="" className="aspect-2/3 h-full shrink-0" />

                <div>
                  <div className="text-sm">{'name' in media ? (media.name as string) : media.title}</div>
                  <span className="xs-muted">{'job' in media ? media.job : `as ${media.character}`}</span>
                  <p className="sm-muted mt-4 line-clamp-3 max-w-175 text-ellipsis">{media.overview}</p>
                </div>

                <div className="ml-auto space-y-2 text-end">
                  <div className="xs-muted">{media.release_date?.split('-')[0]}</div>
                  <MediaRating average={media.vote_average} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

import { TMDB_LANGUAGE } from '@/lib/tmdb'
import z from 'zod'

const RATING_MIN = 0
const RATING_MAX = 10

export const ratingsSchema = z
  .string()
  .regex(/^\d+-\d+$/)
  .transform((v) => v.split('-').map(Number) as [number, number])
  .refine(([min, max]) => min >= RATING_MIN && max <= RATING_MAX && min <= max)
  .catch([RATING_MIN, RATING_MAX])

export const keywordSchema = z
  .string()
  .regex(/^\d+-.+$/)
  .transform((s) => {
    const i = s.indexOf('-')
    return { id: Number(s.slice(0, i)), name: s.slice(i + 1) }
  })
  .pipe(
    z.object({
      id: z.number().int().positive(),
      name: z.string().trim().min(1).max(100),
    }),
  )

export const searchSchema = z.object({
  page: z.coerce.number().min(1).catch(1),
  with_genres: z.array(z.string()).or(z.string()).optional().catch(undefined),
  with_original_language: z.enum(TMDB_LANGUAGE.map(({ iso_639_1 }) => iso_639_1)).catch('en'),
  'vote_average.lte': z.number().max(10),
  'vote_average.gte': z.number().min(0),
  with_keywords: z.array(z.string()).or(z.string()).optional().catch(undefined),

  // certification: string
  // certification_country: string
  // include_adult: boolean
  // include_video: boolean
  // page: number
  // primary_release_year: number
  // 'primary_release_date.gte': string
  // 'primary_release_date.lte': string
  // region: string
  // 'release_date.gte': string
  // 'release_date.lte': string
  // sort_by: TSortBy[number]

  // watch_region: string
  // with_cast: string[]
  // with_companies: string[]
  // with_crew: string[]
  // with_genres: string[]
  // with_keywords: string[]
  // with_origin_country: string[]
  // with_release_type: string
  // 'with_runtime.gte': number
  // 'with_runtime.lte': number
  // with_watch_providers: string
  // without_companies: string
  // without_genres: string
  // without_keywords: string
  // without_watch_providers: string
  // year: number
})

export const sortbyEnum = z.enum([
  'original_title.asc',
  'original_title.desc',
  'popularity.asc',
  'popularity.desc',
  'revenue.asc',
  'revenue.desc',
  'primary_release_date.asc',
  'title.asc',
  'title.desc',
  'primary_release_date.desc',
  'vote_average.asc',
  'vote_average.desc',
  'vote_count.asc',
  'vote_count.desc',
])

export type TSearchSchema = z.infer<typeof searchSchema>

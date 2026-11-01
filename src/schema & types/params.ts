import { TMDB_LANGUAGE, TMDB_MOVIE_SORT_BY, TMDB_TV_SORT_BY } from '@/lib/tmdb'
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

export const sortbySchema = z.enum([...TMDB_MOVIE_SORT_BY, ...TMDB_TV_SORT_BY]).catch('popularity.desc')

export const searchSchema = z.object({
  page: z.coerce.number().min(1).catch(1),
  with_genres: z.array(z.string()).or(z.string()).optional().catch(undefined),
  with_original_language: z.enum(TMDB_LANGUAGE.map(({ iso_639_1 }) => iso_639_1)).catch('en'),
  'vote_average.lte': z.number().max(10),
  'vote_average.gte': z.number().min(0),
  with_keywords: z.array(z.string()).or(z.string()).optional().catch(undefined),
  sort_by: sortbySchema,
})

export type TSearchSchema = z.infer<typeof searchSchema>

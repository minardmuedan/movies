export const TMDB_MEDIA = ['movie', 'tv', 'person'] as const

export type TTMDB_MEDIA = (typeof TMDB_MEDIA)[number]

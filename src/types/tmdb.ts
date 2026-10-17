export type TSortBy = [
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
]

export type TPathFilters = {
  certification: string
  'certification.gte': string
  'certification.lte': string
  certification_country: string
  include_adult: boolean
  include_video: boolean
  language: string
  page: number
  primary_release_year: number
  'primary_release_date.gte': string
  'primary_release_date.lte': string
  region: string
  'release_date.gte': string
  'release_date.lte': string
  sort_by: TSortBy[number]
  'vote_average.gte': number
  'vote_average.lte': number
  'vote_count.gte': number
  'vote_count.lte': number
  watch_region: string
  with_cast: string[]
  with_companies: string[]
  with_crew: string[]
  with_genres: string[]
  with_keywords: string[]
  with_origin_country: string[]
  with_release_type: string
  'with_runtime.gte': number
  'with_runtime.lte': number
  with_watch_providers: string
  without_companies: string
  without_genres: string
  without_keywords: string
  without_watch_providers: string
  year: number
}

export type TGenres = { genres: TGenre[] }

export type TMovies = { dates: TDates; page: number; results: TMovie[]; total_pages: number; total_results: number }

export type TMovie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  softcore: boolean
  video: boolean
  vote_average: number
  vote_count: number
}

export type TTvShows = { page: number; results: TTv[]; total_pages: number; total_results: number }

export type TTv = Omit<TMovie, 'title' | 'original_title' | 'release_date'> & {
  origin_country: string[]
  original_name: string
  first_air_date: string
  name: string
}

export type TMovieDetails = TMovie & {
  belongs_to_collection: TBelongsToCollection | null
  budget: number
  genres: TGenre[]
  homepage: string
  imdb_id: string
  origin_country: string[]
  production_companies: TProductionCompany[]
  production_countries: TProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: TSpokenLanguage[]
  status: string
  tagline?: string
}

export interface TTvDetails {
  adult: boolean
  backdrop_path: string
  episode_run_time: any[]
  first_air_date: string
  genres: TGenre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  name: string
  networks: TNetwork[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: TProductionCompany[]
  production_countries: TProductionCountry[]
  seasons: TSeason[]
  softcore: boolean
  spoken_languages: TSpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export type TNetwork = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export type TSeason = {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path?: string
  season_number: number
  vote_average: number
}

export type TMediaCredits = { id: number; cast: TCast[]; crew: TCrew[] }

export type TCast = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export type TMediaReviews = {
  id: number
  page: number
  results: TReviewResult[]
  total_pages: number
  total_results: number
}

export type TReviewResult = {
  author: string
  author_details: TReviewAuthorDetails
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export type TReviewAuthorDetails = {
  name: string
  username: string
  avatar_path?: string
  rating?: number
}

export type TPerson = {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: any
  gender: number
  homepage: any
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
}

export type TMediaImages = { id: number; backdrops: TImage[]; logos: TImage[]; posters: TImage[] }

export type TImage = {
  aspect_ratio: number
  height: number
  iso_3166_1?: string
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export type TMediaVideos = { id: number; results: TMediaVideo[] }

export interface TMediaVideo {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  id: string
  published_at: string
}

export type TPersonCombinedCredits = {
  cast: TPersonCombinedCreditsCast[]
  crew: TPersonCombinedCreditsCrew[]
  id: number
}

export type TPersonCombinedCredit = TMovie & { credit_id: string; media_type: 'movie' | 'tv' }
export type TPersonCombinedCreditsCast = TPersonCombinedCredit & { character: string; order: number }
export type TPersonCombinedCreditsCrew = TPersonCombinedCredit & { department: string; job: string }

export type TMovieKeywords = { id: number; keywords: TGenre[] }
export type TTvKeywords = { id: number; results: TGenre[] }

export type TCrew = Omit<TCast, 'order'> & { job: string }
export type TDates = { maximum: string; minimum: string }
export type TBelongsToCollection = { id: number; name: string; poster_path: string; backdrop_path: string }
export type TGenre = { id: number; name: string }
export type TProductionCompany = { id: number; logo_path?: string; name: string; origin_country: string }
export type TProductionCountry = { iso_3166_1: string; name: string }
export type TSpokenLanguage = { english_name: string; iso_639_1: string; name: string }

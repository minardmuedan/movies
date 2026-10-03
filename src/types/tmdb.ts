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

export type TMovieCredits = { id: number; cast: TCast[]; crew: TCrew[] }

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

export type TMovieReviews = {
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

export type TKeywords = { id: number; keywords: TGenre[] }
export type TCrew = Omit<TCast, 'order'> & { job: string }
export type TDates = { maximum: string; minimum: string }
export type TBelongsToCollection = { id: number; name: string; poster_path: string; backdrop_path: string }
export type TGenre = { id: number; name: string }
export type TProductionCompany = { id: number; logo_path?: string; name: string; origin_country: string }
export type TProductionCountry = { iso_3166_1: string; name: string }
export type TSpokenLanguage = { english_name: string; iso_639_1: string; name: string }

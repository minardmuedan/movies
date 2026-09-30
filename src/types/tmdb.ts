export type TMovies = { dates: Dates; page: number; results: TMovie[]; total_pages: number; total_results: number }

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
  belongs_to_collection: BelongsToCollection | null
  budget: number
  genres: Genre[]
  homepage: string
  imdb_id: string
  origin_country: string[]
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
}

export type Dates = { maximum: string; minimum: string }
export type BelongsToCollection = { id: number; name: string; poster_path: string; backdrop_path: string }
export type Genre = { id: number; name: string }
export type ProductionCompany = { id: number; logo_path?: string; name: string; origin_country: string }
export type ProductionCountry = { iso_3166_1: string; name: string }
export type SpokenLanguage = { english_name: string; iso_639_1: string; name: string }

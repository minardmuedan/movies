type TResults<T> = { dates: TDates; page: number; results: T[]; total_pages: number; total_results: number }

export type TMovies = TResults<TMovie>

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

export type TTvShows = TResults<TTv>

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
  seasons: TTvSeason[]
  softcore: boolean
  spoken_languages: TSpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export type TTvSeason = {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path?: string
  season_number: number
  vote_average: number
}

export type TTVSeasonDetails = TTvSeason & {
  _id: string
  episodes: TTvEpisode[]
  networks: TNetwork
}

export type TTvEpisode = {
  air_date: string
  episode_number: number
  episode_type: string
  id: number
  name: string
  overview: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
  crew: any[]
  guest_stars: any[]
}

export type TPerson = {
  adult: boolean
  gender: number
  id: number
  known_for_department: null | string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  known_for: (TMovie | TTv)[]
}

export type TPersons = TResults<TPerson>

export type TMediaCredits = { id: number; cast: TCast[]; crew: TCrew[] }

export type TCast = Omit<TPerson, 'known_for'> & {
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export type TMediaReviews = {
  id: number
  page: number
  results: TReview[]
  total_pages: number
  total_results: number
}

export type TReview = {
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

export type TPersonDetails = TPerson & {
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: any
  homepage: any
  imdb_id: string
  place_of_birth: string
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

export type TNetwork = {
  id: number
  logo_path: string
  name: string
  origin_country: string
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
export type TGenres = { genres: TGenre[] }

export type TProductionCompany = { id: number; logo_path?: string; name: string; origin_country: string }
export type TProductionCountry = { iso_3166_1: string; name: string }
export type TSpokenLanguage = { english_name: string; iso_639_1: string; name: string }

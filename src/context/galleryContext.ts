import { createContext, useContext } from 'react'
import type { Movie } from '../api/tmdb'
import type { TopRatedState } from '../hooks/useTopRatedMovies'

export type GalleryContextValue = {
  genreId: number | null
  setGenreId: (genreId: number | null) => void
  state: TopRatedState
  movies: Movie[]
}

export const GalleryContext = createContext<GalleryContextValue | null>(null)

export function useGalleryContext(): GalleryContextValue {
  const value = useContext(GalleryContext)
  if (!value) throw new Error('useGalleryContext must be used inside <GalleryProvider>')
  return value
}

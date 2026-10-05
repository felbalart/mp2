import type { Movie } from '../api/tmdb'

export type SortField = 'title' | 'vote_average'
export type SortDirection = 'asc' | 'desc'
export type SortOption = { field: SortField; direction: SortDirection }

export function getRating(movie: Movie): number | null {
  return movie.vote_count > 0 && movie.vote_average > 0 ? movie.vote_average : null
}

export function sortMovies(movies: Movie[], sort: SortOption | null): Movie[] {
  if (!sort) return movies

  const factor = sort.direction === 'asc' ? 1 : -1

  return [...movies].sort((a, b) => {
    if (sort.field === 'title') {
      return factor * a.title.localeCompare(b.title, undefined, { sensitivity: 'base', numeric: true })
    }

    const ra = getRating(a)
    const rb = getRating(b)
    if (ra === null && rb === null) return 0
    if (ra === null) return 1
    if (rb === null) return -1
    return factor * (ra - rb)
  })
}

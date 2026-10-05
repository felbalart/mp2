import { useState, type FormEvent } from 'react'
import './SearchForm.css'

type SearchFormProps = {
  placeholder?: string
  onSearch: (query: string) => void
}

function SearchForm({ placeholder = 'Search movies...', onSearch }: SearchFormProps) {
  const [query, setQuery] = useState('')
  const trimmed = query.trim()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search movies"
      />
      <button type="submit" disabled={!trimmed}>
        Search
      </button>
    </form>
  )
}

export default SearchForm

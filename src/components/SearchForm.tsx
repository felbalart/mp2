import { useState, type ChangeEvent, type FormEvent } from 'react'
import './SearchForm.css'

type SearchFormProps = {
  placeholder?: string
  onChange?: (query: string) => void
  onSearch?: (query: string) => void
}

function SearchForm({ placeholder = 'Search movies...', onChange, onSearch }: SearchFormProps) {
  const [query, setQuery] = useState('')
  const trimmed = query.trim()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    onChange?.(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (trimmed) onSearch?.(trimmed)
  }

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        value={query}
        onChange={handleChange}
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

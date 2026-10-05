import type { FormEvent } from 'react'
import './SearchForm.css'

type SearchFormProps = {
  value: string
  placeholder?: string
  onChange: (query: string) => void
  onSearch?: (query: string) => void
}

function SearchForm({ value, placeholder = 'Search movies...', onChange, onSearch }: SearchFormProps) {
  const trimmed = value.trim()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (trimmed) onSearch?.(trimmed)
  }

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

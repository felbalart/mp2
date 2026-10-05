import { useState } from 'react'
import SearchForm from '../components/SearchForm'

function ListView() {
  const [query, setQuery] = useState('')

  return (
    <section>
      <h1>List</h1>
      <SearchForm onSearch={setQuery} />
      {query && <p>Results for “{query}” coming soon.</p>}
    </section>
  )
}

export default ListView

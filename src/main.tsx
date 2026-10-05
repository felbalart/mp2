import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import MovieSearchProvider from './context/MovieSearchProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <MovieSearchProvider>
        <App />
      </MovieSearchProvider>
    </HashRouter>
  </StrictMode>,
)

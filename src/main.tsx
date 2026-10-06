import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import MovieSearchProvider from './context/MovieSearchProvider'
import GalleryProvider from './context/GalleryProvider'
import { restoreRedirect } from './utils/restoreRedirect'
import './index.css'
import App from './App.tsx'

const base = import.meta.env.BASE_URL

restoreRedirect(base)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={base}>
      <MovieSearchProvider>
        <GalleryProvider>
          <App />
        </GalleryProvider>
      </MovieSearchProvider>
    </BrowserRouter>
  </StrictMode>,
)

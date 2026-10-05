import { Navigate, Route, Routes } from 'react-router'
import NavBar from './components/NavBar'
import ListView from './pages/ListView'
import GalleryView from './pages/GalleryView'
import DetailView from './pages/DetailView'
import './App.css'

function App() {
  return (
    <>
      <NavBar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/detail" element={<DetailView />} />
        </Routes>
      </main>
    </>
  )
}

export default App

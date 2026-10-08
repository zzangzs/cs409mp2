import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router'
import { getCharacters } from './api/genshin'
import type { Character } from './types/character'
import ListPage from './pages/ListPage'
import GalleryPage from './pages/GalleryPage'
import DetailPage from './pages/DetailPage'
import './App.css'

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false

    async function load() {
      setLoading(true)
      setError('')

      try {
        const data = await getCharacters()
        if (!ignore) setCharacters(data)
      } catch {
        if (!ignore) {
          setError('Could not load characters. Please try again.')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    void load()

    return () => {
      ignore = true
    }
  }, [attempt])

  return (
    <>
      <header className="site-header">
        <h1>Genshin Character Explorer</h1>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>List</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
        </nav>
      </header>

      <main>
        {loading ? (
          <p role="status">Loading characters…</p>
        ) : error ? (
          <div role="alert">
            <p>{error}</p>
            <button onClick={() => setAttempt(value => value + 1)}>
              Retry
            </button>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<ListPage characters={characters} />}
            />
            <Route
              path="/gallery"
              element={<GalleryPage characters={characters} />}
            />
            <Route
              path="/characters/:id"
              element={<DetailPage characters={characters} />}
            />
            <Route path="*" element={<p>Page not found.</p>} />
          </Routes>
        )}
      </main>
    </>
  )
}

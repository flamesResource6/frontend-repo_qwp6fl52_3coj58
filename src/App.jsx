import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import PetCard from './components/PetCard'
import AdoptModal from './components/AdoptModal'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState({ species: '', size: '' })
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)
  const [toast, setToast] = useState(null)

  const fetchPets = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (filter.species) params.set('species', filter.species)
    if (filter.size) params.set('size', filter.size)
    if (query) params.set('q', query)
    const res = await fetch(`${API_BASE}/api/pets?${params.toString()}`)
    const data = await res.json()
    setPets(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPets()
  }, [])

  const onAdopt = (pet) => {
    setSelectedPet(pet)
    setModalOpen(true)
  }

  const submitAdoption = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/api/adopt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      setToast({ type: 'success', message: 'Request received! Check your email soon.' })
      setModalOpen(false)
    } catch (e) {
      setToast({ type: 'error', message: e.message })
    } finally {
      setTimeout(() => setToast(null), 3000)
    }
  }

  const applyFilters = () => fetchPets()

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-amber-50">
      <Hero />

      <section id="how" className="container mx-auto px-6 py-12">
        <div className="rounded-3xl bg-white/80 backdrop-blur border border-purple-100 p-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-800">How adoption works</h2>
          <p className="mt-2 text-purple-700/80">Browse, fall in love, and send a message. We’ll guide you gently through the next steps.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-purple-700">
            <div className="rounded-2xl bg-purple-50 p-4">1. Explore sweet companions</div>
            <div className="rounded-2xl bg-pink-50 p-4">2. Send a friendly request</div>
            <div className="rounded-2xl bg-amber-50 p-4">3. Meet and bring them home</div>
          </div>
        </div>
      </section>

      <section id="pets" className="container mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-800">Available friends</h2>
            <p className="text-purple-700/80">Soft palettes, softer cuddles.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input placeholder="Search by name, bio, or location" className="rounded-full px-4 py-2 border border-purple-200 bg-white/80" value={query} onChange={e=>setQuery(e.target.value)} />
            <select className="rounded-full px-4 py-2 border border-purple-200 bg-white/80" value={filter.species} onChange={e=>setFilter(f=>({...f, species: e.target.value}))}>
              <option value="">All species</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Rabbit</option>
              <option>Bird</option>
              <option>Hamster</option>
              <option>Other</option>
            </select>
            <select className="rounded-full px-4 py-2 border border-purple-200 bg-white/80" value={filter.size} onChange={e=>setFilter(f=>({...f, size: e.target.value}))}>
              <option value="">Any size</option>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
            <button onClick={applyFilters} className="rounded-full bg-purple-600 text-white px-5 py-2">Apply</button>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-purple-700">Loading pets…</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map(p => (
              <PetCard key={p.id} pet={p} onAdopt={onAdopt} />
            ))}
          </div>
        )}
      </section>

      <footer className="py-10 text-center text-purple-600/80">
        Made with love and gentle colors.
      </footer>

      <AdoptModal open={modalOpen} onClose={() => setModalOpen(false)} pet={selectedPet} onSubmit={submitAdoption} />

      {toast && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-2 shadow ${toast.type==='success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

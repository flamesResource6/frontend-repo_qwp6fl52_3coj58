import React from 'react'
import { Heart } from 'lucide-react'

export default function PetCard({ pet, onAdopt }) {
  return (
    <div className="group rounded-3xl bg-white/80 backdrop-blur border border-purple-100 p-4 shadow-md hover:shadow-lg transition">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <img src={pet.photo_url} alt={pet.name} className="h-full w-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-purple-800">{pet.name}</h3>
          <span className="text-xs rounded-full bg-purple-50 text-purple-700 px-2 py-1">{pet.species}</span>
        </div>
        <p className="text-sm text-purple-600/80 mt-1">{pet.gender} • {pet.size} • {pet.age_years} yrs</p>
        {pet.location && <p className="text-xs text-purple-500 mt-1">{pet.location}</p>}
        <p className="text-sm text-purple-700/90 mt-2 line-clamp-2">{pet.description}</p>
        <button onClick={() => onAdopt(pet)} className="mt-3 inline-flex items-center gap-2 rounded-full bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 shadow">
          <Heart size={16} className="fill-white/60" /> Adopt
        </button>
      </div>
    </div>
  )
}

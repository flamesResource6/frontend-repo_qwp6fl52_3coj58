import React, { useState } from 'react'

export default function AdoptModal({ open, onClose, pet, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  if (!open || !pet) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ pet_id: pet.id, name, email, message })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-purple-900/20 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl border border-purple-100">
        <h3 className="text-2xl font-bold text-purple-800">Adopt {pet.name}</h3>
        <p className="text-purple-600/80 text-sm mt-1">We'll reach out with next steps.</p>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-purple-700 mb-1">Your name</label>
            <input className="w-full rounded-xl border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm text-purple-700 mb-1">Email</label>
            <input type="email" className="w-full rounded-xl border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm text-purple-700 mb-1">Message</label>
            <textarea className="w-full rounded-xl border border-purple-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300" rows={3} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell us about your home and lifestyle"/>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-full px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100">Cancel</button>
            <button type="submit" className="rounded-full px-4 py-2 bg-pink-400 text-white hover:bg-pink-500">Send request</button>
          </div>
        </form>
      </div>
    </div>
  )
}

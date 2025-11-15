import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/fTzRQ8pMbm1-BzvF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 container mx-auto px-6 pt-16 pb-20 flex flex-col items-center text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-800 drop-shadow-sm">
          Paws & Hugs Adoption
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-purple-700/80">
          Find your new best friend in a cozy, pastel world. Gentle companions, big hearts.
        </p>
        <div className="mt-8 flex gap-3">
          <a href="#pets" className="rounded-full bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 shadow-lg shadow-pink-200 transition">
            Browse Pets
          </a>
          <a href="#how" className="rounded-full bg-white/80 hover:bg-white text-purple-700 px-6 py-3 shadow-lg ring-1 ring-purple-200 transition">
            How it works
          </a>
        </div>
      </div>
    </section>
  )
}

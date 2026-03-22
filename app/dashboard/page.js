'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
    }
    getUser()
  }, [])

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white px-6 py-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-300">SpeakEng</h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/')
            }}
            className="text-sm text-blue-400 hover:text-white transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-1">
            Welcome, {user.user_metadata?.full_name || 'Student'}! 👋
          </h2>
          <p className="text-blue-300">Aaj ka goal — 20 min English practice!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-5">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold mb-1">Level Test</h3>
            <p className="text-blue-300 text-sm mb-4">Apna English level pata karo</p>
            <a href="/test"
              className="block text-center bg-blue-500 hover:bg-blue-400 rounded-xl py-2 text-sm font-semibold transition">
              Test Shuru Karo
            </a>
          </div>

          <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-5">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold mb-1">Lessons</h3>
            <p className="text-blue-300 text-sm mb-4">Tumhare level ke lessons</p>
            <button className="w-full bg-blue-800 rounded-xl py-2 text-sm text-blue-400 cursor-not-allowed">
              Pehle Test Do
            </button>
          </div>

          <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-5">
            <div className="text-3xl mb-3">🎤</div>
            <h3 className="font-semibold mb-1">Mock Interview</h3>
            <p className="text-blue-300 text-sm mb-4">AI se practice karo</p>
            <button className="w-full bg-blue-800 rounded-xl py-2 text-sm text-blue-400 cursor-not-allowed">
              Pehle Test Do
            </button>
          </div>
        </div>

        <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Tumhara Level</h3>
              <p className="text-blue-300 text-sm">Abhi tak test nahi diya</p>
            </div>
            <span className="bg-blue-700 text-blue-200 px-4 py-2 rounded-full text-sm font-semibold">
              Not Tested
            </span>
          </div>
        </div>

      </div>
    </main>
  )
}
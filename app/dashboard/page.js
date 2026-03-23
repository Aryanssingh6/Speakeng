'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

const levelColors = {
  A1: 'text-red-400 bg-red-900/40 border-red-700',
  A2: 'text-orange-400 bg-orange-900/40 border-orange-700',
  B1: 'text-yellow-400 bg-yellow-900/40 border-yellow-700',
  B2: 'text-green-400 bg-green-900/40 border-green-700',
  C1: 'text-blue-400 bg-blue-900/40 border-blue-700',
  C2: 'text-purple-400 bg-purple-900/40 border-purple-700',
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [userLevel, setUserLevel] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
        } else {
          setUser(user)
          const { data } = await supabase.from('profiles').select('level').eq('id', user.id).single()
          setUserLevel(data?.level || null)
        }
      } catch (err) {
        console.log(err)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [router])

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </main>
    )
  }

  const hasLevel = !!userLevel
  const levelStyle = userLevel ? levelColors[userLevel] : 'text-blue-400 bg-blue-800/40 border-blue-700'

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

          {/* Level Test */}
          <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-5">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold mb-1">Level Test</h3>
            <p className="text-blue-300 text-sm mb-4">
              {hasLevel ? `Current level: ${userLevel}` : 'Apna English level pata karo'}
            </p>
            <a href="/test"
              className="block text-center bg-blue-500 hover:bg-blue-400 rounded-xl py-2 text-sm font-semibold transition">
              {hasLevel ? 'Retest Karo' : 'Test Shuru Karo'}
            </a>
          </div>

          {/* Lessons */}
          <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-5">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold mb-1">Lessons</h3>
            <p className="text-blue-300 text-sm mb-4">
              {hasLevel ? `${userLevel} level ke lessons` : 'Tumhare level ke lessons'}
            </p>
            {hasLevel ? (
              <a href="/lessons"
                className="block text-center bg-blue-500 hover:bg-blue-400 rounded-xl py-2 text-sm font-semibold transition">
                Lessons Dekho →
              </a>
            ) : (
              <button className="w-full bg-blue-800 rounded-xl py-2 text-sm text-blue-400 cursor-not-allowed">
                Pehle Test Do
              </button>
            )}
          </div>

          {/* Mock Interview */}
          <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-5">
            <div className="text-3xl mb-3">🎤</div>
            <h3 className="font-semibold mb-1">Mock Interview</h3>
            <p className="text-blue-300 text-sm mb-4">AI se practice karo</p>
            {hasLevel ? (
              <a href="/interview"
                className="block text-center bg-blue-500 hover:bg-blue-400 rounded-xl py-2 text-sm font-semibold transition">
                Interview Shuru Karo →
              </a>
            ) : (
              <button className="w-full bg-blue-800 rounded-xl py-2 text-sm text-blue-400 cursor-not-allowed">
                Pehle Test Do
              </button>
            )}
          </div>

        </div>

        {/* Writing Practice */}
        <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-5 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✍️</span>
              <div>
                <h3 className="font-semibold">Writing Practice</h3>
                <p className="text-blue-300 text-sm">AI feedback ke saath likho</p>
              </div>
            </div>
            <a href="/writing"
              className="bg-blue-500 hover:bg-blue-400 rounded-xl px-4 py-2 text-sm font-semibold transition">
              Start →
            </a>
          </div>
        </div>

        {/* Level Badge */}
        <div className={`border rounded-2xl p-5 ${levelStyle}`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-white">Tumhara Level</h3>
              <p className="text-blue-300 text-sm">
                {hasLevel ? 'Test result se set hua hai' : 'Abhi tak test nahi diya'}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-bold border ${levelStyle}`}>
              {userLevel || 'Not Tested'}
            </span>
          </div>
        </div>

      </div>
    </main>
  )
}
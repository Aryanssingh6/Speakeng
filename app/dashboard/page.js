'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

const levelColors = {
  A1: 'text-red-400 bg-red-900/20 border-red-500/30 shadow-[0_0_15px_rgba(248,113,113,0.15)]',
  A2: 'text-orange-400 bg-orange-900/20 border-orange-500/30 shadow-[0_0_15px_rgba(251,146,60,0.15)]',
  B1: 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30 shadow-[0_0_15px_rgba(250,204,21,0.15)]',
  B2: 'text-green-400 bg-green-900/20 border-green-500/30 shadow-[0_0_15px_rgba(74,222,128,0.15)]',
  C1: 'text-blue-400 bg-blue-900/20 border-blue-500/30 shadow-[0_0_15px_rgba(96,165,250,0.15)]',
  C2: 'text-purple-400 bg-purple-900/20 border-purple-500/30 shadow-[0_0_15px_rgba(192,132,252,0.15)]',
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [userLevel, setUserLevel] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
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
    }
    loadData()
  }, [router])

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-blue-500 animate-spin"></div>
      </main>
    )
  }

  const hasLevel = !!userLevel
  const levelStyle = userLevel ? levelColors[userLevel] : 'text-slate-400 bg-slate-900/30 border-slate-700/50'

  return (
    <main className="min-h-screen text-slate-200 px-6 py-12 relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Top Header */}
        <div className="flex justify-between items-center mb-10 glass-panel rounded-full px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              SpeakEng
            </h1>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/')
            }}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Welcome Section */}
        <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
          <h2 className="text-3xl font-bold text-white mb-2 relative z-10">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{user.user_metadata?.full_name || 'Student'}</span> 👋
          </h2>
          <p className="text-slate-400 font-medium relative z-10">Your personal AI English tutor is ready. Let's make progress today.</p>
        </div>

        {/* Level Banner */}
        <div className={`border rounded-2xl p-6 mb-8 flex justify-between items-center transition-all ${levelStyle}`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10`}>
              <span className="text-2xl">🎓</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Current Proficiency Level</h3>
              <p className="text-sm opacity-80">
                {hasLevel ? 'Determined by your AI assessment' : 'You need to take the level test first'}
              </p>
            </div>
          </div>
          <span className={`px-5 py-2.5 rounded-full text-sm font-bold border flex items-center gap-2 ${levelStyle}`}>
            <span className="w-2 h-2 rounded-full bg-current opacity-70"></span>
            {userLevel || 'Not Tested'}
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* Level Test */}
          <div className="glass-card rounded-3xl p-6 flex flex-col h-full group">
            <div className="w-14 h-14 rounded-2xl bg-blue-900/30 border border-blue-500/20 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.1)]">
              📊
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Level Test</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow">
              {hasLevel ? 'Want to see if you improved? Retake the test.' : 'Evaluate your grammar and vocabulary instantly.'}
            </p>
            <a href="/test"
              className="w-full text-center premium-btn rounded-xl py-3 text-sm font-semibold tracking-wide shadow-lg shadow-blue-500/25">
              {hasLevel ? 'Retake Test' : 'Start Assessment'}
            </a>
          </div>

          {/* Lessons */}
          <div className="glass-card rounded-3xl p-6 flex flex-col h-full group relative overflow-hidden">
            {!hasLevel && <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10 rounded-3xl flex items-center justify-center"><p className="text-slate-400 font-medium px-4 py-2 bg-slate-800/80 rounded-full text-sm border border-slate-700">🔒 Pass test to unlock</p></div>}
            
            <div className="w-14 h-14 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.1)] relative z-0">
              📚
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-0">Curated Lessons</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow relative z-0">
              {hasLevel ? `Specialized curriculum for ${userLevel} level.` : 'Personalized lessons based on your level.'}
            </p>
            
            <a href={hasLevel ? "/lessons" : "#"}
              className={`w-full text-center premium-btn rounded-xl py-3 text-sm font-semibold tracking-wide shadow-lg relative z-0 ${hasLevel ? 'shadow-emerald-500/25' : 'opacity-50'}`}
              style={hasLevel ? { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' } : {}}>
              View Curriculum
            </a>
          </div>

          {/* Mock Interview */}
          <div className="glass-card rounded-3xl p-6 flex flex-col h-full group relative overflow-hidden">
            {!hasLevel && <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10 rounded-3xl flex items-center justify-center"><p className="text-slate-400 font-medium px-4 py-2 bg-slate-800/80 rounded-full text-sm border border-slate-700">🔒 Pass test to unlock</p></div>}

            <div className="w-14 h-14 rounded-2xl bg-violet-900/30 border border-violet-500/20 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.1)] relative z-0">
              🎤
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-0">AI Interview</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow relative z-0">
              Real-time conversational practice with instant feedback.
            </p>
            
            <a href={hasLevel ? "/interview" : "#"}
              className={`w-full text-center premium-btn rounded-xl py-3 text-sm font-semibold tracking-wide shadow-lg relative z-0 ${hasLevel ? 'shadow-violet-500/25' : 'opacity-50'}`}
              style={hasLevel ? { background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' } : {}}>
              Start Session
            </a>
          </div>

        </div>

        {/* Writing Practice (Full Width) */}
        <div className="glass-card rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-full bg-pink-500/5 rounded-full blur-[80px] -mr-20"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
            <div className="flex items-start md:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-pink-900/30 border border-pink-500/20 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(236,72,153,0.1)] group-hover:scale-105 transition-transform flex-shrink-0">
                ✍️
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Writing Studio</h3>
                <p className="text-slate-400">Get sentence-by-sentence corrections and AI grading on your essays.</p>
              </div>
            </div>
            <a href="/writing"
              className="premium-btn rounded-xl px-8 py-3.5 text-sm font-bold tracking-wide shadow-lg shadow-pink-500/20 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)' }}>
              Open Studio →
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
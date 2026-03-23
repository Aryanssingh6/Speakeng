'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

const levelColors = {
  A1: 'text-white border-white/20 bg-white/5',
  A2: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
  B1: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
  B2: 'text-sky-400 border-sky-500/30 bg-sky-500/5',
  C1: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5',
  C2: 'text-rose-400 border-rose-500/30 bg-rose-500/5',
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
          window.location.href = '/login'
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
  }, [])

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-amber-500 animate-spin"></div>
      </main>
    )
  }

  const hasLevel = !!userLevel
  const levelStyle = userLevel ? levelColors[userLevel] : 'text-slate-400 bg-white/5 border-white/10'

  return (
    <main className="min-h-screen text-slate-200 px-6 py-12 relative z-10">
      <div className="max-w-5xl mx-auto">

        {/* Top Header */}
        <div className="flex justify-between items-center mb-10 glass-panel rounded-full px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-black font-extrabold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              SpeakEng
            </h1>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              window.location.href = '/'
            }}
            className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Welcome Section */}
        <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -mr-20 -mt-20"></div>
          <h2 className="text-3xl font-bold text-white mb-2 relative z-10 tracking-tight">
            Welcome back, <span className="text-amber-500">{user.user_metadata?.full_name || 'Student'}</span> 👋
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
              <p className="text-sm opacity-80 mt-0.5">
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
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-5 group-hover:bg-white/10 transition-colors">
              📊
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Level Test</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow">
              {hasLevel ? 'Want to see if you improved? Retake the test.' : 'Evaluate your grammar and vocabulary instantly.'}
            </p>
            <a href="/test"
              className="w-full text-center premium-btn rounded-xl py-3 text-sm font-semibold tracking-wide">
              {hasLevel ? 'Retake Test' : 'Start Assessment'}
            </a>
          </div>

          {/* Lessons */}
          <div className="glass-card rounded-3xl p-6 flex flex-col h-full group relative overflow-hidden">
            {!hasLevel && <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-[2px] z-10 flex items-center justify-center"><p className="text-slate-400 font-medium px-4 py-2 bg-[#050505] rounded-full text-sm border border-white/10">🔒 Pass test to unlock</p></div>}
            
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-5 group-hover:bg-white/10 transition-colors relative z-0">
              📚
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-0 tracking-tight">Curated Lessons</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow relative z-0">
              {hasLevel ? `Specialized curriculum for ${userLevel} level.` : 'Personalized lessons based on your level.'}
            </p>
            
            <a href={hasLevel ? "/lessons" : "#"}
              className={`w-full text-center premium-btn-gold rounded-xl py-3 text-sm font-bold tracking-wide transition-all ${hasLevel ? '' : 'opacity-50'}`}>
              View Curriculum
            </a>
          </div>

          {/* Mock Interview */}
          <div className="glass-card rounded-3xl p-6 flex flex-col h-full group relative overflow-hidden">
            {!hasLevel && <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-[2px] z-10 flex items-center justify-center"><p className="text-slate-400 font-medium px-4 py-2 bg-[#050505] rounded-full text-sm border border-white/10">🔒 Pass test to unlock</p></div>}

            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-5 group-hover:bg-white/10 transition-colors relative z-0">
              🎤
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-0 tracking-tight">AI Interview</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow relative z-0">
              Real-time conversational practice with instant feedback.
            </p>
            
            <a href={hasLevel ? "/interview" : "#"}
              className={`w-full text-center premium-btn-gold rounded-xl py-3 text-sm font-bold tracking-wide transition-all ${hasLevel ? '' : 'opacity-50'}`}>
              Start Session
            </a>
          </div>

        </div>

        {/* Writing Practice (Full Width) */}
        <div className="glass-card rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-full bg-emerald-500/5 rounded-full blur-[80px] -mr-20"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
            <div className="flex items-start md:items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(16,185,129,0.1)] group-hover:scale-105 transition-transform flex-shrink-0">
                ✍️
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Writing Studio</h3>
                <p className="text-slate-400">Get sentence-by-sentence corrections and AI grading on your essays.</p>
              </div>
            </div>
            <a href="/writing"
              className="premium-btn rounded-xl px-8 py-3.5 text-sm font-bold tracking-wide whitespace-nowrap">
              Open Studio →
            </a>
          </div>
        </div>

      </div>
    </main>
  )
}
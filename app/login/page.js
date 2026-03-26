'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { CheckCircle, Star } from 'lucide-react'

const highlights = [
  'AI-powered speaking practice',
  'Smart CEFR level assessment',
  'Personalized daily curriculum',
  'Track your fluency progress',
]

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else if (data?.user) {
        window.location.href = '/dashboard'
      }
    } catch (err) {
      setError('Something went wrong: ' + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-white/[0.05] bg-[#030303] relative z-10">
        <a href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/50 transition-shadow">
            <span className="text-white font-extrabold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SpeakEng</span>
        </a>

        <div>
          <div className="mb-8">
            <span className="text-4xl mb-4 block">🎤</span>
            <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Your AI English tutor<br/>awaits you.
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Join 12,400+ learners mastering English with personalized AI coaching, daily practice, and real-time feedback.
            </p>
          </div>
          <ul className="space-y-3 mb-10">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          {/* Testimonial */}
          <div className="glass-card rounded-2xl p-5 border border-white/[0.06]">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">"I improved from B1 to C1 in just 4 months. The AI feedback is incredibly detailed."</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs">YT</div>
              <div>
                <p className="text-white text-xs font-semibold">Yuki Tanaka</p>
                <p className="text-slate-500 text-xs">MBA Student at UCLA</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} SpeakEng. All rights reserved.</p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">S</span>
            </div>
            <span className="font-bold text-white text-lg">SpeakEng</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Welcome back</h1>
            <p className="text-slate-400 font-medium">Sign in to continue your learning journey.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5 block">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full glass-input rounded-xl px-5 py-4 text-white placeholder-slate-600 text-[15px]"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs text-amber-500 hover:text-amber-400 font-semibold">Forgot password?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full glass-input rounded-xl px-5 py-4 text-white placeholder-slate-600 text-[15px]"
              />
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-5 py-4 flex items-start gap-3">
                <span className="text-rose-400 text-lg shrink-0">⚠️</span>
                <p className="text-sm text-rose-200/90 leading-relaxed">
                  {error.includes('Email not confirmed')
                    ? 'Email not confirmed. (Tip: Disable "Confirm email" in Supabase Auth settings)'
                    : error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full premium-btn-gold rounded-xl py-4 font-bold tracking-wide mt-2 text-[15px] ${loading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            Don't have an account?{' '}
            <a href="/register" className="text-indigo-500 hover:text-indigo-400 font-bold transition-colors">Create one free</a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
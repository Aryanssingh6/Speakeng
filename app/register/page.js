'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { CheckCircle } from 'lucide-react'

const perks = [
  { icon: '🎤', label: 'AI Speaking Practice', desc: 'Real conversations, real feedback.' },
  { icon: '📊', label: 'Smart Level Assessment', desc: 'Know your exact CEFR level in 20 minutes.' },
  { icon: '🔥', label: 'Daily Streaks & XP', desc: 'Gamified learning to keep you motivated.' },
  { icon: '📈', label: 'Progress Analytics', desc: 'Visual charts tracking your fluency growth.' },
]

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const isSuccess = message.includes('Account created')

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Account created! You can now sign in and start your learning journey. 🎉')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Left: Perks panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-white/[0.05] bg-[#030303] relative z-10">
        <a href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="text-white font-extrabold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SpeakEng</span>
        </a>

        <div>
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Free to start
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Everything you need<br />to master English.
            </h2>
            <p className="text-slate-400">No credit card required. Start learning in under 2 minutes.</p>
          </div>

          <div className="space-y-4">
            {perks.map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{p.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-500 text-sm">
          <div className="flex -space-x-2">
            {['#f59e0b','#10b981','#38bdf8','#818cf8'].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-[#030303]" style={{ background: c }} />
            ))}
          </div>
          <span>Join 12,400+ active learners</span>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">S</span>
            </div>
            <span className="font-bold text-white text-lg">SpeakEng</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Create your account</h1>
            <p className="text-slate-400 font-medium">Start mastering English for free today.</p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5 block">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full glass-input rounded-xl px-5 py-4 text-white placeholder-slate-600 text-[15px]"
              />
            </div>
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
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5 block">Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full glass-input rounded-xl px-5 py-4 text-white placeholder-slate-600 text-[15px]"
              />
            </div>

            {message && (
              <div className={`border rounded-xl px-5 py-4 flex items-start gap-3 ${isSuccess ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                <span className={`text-lg shrink-0 mt-0.5 ${isSuccess ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isSuccess ? '✨' : '⚠️'}
                </span>
                <p className={`text-sm leading-relaxed ${isSuccess ? 'text-emerald-200/90' : 'text-rose-200/90'}`}>{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full premium-btn-gold rounded-xl py-4 font-bold tracking-wide mt-2 text-[15px] ${loading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {loading ? 'Creating account...' : 'Create Free Account →'}
            </button>

            <p className="text-xs text-center text-slate-600">
              By signing up, you agree to our{' '}
              <a href="#" className="text-slate-500 hover:text-slate-400 underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-slate-500 hover:text-slate-400 underline">Privacy Policy</a>.
            </p>
          </form>

          <p className="text-center text-slate-500 text-sm mt-7">
            Already have an account?{' '}
            <a href="/login" className="text-amber-500 hover:text-amber-400 font-bold transition-colors">Sign in</a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
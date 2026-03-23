'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        setError(error.message)
      } else if (data?.user) {
        window.location.href = '/dashboard'
      }
    } catch (err) {
      setError('Kuch gadbad hui: ' + err.message)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative z-10 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 w-full max-w-md relative z-10 shadow-2xl">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-3xl">S</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-slate-400 text-center mb-8 font-medium">Please enter your details to sign in.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full glass-input rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full glass-input rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:ring-1 focus:ring-blue-500/50"
            />
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-5 py-4 flex items-start gap-3 mt-2 animate-in fade-in slide-in-from-top-2">
              <span className="text-rose-500 mt-0.5">⚠️</span>
              <p className="text-sm text-rose-200/90 leading-relaxed">{error.includes('Email not confirmed') ? 'Email not confirmed! (Hint: Turn off "Confirm email" in Supabase settings)' : error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={\`w-full premium-btn rounded-xl py-4 font-bold tracking-wide mt-4 shadow-lg shadow-blue-500/20 \${loading ? 'opacity-70 cursor-wait' : ''}\`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-8 font-medium">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-400 hover:text-blue-300 font-bold underline transition-colors">Sign up</a>
        </p>
      </div>
    </main>
  )
}
'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

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
      setMessage('Account created! Check your email for verification. (Or if confirmation is disabled, you can login now.)')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 relative z-10 overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="glass-card rounded-[2.5rem] p-8 md:p-12 w-full max-w-md relative z-10 shadow-2xl">
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-blue-500 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
            <span className="text-white font-bold text-3xl">S</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-white mb-2 tracking-tight">Create Account</h1>
        <p className="text-slate-400 text-center mb-8 font-medium">Join us and start mastering English for free.</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Full Name</label>
            <input type="text" placeholder="John Doe"
              value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full glass-input rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:ring-1 focus:ring-fuchsia-500/50" />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Email Address</label>
            <input type="email" placeholder="name@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full glass-input rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:ring-1 focus:ring-fuchsia-500/50" />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1">Password</label>
            <input type="password" placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full glass-input rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:ring-1 focus:ring-fuchsia-500/50" />
          </div>

          {message && (
            <div className={\`border rounded-xl px-5 py-4 flex items-start gap-3 mt-2 animate-in fade-in slide-in-from-top-2 \${message.includes('Account created') ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}\`}>
              <span className={\`mt-0.5 \${message.includes('Account created') ? 'text-emerald-500' : 'text-rose-500'}\`}>
                {message.includes('Account created') ? '✨' : '⚠️'}
              </span>
              <p className={\`text-sm leading-relaxed \${message.includes('Account created') ? 'text-emerald-200/90' : 'text-rose-200/90'}\`}>
                {message}
              </p>
            </div>
          )}

          <button type="submit" disabled={loading}
            className={\`w-full premium-btn rounded-xl py-4 font-bold tracking-wide mt-4 shadow-lg shadow-fuchsia-500/20 \${loading ? 'opacity-70 cursor-wait' : ''}\`}
            style={{ background: 'linear-gradient(135deg, #d946ef 0%, #3b82f6 100%)' }}>
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-8 font-medium">
          Already have an account?{' '}
          <a href="/login" className="text-fuchsia-400 hover:text-fuchsia-300 font-bold underline transition-colors">Sign in</a>
        </p>
      </div>
    </main>
  )
}
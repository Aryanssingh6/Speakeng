'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage('Email ya password galat hai!')
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white flex items-center justify-center px-4">
      <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">SpeakEng</h1>
        <p className="text-blue-300 text-center mb-8">Wapas aao! Login karo</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <div>
            <label className="text-sm text-blue-300 mb-1 block">Email</label>
            <input type="email" placeholder="tumhari@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-blue-900/50 border border-blue-600 rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-400"/>
          </div>

          <div>
            <label className="text-sm text-blue-300 mb-1 block">Password</label>
            <input type="password" placeholder="Apna password daalo"
              value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full bg-blue-900/50 border border-blue-600 rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-400"/>
          </div>

          {message && (
            <p className="text-center text-sm text-red-300 bg-red-900/30 rounded-xl px-4 py-3">
              {message}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-400 disabled:bg-blue-700 rounded-xl py-3 font-semibold transition mt-2">
            {loading ? 'Login ho raha hai...' : 'Login Karo'}
          </button>

        </form>

        <p className="text-center text-blue-400 text-sm mt-6">
          Naya account chahiye?{' '}
          <a href="/register" className="text-blue-300 underline">Register karo</a>
        </p>

      </div>
    </main>
  )
}
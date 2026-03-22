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
      setMessage('Account ban gaya! Email check karo verification ke liye.')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white flex items-center justify-center px-4">
      <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">SpeakEng</h1>
        <p className="text-blue-300 text-center mb-8">Account banao — bilkul free</p>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">

          <div>
            <label className="text-sm text-blue-300 mb-1 block">Tumhara Naam</label>
            <input type="text" placeholder="Jaise: Rahul Sharma"
              value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full bg-blue-900/50 border border-blue-600 rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-400"/>
          </div>

          <div>
            <label className="text-sm text-blue-300 mb-1 block">Email</label>
            <input type="email" placeholder="tumhari@email.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-blue-900/50 border border-blue-600 rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-400"/>
          </div>

          <div>
            <label className="text-sm text-blue-300 mb-1 block">Password</label>
            <input type="password" placeholder="Strong password likho"
              value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full bg-blue-900/50 border border-blue-600 rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-400"/>
          </div>

          {message && (
            <p className="text-center text-sm text-yellow-300 bg-yellow-900/30 rounded-xl px-4 py-3">
              {message}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-400 disabled:bg-blue-700 rounded-xl py-3 font-semibold transition mt-2">
            {loading ? 'Ban raha hai...' : 'Account Banao'}
          </button>

        </form>

        <p className="text-center text-blue-400 text-sm mt-6">
          Pehle se account hai?{' '}
          <a href="/login" className="text-blue-300 underline">Login karo</a>
        </p>

      </div>
    </main>
  )
}
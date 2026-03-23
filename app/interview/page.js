'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

const TOTAL_ROUNDS = 5

export default function Interview() {
  const [userLevel, setUserLevel] = useState('A2')
  const [round, setRound] = useState(0)
  const [question, setQuestion] = useState('')
  const [tips, setTips] = useState('')
  const [feedback, setFeedback] = useState('')
  const [summary, setSummary] = useState('')
  const [userAnswer, setUserAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [history, setHistory] = useState([]) // [{question, answer, feedback}]
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('level').eq('id', user.id).single()
      if (data?.level) setUserLevel(data.level)
    }
    load()
  }, [router])

  const startInterview = async () => {
    setLoading(true)
    setStarted(true)
    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ round: 0, userAnswer: null, userLevel })
      })
      const data = await res.json()
      if (data.success) {
        setQuestion(data.question)
        setTips(data.tips)
      }
    } catch (err) { console.log(err) }
    setLoading(false)
  }

  const submitAnswer = async () => {
    if (userAnswer.trim().length < 5) {
      alert('Thoda aur answer do!')
      return
    }
    setLoading(true)

    const currentQuestion = question
    const currentAnswer = userAnswer

    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ round, userAnswer: currentAnswer, userLevel })
      })
      const data = await res.json()
      if (data.success) {
        setHistory(prev => [...prev, { question: currentQuestion, answer: currentAnswer, feedback: data.feedback }])
        setFeedback(data.feedback || '')
        setUserAnswer('')

        if (data.isLast) {
          setSummary(data.summary || '')
          setFinished(true)
        } else {
          setQuestion(data.question)
          setTips(data.tips)
          setRound(r => r + 1)
        }
      }
    } catch (err) { console.log(err) }
    setLoading(false)
  }

  // Landing Screen
  if (!started) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎤</div>
          <h1 className="text-2xl font-bold mb-2">Mock Interview</h1>
          <p className="text-blue-300 mb-2">AI se English interview practice karo</p>
          <p className="text-blue-400 text-sm mb-6">
            5 rounds mein AI tumse questions poochega, tum answer doge, aur AI feedback dega.
            <br />Your level: <span className="text-white font-semibold">{userLevel}</span>
          </p>
          <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-5 mb-6 text-left space-y-2">
            {['Introduce yourself', 'Your hobbies & interests', 'Your daily routine', 'Future goals & career plans', 'A challenge you overcame'].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-blue-200">
                <span className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center text-xs font-bold text-blue-200 flex-shrink-0">{i + 1}</span>
                {t}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/dashboard')}
              className="flex-1 bg-blue-800 hover:bg-blue-700 border border-blue-700 rounded-xl py-3 text-sm font-semibold transition">
              ← Back
            </button>
            <button onClick={startInterview} disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-400 rounded-xl py-3 font-semibold transition">
              {loading ? 'Loading...' : 'Interview Shuru Karo 🚀'}
            </button>
          </div>
        </div>
      </main>
    )
  }

  // Finished Screen
  if (finished) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold mb-1">Interview Complete!</h2>
            <p className="text-blue-300">Bahut achha kiya! Yeh raha AI ka overall feedback</p>
          </div>

          {summary && (
            <div className="bg-blue-800/40 border border-blue-600 rounded-2xl p-6 mb-6">
              <h3 className="text-blue-300 font-semibold mb-3">📊 Overall Summary</h3>
              <p className="text-blue-100 text-sm leading-relaxed">{summary}</p>
            </div>
          )}

          <h3 className="font-semibold text-blue-300 mb-4">Your Interview Rounds:</h3>
          <div className="space-y-4 mb-6">
            {history.map((h, i) => (
              <div key={i} className="bg-blue-800/40 border border-blue-700 rounded-2xl p-5">
                <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Round {i + 1}</p>
                <p className="text-blue-200 text-sm mb-2 font-medium">Q: {h.question}</p>
                <p className="text-white text-sm mb-3 bg-blue-900/40 rounded-xl px-3 py-2">A: {h.answer}</p>
                {h.feedback && (
                  <p className="text-green-300 text-sm">💬 {h.feedback}</p>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => { setStarted(false); setFinished(false); setRound(0); setHistory([]); setFeedback(''); setSummary(''); setQuestion(''); setTips('') }}
              className="bg-blue-700 hover:bg-blue-600 border border-blue-600 rounded-xl py-3 text-sm font-semibold transition">
              🔄 Dobara Karo
            </button>
            <button onClick={() => router.push('/dashboard')}
              className="bg-blue-500 hover:bg-blue-400 rounded-xl py-3 text-sm font-semibold transition">
              Dashboard →
            </button>
          </div>
        </div>
      </main>
    )
  }

  // Active Interview
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-blue-300">🎤 Mock Interview</h1>
          <span className="text-blue-400 text-sm">Round {round + 1}/{TOTAL_ROUNDS}</span>
        </div>

        {/* Progress */}
        <div className="w-full bg-blue-900 rounded-full h-2 mb-6">
          <div className="bg-blue-400 h-2 rounded-full transition-all" style={{ width: `${((round) / TOTAL_ROUNDS) * 100}%` }} />
        </div>

        {/* Previous feedback */}
        {feedback && (
          <div className="bg-green-900/30 border border-green-700/50 rounded-2xl p-4 mb-4">
            <p className="text-xs text-green-400 uppercase tracking-wider mb-1 font-semibold">AI Feedback</p>
            <p className="text-green-200 text-sm leading-relaxed">{feedback}</p>
          </div>
        )}

        {/* Question */}
        {loading ? (
          <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-6 mb-4 flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-300">AI soch raha hai...</p>
          </div>
        ) : (
          <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-6 mb-4">
            <p className="text-xs text-blue-400 uppercase tracking-wider mb-2 font-semibold">AI Interviewer</p>
            <p className="text-white text-base font-medium leading-relaxed">{question}</p>
          </div>
        )}

        {/* Tips */}
        {tips && !loading && (
          <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-xl px-4 py-3 mb-4">
            <p className="text-yellow-300 text-xs">💡 Tip: {tips}</p>
          </div>
        )}

        {/* Answer input */}
        <div className="mb-4">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Yahan apna answer English mein likho..."
            rows={5}
            disabled={loading}
            className="w-full bg-blue-900/50 border border-blue-600 rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-400 resize-none disabled:opacity-50"
          />
          <p className="text-blue-400 text-xs mt-1 px-1">{userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0} words</p>
        </div>

        <button
          onClick={submitAnswer}
          disabled={loading || userAnswer.trim().length < 5}
          className="w-full bg-blue-500 hover:bg-blue-400 disabled:bg-blue-800 disabled:text-blue-500 rounded-xl py-3 font-semibold transition">
          {loading ? '⏳ AI process kar raha hai...' : round >= TOTAL_ROUNDS - 1 ? 'Submit Final Answer 🏁' : 'Submit Answer → Next Round'}
        </button>

      </div>
    </main>
  )
}

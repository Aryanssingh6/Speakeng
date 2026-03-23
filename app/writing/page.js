'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const prompts = [
  "Apne aap ke baare mein 5 sentences mein likho (About yourself)",
  "Apna favourite hobby describe karo English mein",
  "Apne future goals ke baare mein likho",
  "Apne best friend ke baare mein likho",
  "Apna favourite movie ya show describe karo",
  "Describe your ideal day from morning to night",
  "What do you want to achieve in the next 5 years?",
  "Describe your hometown or neighbourhood",
]

function parseFeedback(text) {
  const sections = {}
  const scoreMatch = text.match(/SCORE:\s*(\d+\/\d+)/i)
  if (scoreMatch) sections.score = scoreMatch[1]

  const goodMatch = text.match(/GOOD POINTS?:\s*([\s\S]*?)(?=IMPROVEMENTS?:|$)/i)
  if (goodMatch) sections.good = goodMatch[1].trim().split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s*/, '').trim())

  const improvMatch = text.match(/IMPROVEMENTS?:\s*([\s\S]*?)(?=CORRECTED VERSION:|$)/i)
  if (improvMatch) sections.improvements = improvMatch[1].trim().split('\n').filter(l => l.trim().startsWith('-')).map(l => l.replace(/^-\s*/, '').trim())

  const corrMatch = text.match(/CORRECTED VERSION:\s*([\s\S]*?)(?=ENCOURAGEMENT:|$)/i)
  if (corrMatch) sections.corrected = corrMatch[1].trim()

  const encMatch = text.match(/ENCOURAGEMENT:\s*([\s\S]*?)$/i)
  if (encMatch) sections.encouragement = encMatch[1].trim()

  return sections
}

function ScoreRing({ score }) {
  const [num] = score.split('/')
  const pct = (parseInt(num) / 10) * 100
  const color = parseInt(num) >= 8 ? '#4ade80' : parseInt(num) >= 6 ? '#facc15' : '#f87171'
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-2">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e3a5f" strokeWidth="3.8" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3.8"
            strokeDasharray={`${pct} ${100 - pct}`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{score}</span>
        </div>
      </div>
      <p className="text-blue-300 text-sm font-medium">Your Score</p>
    </div>
  )
}

export default function Writing() {
  const [text, setText] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [promptIndex, setPromptIndex] = useState(0)
  const router = useRouter()

  const prompt = prompts[promptIndex]
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  const shufflePrompt = () => {
    setPromptIndex((promptIndex + 1) % prompts.length)
    setText('')
    setFeedback(null)
  }

  const getFeedback = async () => {
    if (text.trim().split(/\s+/).length < 10) {
      alert('Thoda aur likho! (at least 10 words)')
      return
    }
    setLoading(true)
    setFeedback(null)
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are an English teacher helping Indian students improve their English.
The student was asked to write about: "${prompt}"
Their writing: "${text}"
Please give feedback in a friendly, encouraging way. Structure your response EXACTLY like this (use these exact headings):

SCORE: X/10

GOOD POINTS:
- (what they did well)
- (another good point)

IMPROVEMENTS:
- (what to improve)
- (another improvement)

CORRECTED VERSION:
(Write a better version of their text)

ENCOURAGEMENT:
(One encouraging line in Hinglish)`
        })
      })
      const data = await res.json()
      if (data.success) {
        setFeedback(parseFeedback(data.text))
      } else {
        setFeedback({ error: data.error })
      }
    } catch (err) {
      console.log(err)
      setFeedback({ error: 'Kuch gadbad hui, dobara try karo!' })
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-blue-300">✍️ Writing Practice</h1>
          <button onClick={() => router.push('/dashboard')}
            className="text-sm text-blue-400 hover:text-white transition">
            ← Dashboard
          </button>
        </div>

        {/* Prompt Card */}
        <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-6 mb-5">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-blue-400 uppercase tracking-wider font-semibold">Writing Prompt</p>
            <button onClick={shufflePrompt}
              className="text-xs text-blue-400 hover:text-blue-200 transition flex items-center gap-1 bg-blue-900/50 px-3 py-1 rounded-full">
              🔀 New Prompt
            </button>
          </div>
          <h2 className="text-base font-semibold text-white leading-relaxed">{prompt}</h2>
        </div>

        {/* Text Area */}
        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Yahan apni English mein likho..."
            rows={6}
            className="w-full bg-blue-900/50 border border-blue-600 rounded-xl px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:border-blue-400 resize-none"
          />
          <div className="flex justify-between text-xs text-blue-400 mt-1 px-1">
            <span>{wordCount} words</span>
            <span>{text.length} characters</span>
          </div>
        </div>

        <button
          onClick={getFeedback}
          disabled={loading || wordCount < 10}
          className="w-full bg-blue-500 hover:bg-blue-400 disabled:bg-blue-800 disabled:text-blue-500 rounded-xl py-3 font-semibold transition mb-6">
          {loading ? '⏳ AI feedback le raha hai...' : '🤖 AI Feedback Lo'}
        </button>

        {/* Feedback */}
        {feedback && !feedback.error && (
          <div className="space-y-4">

            {/* Score */}
            {feedback.score && (
              <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-6 flex items-center gap-6">
                <ScoreRing score={feedback.score} />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">AI Teacher ka Feedback</h3>
                  <p className="text-blue-300 text-sm">Detailed feedback neeche hai 👇</p>
                </div>
              </div>
            )}

            {/* Good Points */}
            {feedback.good?.length > 0 && (
              <div className="bg-green-900/30 border border-green-700/50 rounded-2xl p-5">
                <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">✅ Good Points</h4>
                <ul className="space-y-2">
                  {feedback.good.map((p, i) => (
                    <li key={i} className="text-green-200 text-sm flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {feedback.improvements?.length > 0 && (
              <div className="bg-orange-900/30 border border-orange-700/50 rounded-2xl p-5">
                <h4 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">💡 Improvements</h4>
                <ul className="space-y-2">
                  {feedback.improvements.map((p, i) => (
                    <li key={i} className="text-orange-200 text-sm flex items-start gap-2">
                      <span className="text-orange-400 mt-0.5">•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Corrected Version */}
            {feedback.corrected && (
              <div className="bg-blue-800/40 border border-blue-600 rounded-2xl p-5">
                <h4 className="text-blue-300 font-semibold mb-3">📝 Corrected Version</h4>
                <p className="text-blue-100 text-sm leading-relaxed whitespace-pre-wrap">{feedback.corrected}</p>
              </div>
            )}

            {/* Encouragement */}
            {feedback.encouragement && (
              <div className="bg-purple-900/30 border border-purple-700/50 rounded-2xl p-5 text-center">
                <p className="text-purple-200 text-sm italic">🌟 {feedback.encouragement}</p>
              </div>
            )}

            <button onClick={() => { setText(''); setFeedback(null); shufflePrompt() }}
              className="w-full bg-blue-800 hover:bg-blue-700 rounded-xl py-3 text-sm font-semibold text-blue-300 transition">
              🔄 Naya Prompt Try Karo
            </button>
          </div>
        )}

        {feedback?.error && (
          <div className="bg-red-900/30 border border-red-700/50 rounded-2xl p-5 text-red-300 text-sm">
            ❌ {feedback.error}
          </div>
        )}

      </div>
    </main>
  )
}
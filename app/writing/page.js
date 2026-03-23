'use client'
import { useState } from 'react'

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
  const color = parseInt(num) >= 8 ? '#10b981' : parseInt(num) >= 6 ? '#f59e0b' : '#ef4444'
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-2">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3.8" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3.8"
            strokeDasharray={`${pct} ${100 - pct}`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white drop-shadow-md">{score}</span>
        </div>
      </div>
      <p className="text-slate-400 text-sm font-medium tracking-wide">Your Score</p>
    </div>
  )
}

export default function Writing() {
  const [text, setText] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [promptIndex, setPromptIndex] = useState(0)

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
    <main className="min-h-screen text-slate-200 px-6 py-10 relative z-10 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-500/10 border border-emerald-500/20">
                <span className="text-xl">✍️</span>
             </div>
             <h1 className="text-2xl font-bold text-white tracking-tight">Writing Studio</h1>
          </div>
          <a href="/dashboard"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/20">
            ← Dashboard
          </a>
        </div>

        {/* Prompt Card */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
               <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold">Today's Subject</p>
            </div>
            <button onClick={shufflePrompt}
              className="text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              Shuffle Topic
            </button>
          </div>
          <h2 className="text-xl font-medium text-white leading-relaxed">{prompt}</h2>
        </div>

        {/* Text Area */}
        <div className="mb-6 relative group">
          <div className="absolute -inset-0.5 bg-emerald-500/10 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start drafting your masterpiece here..."
            rows={8}
            className="relative w-full glass-input rounded-2xl px-6 py-5 text-white placeholder-slate-500 text-lg leading-relaxed resize-y min-h-[150px]"
          />
          <div className="absolute bottom-4 right-4 flex gap-4 text-xs font-medium text-slate-400">
            <span className="bg-[#050505] px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">{wordCount} words</span>
          </div>
        </div>

        <button
          onClick={getFeedback}
          disabled={loading || wordCount < 10}
          className={`w-full premium-btn-gold rounded-xl py-4 transition-all mb-10 ${loading || 10 > wordCount ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {loading ? '⏳ Analyzing text with AI...' : '✨ Get Instant Feedback'}
        </button>

        {/* Feedback Section */}
        {feedback && !feedback.error && (
          <div className="space-y-6 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2"><span className="text-2xl">🪄</span> AI Assessment</h3>

            {/* Score */}
            {feedback.score && (
              <div className="glass-card rounded-3xl p-6 flex flex-col md:flex-row items-center gap-8 border-l-4 border-l-emerald-500">
                <ScoreRing score={feedback.score} />
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Great effort!</h3>
                  <p className="text-slate-400">We've broken down your writing to show exactly what you did well and what needs polish.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Good Points */}
              {feedback.good?.length > 0 && (
                <div className="glass-card rounded-2xl bg-emerald-500/5 p-6 border-t border-t-emerald-500/20 h-full">
                  <h4 className="text-emerald-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">✅</span> Strengths
                  </h4>
                  <ul className="space-y-3">
                    {feedback.good.map((p, i) => (
                      <li key={i} className="text-emerald-100/80 text-sm flex items-start gap-3 leading-relaxed">
                        <span className="text-emerald-400 mt-1">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {feedback.improvements?.length > 0 && (
                <div className="glass-card rounded-2xl bg-amber-500/5 p-6 border-t border-t-amber-500/20 h-full">
                  <h4 className="text-amber-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">💡</span> To Improve
                  </h4>
                  <ul className="space-y-3">
                    {feedback.improvements.map((p, i) => (
                      <li key={i} className="text-amber-100/80 text-sm flex items-start gap-3 leading-relaxed">
                        <span className="text-amber-400 mt-1">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Corrected Version */}
            {feedback.corrected && (
              <div className="glass-card rounded-2xl p-6 border-t border-t-sky-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-[50px] -mr-10 -mt-10"></div>
                <h4 className="text-sky-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider relative z-10">
                  <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center">💎</span> Perfected Version
                </h4>
                <div className="bg-[#050505] rounded-xl p-5 border border-white/10 relative z-10">
                  <p className="text-slate-200 text-base leading-relaxed whitespace-pre-wrap">{feedback.corrected}</p>
                </div>
              </div>
            )}

            {/* Encouragement */}
            {feedback.encouragement && (
              <div className="glass-card rounded-full px-8 py-5 text-center bg-white/5 border border-white/10">
                <p className="text-white font-medium italic">🌟 "{feedback.encouragement}"</p>
              </div>
            )}

            <button onClick={() => { setText(''); setFeedback(null); shufflePrompt() }}
              className="w-full glass-card hover:bg-white/10 rounded-xl py-4 font-bold text-white transition-colors border border-white/20 uppercase tracking-widest text-sm mt-4">
              Start Next Prompt 🚀
            </button>
          </div>
        )}

        {feedback?.error && (
          <div className="glass-card rounded-2xl p-6 text-rose-300 bg-rose-500/10 border border-rose-500/20 mt-6 flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-bold mb-1">Error During Analysis</p>
              <p className="text-sm opacity-80">{feedback.error}</p>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
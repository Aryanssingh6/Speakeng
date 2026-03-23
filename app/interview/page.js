'use client'
import { useEffect, useState, useRef } from 'react'
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
  const [history, setHistory] = useState([]) 
  const router = useRouter()
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (started) scrollToBottom()
  }, [history, question, loading])

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
      } else {
        alert("API Error: " + data.error)
        setStarted(false)
      }
    } catch (err) { console.log(err) }
    setLoading(false)
  }

  const submitAnswer = async () => {
    if (userAnswer.trim().length < 5) {
      alert('Thoda aur answer do! (Minimum 5 words)')
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
      } else {
        alert("API Error: " + data.error)
      }
    } catch (err) { console.log(err) }
    setLoading(false)
  }

  // Landing Screen
  if (!started) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 relative z-10 transition-colors">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div className="max-w-md w-full text-center relative z-10">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-violet-900/30 border border-violet-500/20 flex items-center justify-center text-5xl mb-6 shadow-[0_0_30px_rgba(139,92,246,0.15)] animate-pulse-slow">
            🎙️
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-300 mb-3">
            AI Mock Interview
          </h1>
          <p className="text-slate-400 mb-8 font-medium">Practice your spoken English in a stress-free conversational environment.</p>
          
          <div className="glass-card rounded-2xl p-6 mb-8 text-left space-y-3 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[40px]"></div>
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">5-Round Session</p>
            {['Introduce yourself', 'Discuss hobbies & interests', 'Describe your daily routine', 'Future goals & aspirations', 'Overcoming a challenge'].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-6 h-6 bg-slate-800/80 rounded-full border border-slate-700/50 flex items-center justify-center text-[10px] font-bold text-violet-300 flex-shrink-0">{i + 1}</span>
                {t}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={startInterview} disabled={loading}
              className="w-full premium-btn rounded-xl py-4 font-bold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.2)]"
              style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)' }}>
              {loading ? 'Initializing Interface...' : 'Start Interview Session 🚀'}
            </button>
            <button onClick={() => window.location.href = '/dashboard'}
              className="w-full glass-panel hover:bg-slate-800/50 rounded-xl py-3 font-semibold text-slate-400 transition-colors">
              Return to Dashboard
            </button>
          </div>
        </div>
      </main>
    )
  }

  // Finished Screen
  if (finished) {
    return (
      <main className="min-h-screen text-slate-200 px-4 py-12 relative z-10 transition-colors duration-500">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-900/30 border border-emerald-500/20 flex items-center justify-center text-4xl mb-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              🏆
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Interview Complete!</h2>
            <p className="text-slate-400 font-medium">Here is a comprehensive review of your performance.</p>
          </div>

          {summary && (
            <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden border-l-4 border-l-emerald-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -mr-20 -mt-20"></div>
              <h3 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
                 <span className="text-lg">📊</span> Overall Summary
              </h3>
              <p className="text-emerald-50/90 leading-relaxed text-[15px]">{summary}</p>
            </div>
          )}

          <h3 className="font-bold text-slate-300 mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs">📜</span> Session Transcript
          </h3>
          
          <div className="space-y-6 mb-10">
            {history.map((h, i) => (
              <div key={i} className="glass-panel rounded-2xl p-6 relative">
                 <p className="absolute -top-3 left-6 px-3 py-1 glass-card border border-white/10 rounded-full text-[10px] uppercase font-bold text-violet-300 tracking-wider">Round {i + 1}</p>
                 <div className="mt-2 space-y-4">
                    <p className="text-slate-200 font-medium leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-700/50"><span className="text-violet-400 font-bold mr-2">Q:</span>{h.question}</p>
                    <div className="ml-6 flex items-start gap-3">
                       <span className="text-blue-400 mt-1 font-bold">A:</span>
                       <p className="text-slate-300 text-[15px] italic">"{h.answer}"</p>
                    </div>
                    {h.feedback && (
                      <div className="ml-6 mt-3 bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
                         <span className="text-emerald-400 text-lg">💡</span>
                         <p className="text-emerald-200/90 text-[14px] leading-relaxed">{h.feedback}</p>
                      </div>
                    )}
                 </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => { setStarted(false); setFinished(false); setRound(0); setHistory([]); setFeedback(''); setSummary(''); setQuestion(''); setTips('') }}
              className="premium-btn rounded-xl py-4 text-sm font-bold shadow-lg shadow-violet-500/20"
              style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}>
              Start New Session 🔄
            </button>
            <button onClick={() => window.location.href = '/dashboard'}
              className="glass-card hover:bg-slate-800/70 rounded-xl py-4 text-sm font-bold text-slate-300 transition-colors">
              Return to Dashboard
            </button>
          </div>
        </div>
      </main>
    )
  }

  // Active Interview
  return (
    <main className="min-h-screen text-slate-200 px-4 py-6 md:py-10 relative z-10 flex flex-col h-screen">
      <div className="max-w-3xl mx-auto w-full flex flex-col h-full bg-slate-950/20 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-slate-900/40 relative z-10">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-violet-900/50 border border-violet-500/30 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <span className="text-sm">🗣️</span>
             </div>
             <div>
               <h1 className="text-lg font-bold text-white tracking-tight">AI Interviewer</h1>
               <div className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connected</p>
               </div>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-violet-300 tracking-wider">Round {round + 1}/{TOTAL_ROUNDS}</span>
             <button onClick={() => window.location.href = '/dashboard'} className="w-8 h-8 flex items-center justify-center rounded-full glass-panel hover:bg-white/10 text-slate-400 transition-colors">×</button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-0.5 bg-slate-800">
           <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-all duration-500 ease-out" style={{ width: `${((round) / TOTAL_ROUNDS) * 100}%` }} />
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          
          {/* History */}
          {history.map((h, i) => (
             <div key={i} className="space-y-6 opacity-70 scale-[0.98] transition-all">
                {/* AI Q */}
                <div className="flex items-start gap-4">
                   <div className="w-8 h-8 rounded-full bg-violet-900/50 border border-violet-500/30 flex items-center justify-center flex-shrink-0 mt-1">🤖</div>
                   <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl rounded-tl-sm p-4 text-[15px] text-slate-300 leading-relaxed shadow-md max-w-[85%]">
                     {h.question}
                   </div>
                </div>
                {/* User A */}
                <div className="flex items-start gap-4 flex-row-reverse">
                   <div className="w-8 h-8 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-1">👤</div>
                   <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl rounded-tr-sm p-4 text-[15px] text-blue-100 leading-relaxed shadow-md max-w-[85%]">
                     {h.answer}
                   </div>
                </div>
                {/* AI Feedback */}
                {h.feedback && (
                  <div className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-full bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-1">💡</div>
                     <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-4 text-[14px] text-emerald-200/90 leading-relaxed shadow-sm max-w-[85%]">
                       {h.feedback}
                     </div>
                  </div>
                )}
             </div>
          ))}

          {/* Current Q */}
          {loading ? (
             <div className="flex items-start gap-4 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-violet-900/50 border border-violet-500/30 flex items-center justify-center flex-shrink-0 mt-1">🤖</div>
                <div className="glass-card rounded-2xl rounded-tl-sm p-4 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
             </div>
          ) : (
            <>
               <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="w-8 h-8 rounded-full bg-violet-600 border border-violet-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-[0_0_15px_rgba(139,92,246,0.5)]">🤖</div>
                  <div className="glass-card border border-violet-500/30 rounded-2xl rounded-tl-sm p-5 text-[16px] text-white leading-relaxed shadow-lg max-w-[90%]">
                    {question}
                  </div>
               </div>
               
               {/* Tips */}
               {tips && (
                 <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700 ml-12">
                   <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-[13px] text-amber-200/90 flex gap-2 max-w-[85%]">
                     <span className="flex-shrink-0 mt-0.5">📌</span> 
                     <span className="italic">Hint: {tips}</span>
                   </div>
                 </div>
               )}
            </>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900/80 border-t border-white/5 backdrop-blur-md relative z-20">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your response here..."
              rows={3}
              disabled={loading}
              className="relative w-full glass-input rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:ring-1 focus:ring-violet-500/50 resize-none disabled:opacity-50 pr-24"
              onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if(!(loading || userAnswer.trim().length < 5)) submitAnswer();
                }
              }}
            />
            <button
              onClick={submitAnswer}
              disabled={loading || userAnswer.trim().length < 5}
              className={`absolute bottom-3 right-3 premium-btn rounded-xl p-2 md:px-4 md:py-2 flex items-center justify-center transition-all ${loading || 5 > userAnswer.trim().length ? 'opacity-50 cursor-not-allowed contrast-75' : ''}`}
              style={!(loading || 5 > userAnswer.trim().length) ? { background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)' } : {}}>
              <span className="hidden md:inline font-bold text-sm mr-2">{round >= TOTAL_ROUNDS - 1 ? 'Finish' : 'Send'}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 px-2">
            <p className="text-[11px] text-slate-500 font-medium">Press <kbd className="bg-slate-800 px-1 py-0.5 rounded border border-slate-700">Enter</kbd> to send</p>
            <p className="text-[11px] text-slate-500 font-medium">{userAnswer.trim() ? userAnswer.trim().split(/\\s+/).length : 0} words (min: 5)</p>
          </div>
        </div>

      </div>
    </main>
  )
}

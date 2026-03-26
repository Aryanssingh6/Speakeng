'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import { Mic, MicOff, Send, RotateCcw, ChevronDown } from 'lucide-react'
import { chatMessages } from '../lib/dummyData'

const topics = [
  { id: 'interview', label: '💼 Job Interview', desc: 'Practice professional self-intro and Q&A' },
  { id: 'daily', label: '☕ Daily Conversation', desc: 'Small talk, opinions, everyday English' },
  { id: 'academic', label: '🎓 Academic Discussion', desc: 'Debate, argue, and present ideas' },
  { id: 'travel', label: '✈️ Travel & Culture', desc: 'Airports, hotels, cultural discussions' },
  { id: 'business', label: '📊 Business English', desc: 'Presentations, negotiations, emails' },
]

export default function PracticePage() {
  const [messages, setMessages] = useState(chatMessages)
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(topics[0])
  const [showTopicMenu, setShowTopicMenu] = useState(false)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const timer = setInterval(() => setSessionTime(t => t + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  const handleSend = async () => {
    if (!input.trim() || sending) return
    const userMsg = { id: Date.now(), role: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setSending(true)

    // Simulate AI response
    await new Promise(r => setTimeout(r, 1600))
    const aiResponses = [
      { text: "That's a great response! I noticed a small grammar point: use 'I have been working' instead of 'I was working' here — it better conveys ongoing experience. Can you tell me more about your biggest challenge in this role?", feedback: { grammar: 88, fluency: 82, tip: "Present perfect continuous is better for ongoing experiences." } },
      { text: "Excellent use of vocabulary! Your sentence structure is very clear. One suggestion: add a specific example to make your answer more compelling. How did you handle pressure in your previous role?", feedback: { grammar: 92, fluency: 87, tip: "Specific examples make interview answers 3x more memorable." } },
      { text: "Very good! Your fluency is improving. Try to avoid filler words like 'um' and 'uh' — it'll make you sound much more confident. What are your career goals for the next 5 years?", feedback: { grammar: 85, fluency: 79, tip: "Pause briefly instead of using filler words — it shows confidence." } },
    ]
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      role: 'ai',
      ...randomResponse,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setSending(false)
  }

  const lastAIMessage = [...messages].reverse().find(m => m.role === 'ai' && m.feedback)

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row h-screen max-h-screen">
        
        {/* Chat panel */}
        <div className="flex flex-col flex-1 min-h-0">
          
          {/* Chat header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#030303] shrink-0">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="font-bold text-white text-lg">AI Speaking Practice</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-slate-500 font-medium">Session active — {formatTime(sessionTime)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Topic selector */}
              <div className="relative">
                <button
                  onClick={() => setShowTopicMenu(!showTopicMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-slate-300 hover:bg-white/[0.07] transition-colors"
                >
                  <span>{selectedTopic.label}</span>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform ${showTopicMenu ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showTopicMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      className="absolute right-0 top-full mt-2 w-72 bg-[#0a0a0a] border border-white/[0.08] rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      {topics.map(t => (
                        <button
                          key={t.id}
                          onClick={() => { setSelectedTopic(t); setShowTopicMenu(false) }}
                          className={`w-full text-left px-5 py-3.5 flex flex-col hover:bg-white/[0.04] transition-colors ${selectedTopic.id === t.id ? 'bg-amber-500/10' : ''}`}
                        >
                          <span className="text-sm font-semibold text-white">{t.label}</span>
                          <span className="text-xs text-slate-500 mt-0.5">{t.desc}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setMessages(chatMessages)}
                className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.05] transition-colors"
                title="Reset conversation"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-black font-extrabold text-sm shrink-0 mt-1">
                      AI
                    </div>
                  )}
                  <div className={`max-w-[75%] flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-5 py-3.5 text-[15px] leading-relaxed ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                      {msg.text}
                    </div>
                    {msg.feedback && (
                      <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs text-slate-400">
                        <span className="text-emerald-400 font-bold">Grammar {msg.feedback.grammar}%</span>
                        <span className="text-slate-700">·</span>
                        <span className="text-sky-400 font-bold">Fluency {msg.feedback.fluency}%</span>
                      </div>
                    )}
                    <span className="text-[11px] text-slate-700 px-1">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {sending && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-black font-extrabold text-sm">AI</div>
                <div className="flex gap-1.5 px-5 py-4 chat-bubble-ai rounded-2xl">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-2 h-2 rounded-full bg-slate-500"
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="px-6 py-4 border-t border-white/[0.06] bg-[#030303] shrink-0">
            <div className="flex items-end gap-3">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                  isRecording
                    ? 'bg-rose-500 text-white mic-btn-recording'
                    : 'bg-white/[0.06] border border-white/[0.10] text-slate-400 hover:text-white hover:bg-white/[0.10]'
                }`}
                title={isRecording ? 'Stop recording' : 'Voice input'}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <div className="flex-1 glass-input rounded-2xl flex items-end overflow-hidden border border-white/[0.10]">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                  placeholder={isRecording ? '🎤 Recording... speak clearly' : 'Type your response here, or press the mic button to speak...'}
                  className="flex-1 bg-transparent text-white placeholder-slate-600 px-5 py-4 text-[15px] resize-none focus:outline-none max-h-32 min-h-[52px]"
                  rows={1}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || sending}
                className="w-12 h-12 rounded-xl premium-btn-gold flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-slate-700 mt-2 px-1">Press Enter to send, Shift+Enter for new line.</p>
          </div>
        </div>

        {/* Right side: Feedback panel */}
        <div className="hidden lg:flex flex-col w-80 border-l border-white/[0.06] bg-[#030303] shrink-0">
          <div className="px-5 py-5 border-b border-white/[0.06]">
            <h2 className="font-bold text-white text-sm">Session Feedback</h2>
            <p className="text-xs text-slate-500 mt-1">Live AI evaluation of your responses</p>
          </div>

          {lastAIMessage?.feedback ? (
            <div className="p-5 space-y-5">
              {/* Score meters */}
              {[
                { label: 'Grammar', score: lastAIMessage.feedback.grammar, color: 'bg-emerald-500' },
                { label: 'Fluency', score: lastAIMessage.feedback.fluency, color: 'bg-sky-500' },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400">{s.label}</span>
                    <span className="text-xs font-bold text-white">{s.score}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <motion.div
                      className={`h-full rounded-full ${s.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.score}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}

              {/* Tip */}
              {lastAIMessage.feedback.tip && (
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <p className="text-xs font-bold text-amber-400 mb-1.5">💡 AI Tip</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{lastAIMessage.feedback.tip}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <div>
                <div className="text-4xl mb-3">🎯</div>
                <p className="text-slate-500 text-sm">Start chatting to see your grammar & fluency scores appear here.</p>
              </div>
            </div>
          )}

          {/* Session stats */}
          <div className="mt-auto border-t border-white/[0.06] p-5 space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Session Stats</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
                <p className="text-lg font-bold text-white">{messages.filter(m => m.role === 'user').length}</p>
                <p className="text-[10px] text-slate-600 font-medium">Responses</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-center">
                <p className="text-lg font-bold text-amber-400">{formatTime(sessionTime)}</p>
                <p className="text-[10px] text-slate-600 font-medium">Duration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

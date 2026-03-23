'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

const questions = [
  { id: 1, question: "Choose the correct sentence:", options: ["She don't like coffee.", "She doesn't likes coffee.", "She doesn't like coffee.", "She not like coffee."], answer: 2 },
  { id: 2, question: "What is the past tense of 'go'?", options: ["Goed", "Gone", "Went", "Goes"], answer: 2 },
  { id: 3, question: "Fill in the blank: I ___ a student.", options: ["is", "am", "are", "be"], answer: 1 },
  { id: 4, question: "Which word means 'happy'?", options: ["Sad", "Angry", "Joyful", "Tired"], answer: 2 },
  { id: 5, question: "Choose the correct sentence:", options: ["He have two cats.", "He has two cats.", "He haves two cats.", "He having two cats."], answer: 1 },
  { id: 6, question: "What does 'enormous' mean?", options: ["Very small", "Very large", "Very fast", "Very slow"], answer: 1 },
  { id: 7, question: "Choose the correct form: She ___ to school every day.", options: ["go", "goes", "going", "gone"], answer: 1 },
  { id: 8, question: "Which sentence is correct?", options: ["I have seen him yesterday.", "I saw him yesterday.", "I see him yesterday.", "I seed him yesterday."], answer: 1 },
  { id: 9, question: "What is the opposite of 'ancient'?", options: ["Old", "Modern", "Historical", "Traditional"], answer: 1 },
  { id: 10, question: "Fill in: They ___ playing cricket now.", options: ["is", "was", "are", "were"], answer: 2 },
  { id: 11, question: "Choose the correct sentence:", options: ["If I will study, I pass.", "If I study, I will pass.", "If I studied, I will pass.", "If I study, I would pass."], answer: 1 },
  { id: 12, question: "What does 'ambiguous' mean?", options: ["Very clear", "Having double meaning", "Very simple", "Very complex"], answer: 1 },
  { id: 13, question: "Choose the correct passive voice: 'They built this house in 1990.'", options: ["This house is built in 1990.", "This house was built in 1990.", "This house has been built in 1990.", "This house built in 1990."], answer: 1 },
  { id: 14, question: "Fill in: He said that he ___ tired.", options: ["is", "was", "were", "be"], answer: 1 },
  { id: 15, question: "Which word is a synonym of 'meticulous'?", options: ["Careless", "Careful", "Lazy", "Hasty"], answer: 1 },
]

function getLevel(score) {
  if (score <= 4) return { level: 'A1', label: 'Beginner', color: 'from-amber-600/80 to-amber-700/80', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]', desc: 'English basics abhi seekhni hain' }
  if (score <= 7) return { level: 'A2', label: 'Elementary', color: 'from-amber-500/80 to-amber-600/80', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]', desc: 'Basic English aati hai, aur practice chahiye' }
  if (score <= 9) return { level: 'B1', label: 'Intermediate', color: 'from-emerald-600/80 to-emerald-700/80', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]', desc: 'Theek hai, aur improve kar sakte ho' }
  if (score <= 11) return { level: 'B2', label: 'Upper Intermediate', color: 'from-emerald-500/90 to-emerald-600/90', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]', desc: 'Achhi English hai, polish karo' }
  if (score <= 13) return { level: 'C1', label: 'Advanced', color: 'from-amber-400 to-amber-600', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]', desc: 'Bahut achhi English hai!' }
  return { level: 'C2', label: 'Mastery', color: 'from-emerald-400 to-emerald-500', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]', desc: 'Excellent! Native level English!' }
}

export default function Test() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [saving, setSaving] = useState(false)

  const handleAnswer = (index) => {
    setSelected(index)
  }

  const handleNext = async () => {
    const isCorrect = selected === questions[current].answer
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)
    setSelected(null)

    if (current + 1 === questions.length) {
      const finalScore = newAnswers.filter(Boolean).length
      setScore(finalScore)
      setFinished(true)
      setSaving(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const levelData = getLevel(finalScore)
        await supabase.from('test_results').insert({
          user_id: user.id,
          score: finalScore,
          level: levelData.level,
          grammar_score: finalScore,
          vocabulary_score: finalScore,
        })
        await supabase.from('profiles').update({
          level: levelData.level
        }).eq('id', user.id)
      }
      setSaving(false)
    } else {
      setCurrent(current + 1)
    }
  }

  if (finished) {
    const levelData = getLevel(score)
    return (
      <main className="min-h-screen flex items-center justify-center px-4 relative z-10 transition-colors">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div className="glass-card rounded-[2.5rem] p-10 w-full max-w-xl text-center relative z-10 border border-white/10">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-5xl mb-6 shadow-lg">
            🎉
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Assessment Complete</h2>
          <p className="text-slate-400 mb-8 font-medium">We've calculated your proficiency score.</p>

          <div className={`rounded-3xl p-8 mb-8 bg-gradient-to-br ${levelData.color} ${levelData.glow} relative overflow-hidden border border-white/5`}>
            <div className="absolute inset-0 bg-[#050505]/20 mix-blend-overlay"></div>
            <p className="text-6xl font-black text-white drop-shadow-lg mb-2 relative z-10">{score}<span className="text-3xl opacity-80">/{questions.length}</span></p>
            <p className="text-4xl font-black text-white drop-shadow-md mb-2 relative z-10 tracking-widest">{levelData.level}</p>
            <p className="text-xl text-white/90 font-bold mb-2 relative z-10 tracking-wider uppercase">{levelData.label}</p>
            <p className="text-white/80 text-sm font-medium relative z-10">"{levelData.desc}"</p>
          </div>

          <div className="h-6 mb-6">
            {saving ? (
              <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
                 <span className="w-4 h-4 rounded-full border-t-2 border-slate-400 animate-spin"></span>
                 Saving results...
              </p>
            ) : (
              <p className="text-emerald-400 text-sm font-bold flex items-center justify-center gap-2">
                 <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">✓</span>
                 Profile Updated
              </p>
            )}
          </div>

          <a href="/dashboard"
            className="block text-center w-full premium-btn-gold rounded-xl py-4 font-bold tracking-wide shadow-lg shadow-amber-500/20 text-[15px]">
            Return to Dashboard →
          </a>
        </div>
      </main>
    )
  }

  const q = questions[current]

  return (
    <main className="min-h-screen text-slate-200 px-4 py-8 md:py-12 relative z-10 transition-colors">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shadow-lg border border-amber-500/30">
                <span className="text-lg">📈</span>
             </div>
             <h1 className="text-xl font-bold text-white tracking-tight">Proficiency Test</h1>
          </div>
          <span className="bg-[#050505] border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-amber-500 tracking-wider">Q {current + 1} OF {questions.length}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5 rounded-full mb-10 overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
          <p className="text-[10px] text-amber-500 uppercase tracking-widest mb-4 font-bold relative z-10 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Question
          </p>
          <h2 className="text-2xl font-medium text-white leading-relaxed relative z-10">{q.question}</h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4 mb-10">
          {q.options.map((option, index) => {
            const isSelected = selected === index;
            return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`text-left px-6 py-5 rounded-2xl transition-all font-medium border relative overflow-hidden group
                ${isSelected
                  ? 'bg-[#0f0f0f] border-amber-500/50 text-white shadow-[0_0_20px_rgba(245,158,11,0.1)] scale-[1.01]'
                  : 'bg-[#050505]/40 border-white/10 text-slate-300 hover:bg-white/5 hover:border-white/20'
                }`}
            >
              {isSelected && <div className="absolute inset-0 bg-amber-500/5 mix-blend-overlay pointer-events-none"></div>}
              <div className="flex items-center gap-4 relative z-10">
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'border-amber-500' : 'border-slate-600 group-hover:border-slate-500'}`}>
                    {isSelected && <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_5px_rgba(245,158,11,0.5)]"></div>}
                 </div>
                 <span className="text-[16px] leading-relaxed">{option}</span>
              </div>
            </button>
          )})}
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`w-full premium-btn-gold rounded-xl py-4 font-bold tracking-wide transition-all ${selected === null ? 'opacity-50 cursor-not-allowed contrast-75' : 'shadow-lg shadow-amber-500/20'}`}>
          {current + 1 === questions.length ? 'Submit Assessment' : 'Next Question →'}
        </button>

      </div>
    </main>
  )
}
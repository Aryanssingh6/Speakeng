'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

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
  if (score <= 4) return { level: 'A1', label: 'Beginner', color: 'text-red-400', desc: 'English basics abhi seekhni hain' }
  if (score <= 7) return { level: 'A2', label: 'Elementary', color: 'text-orange-400', desc: 'Basic English aati hai, aur practice chahiye' }
  if (score <= 9) return { level: 'B1', label: 'Intermediate', color: 'text-yellow-400', desc: 'Theek hai, aur improve kar sakte ho' }
  if (score <= 11) return { level: 'B2', label: 'Upper Intermediate', color: 'text-green-400', desc: 'Achhi English hai, polish karo' }
  if (score <= 13) return { level: 'C1', label: 'Advanced', color: 'text-blue-400', desc: 'Bahut achhi English hai!' }
  return { level: 'C2', label: 'Mastery', color: 'text-purple-400', desc: 'Excellent! Native level English!' }
}

export default function Test() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

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
      <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white flex items-center justify-center px-4">
        <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-8 w-full max-w-lg text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Test Complete!</h2>
          <p className="text-blue-300 mb-6">Tumhara result ready hai</p>

          <div className="bg-blue-900/50 rounded-2xl p-6 mb-6">
            <p className="text-5xl font-bold mb-2">{score}/{questions.length}</p>
            <p className={`text-3xl font-bold mb-1 ${levelData.color}`}>{levelData.level}</p>
            <p className="text-xl text-blue-200 mb-2">{levelData.label}</p>
            <p className="text-blue-300 text-sm">{levelData.desc}</p>
          </div>

          {saving ? (
            <p className="text-blue-300 mb-4">Result save ho raha hai...</p>
          ) : (
            <p className="text-green-400 mb-4">Result save ho gaya! ✅</p>
          )}

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-blue-500 hover:bg-blue-400 rounded-xl py-3 font-semibold transition">
            Dashboard Pe Jao
          </button>
        </div>
      </main>
    )
  }

  const q = questions[current]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-blue-300">SpeakEng — Level Test</h1>
          <span className="text-blue-400 text-sm">{current + 1}/{questions.length}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-blue-900 rounded-full h-2 mb-8">
          <div
            className="bg-blue-400 h-2 rounded-full transition-all"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-blue-800/40 border border-blue-700 rounded-2xl p-6 mb-6">
          <p className="text-sm text-blue-400 mb-3">Question {current + 1}</p>
          <h2 className="text-lg font-semibold">{q.question}</h2>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {q.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`text-left px-5 py-4 rounded-xl border transition font-medium
                ${selected === index
                  ? 'bg-blue-500 border-blue-400 text-white'
                  : 'bg-blue-800/30 border-blue-700 text-blue-200 hover:bg-blue-700/50'
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null}
          className="w-full bg-blue-500 hover:bg-blue-400 disabled:bg-blue-800 disabled:text-blue-500 rounded-xl py-3 font-semibold transition">
          {current + 1 === questions.length ? 'Result Dekho' : 'Agla Sawal'}
        </button>

      </div>
    </main>
  )
}
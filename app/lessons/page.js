'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

const lessonData = {
  A1: {
    color: 'red',
    label: 'Beginner',
    intro: 'A1 level pe basic English seekhte hain — simple sentences, common words, aur greetings.',
    lessons: [
      {
        id: 1,
        emoji: '👋',
        title: 'Greetings & Introductions',
        topic: 'Grammar',
        content: 'Learn how to say Hello, introduce yourself, and ask someone\'s name.',
        examples: [
          'Hi! My name is Aryan.',
          'How are you? I am fine, thank you.',
          'Nice to meet you!',
          'Where are you from? I am from India.',
        ],
        exercise: 'Write 3 sentences introducing yourself.'
      },
      {
        id: 2,
        emoji: '🔢',
        title: 'Numbers & Days',
        topic: 'Vocabulary',
        content: 'Days of the week, months, and numbers 1–100.',
        examples: [
          'Today is Monday.',
          'My birthday is in July.',
          'I have two brothers.',
          'The meeting is at 3 o\'clock.',
        ],
        exercise: 'Write today\'s date in a full English sentence.'
      },
      {
        id: 3,
        emoji: '🏠',
        title: 'My Family',
        topic: 'Speaking',
        content: 'Describe your family using simple sentences with "is", "am", "are".',
        examples: [
          'My father is a teacher.',
          'My mother is kind.',
          'I have one sister and two brothers.',
          'We live in Delhi.',
        ],
        exercise: 'Write 4 sentences about your family.'
      },
      {
        id: 4,
        emoji: '🍎',
        title: 'Common Nouns',
        topic: 'Vocabulary',
        content: 'Learn everyday nouns — food, colours, animals, things at home.',
        examples: [
          'The apple is red.',
          'I have a black pen.',
          'My dog is small.',
          'The book is on the table.',
        ],
        exercise: 'Name 5 things in your room with their colour.'
      },
    ]
  },
  A2: {
    color: 'orange',
    label: 'Elementary',
    intro: 'A2 level pe hum daily life ke baare mein baat karna seekhenge — present tense, simple past, aur common phrases.',
    lessons: [
      {
        id: 1,
        emoji: '📅',
        title: 'Daily Routine',
        topic: 'Grammar — Simple Present',
        content: 'Use simple present tense to describe what you do every day.',
        examples: [
          'I wake up at 7 AM every day.',
          'She goes to school by bus.',
          'We eat lunch at 1 PM.',
          'He studies for two hours in the evening.',
        ],
        exercise: 'Write your morning routine in 5 sentences.'
      },
      {
        id: 2,
        emoji: '⏪',
        title: 'Yesterday & Past Events',
        topic: 'Grammar — Simple Past',
        content: 'Use simple past tense (-ed or irregular verbs) to talk about the past.',
        examples: [
          'I went to the market yesterday.',
          'She cooked dinner last night.',
          'We watched a movie on Sunday.',
          'He did not come to school today.',
        ],
        exercise: 'Write 4 sentences about what you did yesterday.'
      },
      {
        id: 3,
        emoji: '💬',
        title: 'Asking Questions',
        topic: 'Grammar — Questions',
        content: 'Form questions using What, Where, When, Who, How.',
        examples: [
          'What is your name?',
          'Where do you live?',
          'How do you go to school?',
          'What time does the bus come?',
        ],
        exercise: 'Write 5 questions you would ask a new friend.'
      },
      {
        id: 4,
        emoji: '🛒',
        title: 'Shopping Phrases',
        topic: 'Speaking',
        content: 'Common phrases used when shopping — asking price, quantity, availability.',
        examples: [
          'How much does this cost?',
          'Can I get two of these?',
          'Do you have a smaller size?',
          'I would like to pay by cash.',
        ],
        exercise: 'Write a short shopping dialogue (4–6 lines).'
      },
    ]
  },
  B1: {
    color: 'yellow',
    label: 'Intermediate',
    intro: 'B1 level pe hum opinions dena, future plans banana, aur connected sentences likhna seekhenge.',
    lessons: [
      {
        id: 1,
        emoji: '🔮',
        title: 'Talking About Future',
        topic: 'Grammar — Will & Going To',
        content: '"Will" for decisions made now; "going to" for plans already made.',
        examples: [
          'I will call you later.',
          'She is going to study abroad next year.',
          'They will probably win the match.',
          'I am going to start a new course this month.',
        ],
        exercise: 'Write your plans for next month using "going to" (5 sentences).'
      },
      {
        id: 2,
        emoji: '🤔',
        title: 'Giving Opinions',
        topic: 'Speaking',
        content: 'Express your views with phrases like "I think", "In my opinion", "I believe".',
        examples: [
          'I think online learning is very effective.',
          'In my opinion, social media has both advantages and disadvantages.',
          'I believe exercise is crucial for mental health.',
          'To be honest, I prefer living in a city.',
        ],
        exercise: 'Write your opinion on: "Should mobile phones be allowed in schools?"'
      },
      {
        id: 3,
        emoji: '🔗',
        title: 'Linking Ideas',
        topic: 'Writing',
        content: 'Use connectors to join ideas: however, therefore, although, because, so.',
        examples: [
          'I wanted to go out, however it was raining.',
          'She worked hard, therefore she got a promotion.',
          'Although it was late, he continued studying.',
          'He failed because he did not prepare.',
        ],
        exercise: 'Rewrite 5 short sentences using different connectors.'
      },
      {
        id: 4,
        emoji: '📧',
        title: 'Writing Emails',
        topic: 'Writing',
        content: 'Structure a formal and informal email correctly.',
        examples: [
          'Subject: Leave Application',
          'Dear Sir/Madam,',
          'I am writing to request two days of leave...',
          'Yours sincerely, [Your Name]',
        ],
        exercise: 'Write a short email to your teacher asking for extra help.'
      },
    ]
  },
  B2: {
    color: 'green',
    label: 'Upper Intermediate',
    intro: 'B2 level pe hum advanced grammar, idioms, aur confident communication skills develop karenge.',
    lessons: [
      {
        id: 1,
        emoji: '🏛️',
        title: 'Conditional Sentences',
        topic: 'Grammar — Conditionals',
        content: 'Master 2nd and 3rd conditionals for hypothetical and regret situations.',
        examples: [
          'If I had more time, I would travel more.',
          'If she had studied harder, she would have passed.',
          'I would buy a car if I won the lottery.',
          'If he had listened, he wouldn\'t have made that mistake.',
        ],
        exercise: 'Write 3 sentences about your regrets using 3rd conditional.'
      },
      {
        id: 2,
        emoji: '🎭',
        title: 'Idioms & Phrases',
        topic: 'Vocabulary',
        content: 'Common English idioms used in everyday conversations and writing.',
        examples: [
          'Break a leg! (Good luck!)',
          'It\'s raining cats and dogs. (Heavy rain)',
          'Hit the nail on the head. (Exactly right)',
          'Bite the bullet. (Do something difficult)',
        ],
        exercise: 'Use 4 idioms in sentences about your own life.'
      },
      {
        id: 3,
        emoji: '📰',
        title: 'Reading & Summarizing',
        topic: 'Reading',
        content: 'Read a paragraph and summarize the main idea in 2–3 sentences.',
        examples: [
          'Topic sentence: States the main idea.',
          'Supporting details: Give evidence or examples.',
          'Concluding sentence: Wraps up the paragraph.',
        ],
        exercise: 'Read a news article and write a 3-sentence summary.'
      },
      {
        id: 4,
        emoji: '🗣️',
        title: 'Interview English',
        topic: 'Speaking',
        content: 'How to answer common job interview questions confidently.',
        examples: [
          '"Tell me about yourself." — Keep it professional and relevant.',
          '"What are your strengths?" — Back up with examples.',
          '"Where do you see yourself in 5 years?" — Show ambition.',
          '"Why do you want this job?" — Connect your skills.',
        ],
        exercise: 'Write your answer for "Tell me about yourself" (5–6 sentences).'
      },
    ]
  },
  C1: {
    color: 'blue',
    label: 'Advanced',
    intro: 'C1 level — sophisticated grammar, nuanced vocabulary, aur professional communication skills.',
    lessons: [
      {
        id: 1,
        emoji: '⚙️',
        title: 'Passive Voice — Advanced',
        topic: 'Grammar',
        content: 'Use passive voice in complex tenses and formal writing.',
        examples: [
          'The report has been submitted by the committee.',
          'The project will have been completed by Friday.',
          'Mistakes are known to be made under pressure.',
          'He is said to be a brilliant strategist.',
        ],
        exercise: 'Rewrite 5 active sentences in passive voice using different tenses.'
      },
      {
        id: 2,
        emoji: '✒️',
        title: 'Academic Writing',
        topic: 'Writing',
        content: 'Structure academic essays: introduction, body paragraphs, conclusion, citations.',
        examples: [
          'Introduction: Hook + background + thesis statement.',
          'Body: Each paragraph = 1 main idea + 2–3 supporting points.',
          'Conclusion: Restate thesis + summary + final thought.',
          'Use formal vocabulary: Furthermore, Nevertheless, Consequently.',
        ],
        exercise: 'Write a 150-word essay: "The impact of technology on education."'
      },
      {
        id: 3,
        emoji: '🎙️',
        title: 'Debate & Argumentation',
        topic: 'Speaking',
        content: 'Present and counter arguments with evidence, hedging, and persuasive language.',
        examples: [
          'One could argue that... however, the evidence suggests...',
          'While it is true that X, we must also consider Y.',
          'The data clearly indicates that...',
          'It is undeniable that... yet critics point out...',
        ],
        exercise: 'Write a 200-word argument for or against: "AI will replace human jobs."'
      },
      {
        id: 4,
        emoji: '📑',
        title: 'Vocabulary — Business English',
        topic: 'Vocabulary',
        content: 'Key business and professional vocabulary for meetings, emails, and reports.',
        examples: [
          'Synergy, leverage, benchmark, deliverable, KPI',
          '"Circle back", "action item", "take this offline"',
          'To whom it may concern, further to our discussion...',
          'I am writing with reference to...',
        ],
        exercise: 'Write a mock meeting summary using professional vocabulary.'
      },
    ]
  },
  C2: {
    color: 'purple',
    label: 'Mastery',
    intro: 'C2 level — near-native fluency. Polish your nuance, style, and precision in English.',
    lessons: [
      {
        id: 1,
        emoji: '🎯',
        title: 'Nuance & Register',
        topic: 'Style',
        content: 'Understand the difference between formal, informal, neutral, and colloquial registers.',
        examples: [
          'Formal: I wish to express my gratitude.',
          'Neutral: Thank you very much.',
          'Informal: Thanks a ton!',
          'Colloquial: Cheers, mate!',
        ],
        exercise: 'Rewrite the same message in 4 different registers.'
      },
      {
        id: 2,
        emoji: '📚',
        title: 'Literary Devices',
        topic: 'Writing',
        content: 'Use metaphor, simile, alliteration, personification to enhance your writing.',
        examples: [
          'Metaphor: Life is a roller coaster.',
          'Simile: She ran like the wind.',
          'Alliteration: Peter Piper picked a peck.',
          'Personification: The storm whispered secrets.',
        ],
        exercise: 'Write a descriptive paragraph using at least 3 literary devices.'
      },
      {
        id: 3,
        emoji: '🌍',
        title: 'Cultural Context',
        topic: 'Communication',
        content: 'Understand British vs American English, cultural idioms, and global communication norms.',
        examples: [
          'UK: Flat / US: Apartment',
          'UK: Autumn / US: Fall',
          'UK: Rubbish / US: Garbage',
          'Small talk norms differ by culture.',
        ],
        exercise: 'Write a paragraph comparing British and American English differences you know.'
      },
      {
        id: 4,
        emoji: '✨',
        title: 'Editing & Proofreading',
        topic: 'Writing',
        content: 'Techniques to self-edit your writing: sentence variety, eliminating redundancy, strong verbs.',
        examples: [
          'Weak: He was very tired. → Strong: He was exhausted.',
          'Redundant: "end result" → just "result"',
          'Passive to active: "Mistakes were made." → "We made mistakes."',
          'Vary sentence length for rhythm.',
        ],
        exercise: 'Take any paragraph you've written and revise it using today\'s techniques.'
      },
    ]
  }
}

const colorMap = {
  red: { border: 'border-red-700/50', bg: 'bg-red-900/20', badge: 'bg-red-800/60 text-red-300', dot: 'bg-red-400', text: 'text-red-400' },
  orange: { border: 'border-orange-700/50', bg: 'bg-orange-900/20', badge: 'bg-orange-800/60 text-orange-300', dot: 'bg-orange-400', text: 'text-orange-400' },
  yellow: { border: 'border-yellow-700/50', bg: 'bg-yellow-900/20', badge: 'bg-yellow-800/60 text-yellow-300', dot: 'bg-yellow-400', text: 'text-yellow-400' },
  green: { border: 'border-green-700/50', bg: 'bg-green-900/20', badge: 'bg-green-800/60 text-green-300', dot: 'bg-green-400', text: 'text-green-400' },
  blue: { border: 'border-blue-700/50', bg: 'bg-blue-900/20', badge: 'bg-blue-800/60 text-blue-300', dot: 'bg-blue-400', text: 'text-blue-400' },
  purple: { border: 'border-purple-700/50', bg: 'bg-purple-900/20', badge: 'bg-purple-800/60 text-purple-300', dot: 'bg-purple-400', text: 'text-purple-400' },
}

export default function Lessons() {
  const [userLevel, setUserLevel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openLesson, setOpenLesson] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('level').eq('id', user.id).single()
      setUserLevel(data?.level || null)
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </main>
    )
  }

  if (!userLevel || !lessonData[userLevel]) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold mb-2">Pehle Level Test Do!</h2>
          <p className="text-blue-300 mb-6">Tumhara koi level set nahi hai. Test do aur phir apne level ke lessons dekho.</p>
          <button onClick={() => router.push('/test')}
            className="bg-blue-500 hover:bg-blue-400 rounded-xl px-6 py-3 font-semibold transition">
            Level Test Shuru Karo →
          </button>
        </div>
      </main>
    )
  }

  const data = lessonData[userLevel]
  const colors = colorMap[data.color]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-blue-300">📚 Lessons</h1>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-blue-400 hover:text-white transition">
            ← Dashboard
          </button>
        </div>

        {/* Level Banner */}
        <div className={`${colors.bg} ${colors.border} border rounded-2xl p-6 mb-6`}>
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${colors.badge}`}>
              {userLevel} — {data.label}
            </span>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">{data.intro}</p>
        </div>

        {/* Lesson Cards */}
        <div className="space-y-4">
          {data.lessons.map((lesson) => (
            <div key={lesson.id}
              className="bg-blue-800/40 border border-blue-700 rounded-2xl overflow-hidden">

              {/* Card Header */}
              <button
                onClick={() => setOpenLesson(openLesson === lesson.id ? null : lesson.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-blue-700/20 transition">
                <span className="text-3xl">{lesson.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{lesson.title}</h3>
                  </div>
                  <p className="text-blue-400 text-xs">{lesson.topic}</p>
                </div>
                <span className="text-blue-500 text-sm">{openLesson === lesson.id ? '▲' : '▼'}</span>
              </button>

              {/* Expandable Content */}
              {openLesson === lesson.id && (
                <div className="px-5 pb-5 border-t border-blue-700/50 pt-4 space-y-4">
                  <p className="text-blue-200 text-sm leading-relaxed">{lesson.content}</p>

                  <div>
                    <p className="text-xs text-blue-400 uppercase tracking-wider mb-2 font-semibold">Examples</p>
                    <ul className="space-y-2">
                      {lesson.examples.map((ex, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-blue-100">
                          <span className={`${colors.dot} rounded-full w-1.5 h-1.5 mt-1.5 flex-shrink-0`}></span>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`${colors.bg} ${colors.border} border rounded-xl p-4`}>
                    <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: 'inherit' }}>
                      <span className={colors.text}>✏️ Practice Exercise</span>
                    </p>
                    <p className="text-blue-100 text-sm">{lesson.exercise}</p>
                    <a href="/writing"
                      className="mt-3 inline-block text-xs bg-blue-600 hover:bg-blue-500 rounded-lg px-3 py-1.5 font-semibold transition">
                      Writing Page Pe Practice Karo →
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={() => router.push('/writing')}
            className="bg-blue-700/50 hover:bg-blue-700 border border-blue-600 rounded-xl py-3 text-sm font-semibold transition">
            ✍️ Writing Practice
          </button>
          <button onClick={() => router.push('/interview')}
            className="bg-blue-500 hover:bg-blue-400 rounded-xl py-3 text-sm font-semibold transition">
            🎤 Mock Interview
          </button>
        </div>

      </div>
    </main>
  )
}

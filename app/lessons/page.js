'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const lessonData = {
  A1: {
    color: 'emerald',
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
    color: 'emerald',
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
    color: 'emerald',
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
    color: 'emerald',
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
    color: 'emerald',
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
    color: 'emerald',
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
        exercise: 'Take any paragraph you\'ve written and revise it using today\'s techniques.'
      },
    ]
  }
}

const colorMap = {
  emerald: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    dot: 'bg-emerald-400',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.1)]'
  }
}

export default function Lessons() {
  const [userLevel, setUserLevel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openLesson, setOpenLesson] = useState(null)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      const { data } = await supabase.from('profiles').select('level').eq('id', user.id).single()
      setUserLevel(data?.level || null)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center relative z-10 transition-colors">
        <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-emerald-500 animate-spin"></div>
      </main>
    )
  }

  if (!userLevel || !lessonData[userLevel]) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 relative z-10 transition-colors">
        <div className="text-center max-w-md w-full glass-card p-10 rounded-3xl">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl mb-6 shadow-lg">
            📊
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Locked</h2>
          <p className="text-slate-400 font-medium mb-8 leading-relaxed">Please complete the initial AI assessment to unlock your personalized curriculum.</p>
          <a href="/test"
            className="block w-full premium-btn-gold text-center rounded-xl px-5 py-3.5 font-bold shadow-lg shadow-amber-500/20">
            Take Level Test →
          </a>
        </div>
      </main>
    )
  }

  const data = lessonData[userLevel]
  const colors = colorMap.emerald

  return (
    <main className="min-h-screen text-slate-200 px-4 py-8 md:py-12 relative z-10 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-2xl">📚</span>
             </div>
             <div>
               <h1 className="text-2xl font-bold text-white tracking-tight">Curated Lessons</h1>
               <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Your Personal Path</p>
             </div>
          </div>
          <a href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/20 hidden sm:block">
            ← Dashboard
          </a>
        </div>

        {/* Level Banner */}
        <div className="glass-card rounded-[2rem] p-8 mb-8 relative overflow-hidden group border-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-emerald-500/20 transition-all duration-700"></div>
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <span className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${colors.badge}`}>
              {userLevel} • {data.label} Level
            </span>
          </div>
          <h2 className="text-xl font-medium text-slate-200 leading-relaxed mb-6 max-w-xl relative z-10">"{data.intro}"</h2>
          
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative z-10">
             <div className="h-full bg-emerald-500 w-1/4 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          </div>
          <p className="text-[10px] uppercase font-bold text-emerald-500/70 mt-3 tracking-widest relative z-10">Progress: Not Started</p>
        </div>

        <h3 className="font-bold text-slate-300 mb-5 ml-2 uppercase tracking-widest text-sm flex items-center gap-3">
          Modules <span className="h-[1px] flex-1 bg-gradient-to-r from-[#333] to-transparent"></span>
        </h3>

        {/* Lesson Cards */}
        <div className="space-y-5">
          {data.lessons.map((lesson, index) => {
            const isOpen = openLesson === lesson.id;
            return (
            <div key={lesson.id}
              className={`glass-card border rounded-[1.5rem] overflow-hidden transition-all duration-300 ${isOpen ? 'border-emerald-500/30 bg-[#0f0f0f] shadow-[0_0_30px_rgba(16,185,129,0.05)] scale-[1.01]' : 'border-white/10 hover:border-white/20'}`}>

              {/* Card Header */}
              <button
                onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                className="w-full flex items-center gap-5 p-6 text-left active:scale-[0.99] transition-transform">
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-colors duration-300 ${isOpen ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-[#050505] border border-white/5'}`}>
                  {lesson.emoji}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20">Mod {index + 1}</span>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{lesson.topic}</p>
                  </div>
                  <h3 className={`font-bold text-lg transition-colors ${isOpen ? 'text-white tracking-tight' : 'text-slate-200 tracking-tight'}`}>{lesson.title}</h3>
                </div>
                
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-emerald-500 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)] bg-emerald-500/10' : 'border-white/10 text-slate-500 bg-white/5'}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </button>

              {/* Expandable Content */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2 space-y-6">
                  <p className="text-slate-300 text-[15px] leading-relaxed pl-[76px] pb-2 border-b border-white/10">{lesson.content}</p>

                  <div className="pl-[76px]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center text-[10px] border border-amber-500/30 text-amber-500">✨</span>
                      <p className="text-[11px] text-amber-500 uppercase tracking-widest font-bold">Practical Examples</p>
                    </div>
                    <ul className="space-y-2.5">
                      {lesson.examples.map((ex, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-200 bg-[#050505] rounded-lg p-3 border border-white/5">
                          <span className="text-amber-500 mt-0.5">→</span> <span className="italic">"{ex}"</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pl-[76px]">
                    <div className={`${colors.bg} ${colors.border} border rounded-[1.5rem] p-5 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                      <div className="flex justify-between items-start relative z-10 gap-4 flex-col sm:flex-row">
                        <div>
                          <p className="text-[11px] uppercase tracking-widest font-bold text-emerald-400 mb-2 flex items-center gap-2">
                             ✏️ Mission Briefing
                          </p>
                          <p className="text-emerald-50 font-medium text-[15px]">{lesson.exercise}</p>
                        </div>
                        <a href="/writing"
                          className="premium-btn text-[12px] font-bold rounded-xl px-5 py-3 whitespace-nowrap">
                          Start Practice Session
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>

        {/* CTA */}
        <div className="mt-10 mb-10 flex gap-4">
          <a href="/dashboard"
            className="flex-1 text-center glass-card hover:bg-white/10 border border-white/20 rounded-2xl py-4 text-sm font-bold text-white transition-colors uppercase tracking-widest">
            Dashboard
          </a>
        </div>

      </div>
    </main>
  )
}

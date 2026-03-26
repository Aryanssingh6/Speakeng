'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import DashboardLayout from '../components/DashboardLayout'
import { motion } from 'framer-motion'
import {
  Flame, Zap, Target, TrendingUp, ArrowRight, BookOpen,
  Mic, FlaskConical, PenTool, CheckCircle, Lock
} from 'lucide-react'
import { dummyUser, weeklyXP, recentActivity } from '../lib/dummyData'

const levelColors = {
  A1: 'text-white border-white/20 bg-white/5',
  A2: 'text-amber-400 border-amber-500/30 bg-amber-500/5',
  B1: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
  B2: 'text-sky-400 border-sky-500/30 bg-sky-500/5',
  C1: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/5',
  C2: 'text-rose-400 border-rose-500/30 bg-rose-500/5',
}

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } }
}
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <motion.div variants={fadeUp} className="glass-card rounded-2xl p-6 border border-white/[0.06]">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        {icon}
      </div>
      <p className="text-3xl font-extrabold text-white mb-1">{value}</p>
      <p className="text-sm font-semibold text-slate-400">{label}</p>
      {sub && <p className="text-xs text-slate-600 mt-1">{sub}</p>}
    </motion.div>
  )
}

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [userLevel, setUserLevel] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          window.location.href = '/login'
          return
        }
        setUser(user)
        const { data } = await supabase.from('profiles').select('level').eq('id', user.id).single()
        setUserLevel(data?.level || null)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading || !user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 rounded-full border-t-2 border-indigo-500 animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  const hasLevel = !!userLevel
  const levelStyle = userLevel ? levelColors[userLevel] : 'text-slate-400 bg-white/5 border-white/10'
  const dailyPct = Math.round((dummyUser.dailyProgress / dummyUser.dailyGoal) * 100)
  const maxXP = Math.max(...weeklyXP.map(d => d.xp))
  const name = user.user_metadata?.full_name?.split(' ')[0] || 'Student'

  const actionCards = [
    {
      icon: <FlaskConical size={26} className="text-white" />,
      bg: 'bg-white/5 border-white/10',
      title: 'Level Test',
      desc: hasLevel ? 'Want to level up? Retake your assessment.' : 'Discover your exact CEFR level with our AI test.',
      cta: hasLevel ? 'Retake Test' : 'Start Assessment',
      href: '/test',
      locked: false,
      ctaClass: 'premium-btn',
    },
    {
      icon: <BookOpen size={26} className="text-emerald-400" />,
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      title: 'Curated Lessons',
      desc: hasLevel ? `Personalized ${userLevel} curriculum — 24 lessons completed.` : 'Unlock personalized lessons after your test.',
      cta: 'View Curriculum',
      href: hasLevel ? '/lessons' : '#',
      locked: !hasLevel,
      ctaClass: 'premium-btn-gold',
    },
    {
      icon: <Mic size={26} className="text-amber-400" />,
      bg: 'bg-amber-500/10 border-amber-500/20',
      title: 'AI Speaking Practice',
      desc: 'Real-time conversations with instant grammar & fluency feedback.',
      cta: 'Start Session',
      href: hasLevel ? '/practice' : '#',
      locked: !hasLevel,
      ctaClass: 'premium-btn-gold',
    },
  ]

  return (
    <DashboardLayout>
      <div className="px-8 py-10 max-w-6xl mx-auto">

        {/* Welcome header */}
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="mb-10"
        >
          <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
            Welcome back, <span className="text-amber-500">{name}</span> 👋
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-400 font-medium">
            Your AI English tutor is ready. {hasLevel ? "Let's keep your streak going!" : "Start with your level assessment."}
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard icon={<span className="text-xl">🎓</span>} label="Current Level" value={userLevel || '—'} sub="CEFR Standard" color="bg-white/5 border border-white/10" />
          <StatCard icon={<Flame size={20} className="text-rose-400" />} label="Day Streak" value={`${dummyUser.streak}🔥`} sub="Keep it up!" color="bg-rose-500/10 border border-rose-500/20" />
          <StatCard icon={<Target size={20} className="text-emerald-400" />} label="Accuracy" value={`${dummyUser.accuracy}%`} sub="Grammar + Fluency" color="bg-emerald-500/10 border border-emerald-500/20" />
          <StatCard icon={<Zap size={20} className="text-indigo-400" />} label="Total XP" value={dummyUser.totalXP.toLocaleString()} sub="All time" color="bg-indigo-500/10 border border-indigo-500/20" />
        </motion.div>

        {/* Daily Goal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="glass-card rounded-2xl p-6 border border-white/[0.06] mb-8"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-amber-400" />
              <span className="text-sm font-semibold text-white">Daily Practice Goal</span>
            </div>
            <span className="text-sm text-slate-400">{dummyUser.dailyProgress} / {dummyUser.dailyGoal} min</span>
          </div>
          <div className="progress-bar-track">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${dailyPct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">{dailyPct >= 100 ? '🎉 Goal complete! Amazing work.' : `${dummyUser.dailyGoal - dummyUser.dailyProgress} minutes left to hit your daily goal`}</p>
        </motion.div>

        {/* Action cards */}
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {actionCards.map((card, i) => (
            <motion.div key={i} variants={fadeUp} className="glass-card rounded-3xl p-7 border border-white/[0.06] flex flex-col relative overflow-hidden group">
              {card.locked && (
                <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-[3px] z-10 flex items-center justify-center rounded-3xl">
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-full text-slate-400 text-sm font-medium">
                    <Lock size={14} /> Pass test to unlock
                  </div>
                </div>
              )}
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${card.bg}`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{card.title}</h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{card.desc}</p>
              <a
                href={card.locked ? '#' : card.href}
                className={`w-full text-center rounded-xl py-3 text-sm font-bold tracking-wide transition-all ${card.ctaClass}`}
              >
                {card.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom row: Weekly chart + Recent activity */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

          {/* Weekly XP chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass-card rounded-3xl p-7 border border-white/[0.06]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white">Weekly XP</h3>
              <span className="text-xs text-slate-500 px-2 py-1 rounded-full bg-white/5">+{dummyUser.weeklyXP} this week</span>
            </div>
            <div className="flex items-end gap-2 h-28">
              {weeklyXP.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full rounded-md bg-amber-500/40 relative overflow-hidden"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
                    style={{ height: `${(d.xp / maxXP) * 100}%`, originY: 1, background: 'linear-gradient(to top, #d97706, #fbbf24)' }}
                  />
                  <span className="text-[10px] text-slate-600 font-medium">{d.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="lg:col-span-3 glass-card rounded-3xl p-7 border border-white/[0.06]"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white">Recent Activity</h3>
              <a href="/progress" className="text-xs text-amber-500 hover:text-amber-400 font-semibold flex items-center gap-1">
                View all <ArrowRight size={12} />
              </a>
            </div>
            <div className="space-y-3">
              {recentActivity.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/[0.06] flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                    <p className="text-xs text-slate-500 truncate">{item.detail}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-amber-500">+{item.xp} XP</p>
                    <p className="text-xs text-slate-600">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Writing Studio CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass-card rounded-3xl p-8 border border-white/[0.06] relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-72 h-full bg-emerald-500/5 rounded-full blur-[80px] -mr-20 pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(16,185,129,0.1)] group-hover:scale-105 transition-transform shrink-0">
                ✍️
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">Writing Studio</h3>
                <p className="text-slate-400">Sentence-by-sentence AI corrections and essay grading.</p>
              </div>
            </div>
            <a href="/writing" className="premium-btn rounded-xl px-8 py-3.5 text-sm font-bold whitespace-nowrap">
              Open Studio →
            </a>
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  )
}
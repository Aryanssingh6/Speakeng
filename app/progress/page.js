'use client'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import { dummyUser, skillScores, weeklyXP, heatmapData, badges, recentActivity } from '../lib/dummyData'
import { TrendingUp, Award, Flame, Zap, Target } from 'lucide-react'

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
}
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const maxXP = Math.max(...weeklyXP.map(d => d.xp))

const heatmapColors = [
  'bg-white/[0.04]',
  'bg-amber-500/25',
  'bg-amber-500/55',
  'bg-amber-500',
]

export default function ProgressPage() {
  const levelOrder = ['A1','A2','B1','B2','C1','C2']
  const currentLevelIdx = levelOrder.indexOf(dummyUser.level)
  const progressPct = ((currentLevelIdx + 1) / levelOrder.length) * 100

  return (
    <DashboardLayout>
      <div className="px-8 py-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">My Progress</h1>
          <p className="text-slate-400 font-medium">Track your fluency journey from A1 to C2.</p>
        </div>

        {/* Overview stats */}
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Day Streak', value: `${dummyUser.streak}`, icon: <Flame size={18} className="text-rose-400" />, color: 'bg-rose-500/10 border-rose-500/20', sub: 'days in a row' },
            { label: 'Total XP', value: dummyUser.totalXP.toLocaleString(), icon: <Zap size={18} className="text-amber-400" />, color: 'bg-amber-500/10 border-amber-500/20', sub: 'all time' },
            { label: 'Accuracy', value: `${dummyUser.accuracy}%`, icon: <Target size={18} className="text-emerald-400" />, color: 'bg-emerald-500/10 border-emerald-500/20', sub: 'avg. score' },
            { label: 'Sessions', value: '38', icon: <TrendingUp size={18} className="text-sky-400" />, color: 'bg-sky-500/10 border-sky-500/20', sub: 'completed' },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp} className={`glass-card rounded-2xl p-5 border flex items-center gap-4 ${s.color}`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-slate-400 text-xs font-medium">{s.label}</p>
                <p className="text-slate-600 text-xs">{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Weekly XP chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-3xl p-7 border border-white/[0.06]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-white">Weekly XP</h2>
                <p className="text-xs text-slate-500 mt-0.5">Your XP earned per day this week</p>
              </div>
              <span className="text-xs font-bold text-amber-400 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">+{dummyUser.weeklyXP} this week</span>
            </div>
            <div className="flex items-end gap-3 h-36">
              {weeklyXP.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full rounded-lg overflow-hidden flex flex-col justify-end"
                    style={{ height: '100%' }}
                  >
                    <motion.div
                      className="w-full rounded-lg bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-default relative group"
                      style={{ originY: 1 }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                    >
                      <div
                        className="rounded-lg"
                        style={{ height: `${(d.xp / maxXP) * 144}px`, background: 'linear-gradient(to top, #d97706, #fbbf24)' }}
                      />
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0a0a0a] border border-white/10 px-2 py-1 rounded-lg text-xs text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {d.xp} XP
                      </div>
                    </motion.div>
                  </motion.div>
                  <span className="text-[11px] text-slate-500 font-medium">{d.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skill breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-7 border border-white/[0.06]"
          >
            <h2 className="text-base font-bold text-white mb-6">Skill Breakdown</h2>
            <div className="space-y-5">
              {Object.entries(skillScores).map(([skill, score], i) => (
                <div key={skill}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">{skill}</span>
                    <span className="text-sm font-bold text-white">{score}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <motion.div
                      className="progress-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Level Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="glass-card rounded-3xl p-7 border border-white/[0.06] mb-6"
        >
          <h2 className="text-base font-bold text-white mb-6">Level Journey</h2>
          <div className="flex items-center gap-2 md:gap-3">
            {levelOrder.map((level, i) => {
              const isPassed = i <= currentLevelIdx
              const isCurrent = i === currentLevelIdx
              return (
                <div key={level} className="flex-1 flex flex-col items-center gap-2">
                  <div className={`w-full h-2 rounded-full transition-all ${isPassed ? 'bg-amber-500' : 'bg-white/[0.06]'}`} />
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border transition-all ${
                    isCurrent ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/30 scale-110' :
                    isPassed ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                    'bg-white/[0.03] text-slate-600 border-white/[0.06]'
                  }`}>
                    {level}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-sm text-slate-400 mt-5">You're at <span className="text-amber-500 font-bold">{dummyUser.level}</span> — keep going to reach B2!</p>
        </motion.div>

        {/* Heatmap + Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Practice Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="glass-card rounded-3xl p-7 border border-white/[0.06]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-white">Practice Heatmap</h2>
              <span className="text-xs text-slate-500">Last 28 days</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {heatmapData.map((intensity, i) => (
                <div
                  key={i}
                  className={`heatmap-cell ${heatmapColors[intensity]}`}
                  title={`Day ${i + 1}: ${intensity === 0 ? 'No practice' : `${intensity * 15} min practiced`}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-slate-600">Less</span>
              {heatmapColors.map((c, i) => <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />)}
              <span className="text-xs text-slate-600">More</span>
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="glass-card rounded-3xl p-7 border border-white/[0.06]"
          >
            <h2 className="text-base font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.05] flex items-center justify-center text-base shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                    <p className="text-xs text-slate-500 truncate">{item.detail}</p>
                  </div>
                  <span className="text-xs font-bold text-amber-500 shrink-0">+{item.xp} XP</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass-card rounded-3xl p-7 border border-white/[0.06]"
        >
          <div className="flex items-center gap-2 mb-6">
            <Award size={18} className="text-amber-400" />
            <h2 className="text-base font-bold text-white">Achievements</h2>
            <span className="ml-auto text-xs text-slate-500">{badges.filter(b => b.earned).length}/{badges.length} earned</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map(badge => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  badge.earned
                    ? 'border-amber-500/25 bg-amber-500/5 hover:bg-amber-500/10'
                    : 'border-white/[0.05] bg-white/[0.02] opacity-40'
                }`}
              >
                <span className="text-3xl block mb-2">{badge.icon}</span>
                <p className={`text-xs font-bold mb-1 ${badge.earned ? 'text-white' : 'text-slate-500'}`}>{badge.name}</p>
                <p className="text-[10px] text-slate-600">{badge.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  )
}

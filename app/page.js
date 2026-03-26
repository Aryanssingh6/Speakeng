'use client'
import { motion } from 'framer-motion'
import { Mic, BookOpen, BarChart3, Zap, CheckCircle, Star, ArrowRight, Flame } from 'lucide-react'
import { testimonials, pricingPlans } from './lib/dummyData'
import Link from 'next/link'

const features = [
  {
    icon: <BarChart3 size={26} className="text-white" />,
    color: 'bg-white/10 border-white/10',
    accent: '',
    title: 'Smart Assessment',
    desc: 'Dynamic 20-minute test that pinpoints your exact CEFR level from A1 to C2 using adaptive AI scoring.',
  },
  {
    icon: <BookOpen size={26} className="text-emerald-400" />,
    color: 'bg-emerald-500/10 border-emerald-500/20',
    accent: 'hover:border-emerald-500/40',
    title: 'Curated Curriculum',
    desc: 'Personalized learning paths with 200+ interactive exercises, tailored specifically to close your skill gaps.',
  },
  {
    icon: <Mic size={26} className="text-indigo-400" />,
    color: 'bg-indigo-500/10 border-indigo-500/20',
    accent: 'hover:border-indigo-500/40',
    title: 'AI Speaking Coach',
    desc: 'Practice real conversations with instant AI feedback on grammar, fluency, pronunciation, and vocabulary.',
  },
  {
    icon: <BarChart3 size={26} className="text-sky-400" />,
    color: 'bg-sky-500/10 border-sky-500/20',
    accent: 'hover:border-sky-500/40',
    title: 'Progress Analytics',
    desc: 'Detailed charts and insights tracking your improvement across all skill areas over time.',
  },
  {
    icon: <Flame size={26} className="text-rose-400" />,
    color: 'bg-rose-500/10 border-rose-500/20',
    accent: 'hover:border-rose-500/40',
    title: 'Daily Streak System',
    desc: 'Stay motivated with daily goals, XP rewards, achievement badges, and streak tracking.',
  },
  {
    icon: <Zap size={26} className="text-violet-400" />,
    color: 'bg-violet-500/10 border-violet-500/20',
    accent: 'hover:border-violet-500/40',
    title: 'Instant Feedback',
    desc: 'Every answer corrected in real-time. Know exactly what to improve and why — not just what was wrong.',
  },
]

const faqs = [
  { q: 'Is SpeakEng really free?', a: 'Yes! Our Free tier gives you access to level tests, basic lessons, and 5 speaking sessions per month — no credit card required.' },
  { q: 'How does the AI speaking practice work?', a: 'Our AI simulates real conversations — job interviews, daily talks, academic discussions. You type or speak your responses, and AI gives immediate feedback on grammar, fluency, and vocabulary.' },
  { q: 'What CEFR levels does SpeakEng support?', a: 'We support all 6 CEFR levels: A1, A2, B1, B2, C1, and C2. Your curriculum adapts automatically as you level up.' },
  { q: 'Can I practice for IELTS or TOEFL?', a: 'Absolutely. Our Pro plan includes dedicated IELTS and TOEFL preparation tracks with mock tests and targeted practice sessions.' },
]

export default function Home() {
  return (
    <main className="min-h-screen text-slate-200 relative z-10 overflow-x-hidden">

      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none -mt-60 -mr-60" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-violet-500/4 rounded-full blur-[120px] pointer-events-none -ml-40" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-sky-500/4 rounded-full blur-[100px] pointer-events-none" />

      {/* ─── NAVBAR ─── */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 relative z-50 border-b border-white/[0.04]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
            <span className="text-white font-extrabold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SpeakEng</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="px-5 py-2 rounded-full text-sm font-semibold text-slate-400 hover:text-white transition-colors">
            Log in
          </a>
          <a href="/register" className="px-5 py-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50">
            Start Free →
          </a>
        </div>
      </nav>

      {/* ─── HERO (pure CSS animations — no JS dependency) ─── */}
      <section className="flex flex-col items-center text-center px-6 pt-28 pb-28 relative z-20">
        <span className="fade-up fade-up-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20 bg-emerald-500/5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Powered by Gemini AI
        </span>

        <h1 className="fade-up fade-up-2 text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] max-w-5xl mb-8 tracking-tight">
          Speak English like a{' '}
          <span className="gradient-text-hero">native.</span>
        </h1>

        <p className="fade-up fade-up-3 text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
          Take a smart proficiency test, unlock a personalized curriculum, and practice
          speaking with your AI tutor — 24/7, no judgment, just progress.
        </p>

        <div className="fade-up fade-up-4 flex flex-col sm:flex-row gap-4 mb-14">
          <a href="/register" className="px-10 py-4 premium-btn-gold rounded-full text-base font-bold transition-all hover:-translate-y-0.5 flex items-center gap-2">
            Get Started Free <ArrowRight size={18} />
          </a>
          <a href="/login" className="px-10 py-4 premium-btn-ghost rounded-full text-base font-bold flex items-center gap-2 group">
            Go to Dashboard <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Social proof */}
        <div className="fade-up fade-up-5 flex items-center gap-6 text-sm text-slate-500 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['#6366f1','#10b981','#38bdf8','#8b5cf6'].map((color, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#000]" style={{ background: color }} />
              ))}
            </div>
            <span>12,400+ learners</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-indigo-400 fill-indigo-400" />)}
            <span className="ml-1">4.9/5 rating</span>
          </div>
          <span>🌍 Available in 40+ countries</span>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="px-6 pb-32 max-w-7xl mx-auto relative z-20">
        <div className="section-divider mb-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 block">Features</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Everything you need to succeed</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">A complete AI-powered toolkit for mastering English fluency — from beginner to advanced.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass-card rounded-3xl p-8 border transition-all cursor-default ${f.accent}`}
            >
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
              <p className="text-slate-400 text-[15px] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="px-6 pb-32 max-w-7xl mx-auto relative z-20">
        <div className="section-divider mb-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 block">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Loved by learners worldwide</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-3xl p-8 border border-white/[0.06] flex flex-col gap-5"
            >
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-indigo-400 fill-indigo-400" />
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed text-[15px] flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="px-6 pb-32 max-w-7xl mx-auto relative z-20">
        <div className="section-divider mb-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 block">Pricing</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Simple, transparent pricing</h2>
          <p className="text-slate-400 text-lg">Start free, upgrade when you're ready.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 border flex flex-col ${
                plan.popular
                  ? 'bg-indigo-500/5 border-indigo-500/40 shadow-[0_0_60px_rgba(99,102,241,0.12)]'
                  : 'glass-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                {plan.price > 0 && <span className="text-slate-400 text-sm ml-2">/ {plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle size={16} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-indigo-400' : 'text-emerald-400'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.href}
                className={`w-full text-center py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  plan.popular ? 'premium-btn-gold' : 'premium-btn-ghost'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="px-6 pb-32 max-w-3xl mx-auto relative z-20">
        <div className="section-divider mb-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl border border-white/[0.06] group overflow-hidden"
            >
              <summary className="px-6 py-5 cursor-pointer font-semibold text-white list-none flex justify-between items-center">
                {faq.q}
                <span className="text-slate-500 group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <div className="px-6 pb-5 text-slate-400 text-[15px] leading-relaxed border-t border-white/[0.05] pt-4">
                {faq.a}
              </div>
            </motion.details>
          ))}
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="px-6 pb-32 max-w-4xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-12 text-center overflow-hidden border border-indigo-500/25 bg-indigo-500/5"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 relative z-10">
            Ready to speak English <br />with confidence?
          </h2>
          <p className="text-slate-400 text-lg mb-8 relative z-10">Join 12,400+ learners. No credit card required.</p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-4 premium-btn-gold rounded-full text-base font-bold hover:-translate-y-0.5 transition-all relative z-10"
          >
            Start for Free <ArrowRight size={18} />
          </a>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.06] py-12 px-6 relative z-20 bg-[#030303]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-extrabold text-sm">S</span>
                </div>
                <span className="font-bold text-white text-lg">SpeakEng</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">AI-powered English learning for the modern learner. Practice speaking, track progress, master fluency.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2.5 text-slate-500">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="/register" className="hover:text-white transition-colors">Get Started</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Practice</h4>
                <ul className="space-y-2.5 text-slate-500">
                  <li><a href="/practice" className="hover:text-white transition-colors">Speaking</a></li>
                  <li><a href="/writing" className="hover:text-white transition-colors">Writing</a></li>
                  <li><a href="/test" className="hover:text-white transition-colors">Level Test</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2.5 text-slate-500">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} SpeakEng. All rights reserved.</p>
            <div className="flex gap-6 text-slate-600 text-sm">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
'use client'
import { motion } from 'framer-motion'
import { CheckCircle, X, Zap } from 'lucide-react'
import { pricingPlans } from '../lib/dummyData'

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time. No cancellation fees, no questions asked. Your access continues until the end of the billing period.' },
  { q: 'Is there a free trial?', a: 'Yes! Pro and Team plans come with a 7-day free trial. No credit card required to start.' },
  { q: 'Do you offer student discounts?', a: 'Absolutely. We offer 50% off for verified students and educators. Contact us with your institutional email.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and UPI (India). All payments are secured by Stripe.' },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen text-slate-200 relative z-10 overflow-x-hidden">
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none -mt-40 -mr-40" />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5 border-b border-white/[0.04] relative z-50">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/50 transition-shadow">
            <span className="text-white font-extrabold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SpeakEng</span>
        </a>
        <div className="flex gap-3">
          <a href="/login" className="px-5 py-2 rounded-full text-sm font-semibold text-slate-400 hover:text-white transition-colors">Log in</a>
          <a href="/register" className="px-5 py-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-all font-bold text-sm">Start Free →</a>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 pt-24 pb-16 text-center relative z-20">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-center">
          <motion.div variants={fadeUp}>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500/80 mb-4 block">Pricing</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Simple, transparent pricing
          </motion.h1>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto mb-4">
            Start free, upgrade when you're ready. No hidden fees.
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
            <Zap size={14} />
            7-day free trial on all paid plans
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing cards */}
      <section className="px-6 pb-24 max-w-6xl mx-auto relative z-20">
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`relative rounded-3xl p-8 border flex flex-col ${
                plan.popular
                  ? 'bg-amber-500/5 border-amber-500/40 shadow-[0_0_80px_rgba(245,158,11,0.12)] scale-[1.02]'
                  : 'glass-card border-white/[0.07]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-amber-500 text-black text-xs font-bold rounded-full whitespace-nowrap shadow-lg shadow-amber-500/30">
                  ⭐ Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8 pb-6 border-b border-white/[0.06]">
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-extrabold text-white">{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
                  {plan.price > 0 && <span className="text-slate-400 text-sm mb-2">/ {plan.period}</span>}
                </div>
                {plan.price === 0 && <p className="text-slate-500 text-sm mt-1">No credit card required</p>}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle size={16} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-amber-400' : 'text-emerald-400'}`} />
                    {f}
                  </li>
                ))}
                {plan.notIncluded?.map((f, j) => (
                  <li key={`no-${j}`} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <X size={16} className="shrink-0 mt-0.5 text-slate-700" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`w-full text-center py-4 rounded-2xl font-bold text-sm transition-all ${
                  plan.popular ? 'premium-btn-gold' : 'premium-btn-ghost'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-slate-500 text-sm"
        >
          🛡️ 30-day money-back guarantee on all paid plans. No questions asked.
        </motion.div>
      </section>

      {/* Feature comparison table */}
      <section className="px-6 pb-24 max-w-4xl mx-auto relative z-20">
        <div className="section-divider mb-16" />
        <h2 className="text-2xl font-extrabold text-white text-center mb-10">Compare plans</h2>
        <div className="glass-card rounded-3xl border border-white/[0.06] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left px-6 py-4 text-slate-400 font-semibold">Feature</th>
                {['Free', 'Pro', 'Team'].map(p => (
                  <th key={p} className={`px-6 py-4 text-center font-bold ${p === 'Pro' ? 'text-amber-400' : 'text-white'}`}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Level assessment', '✓', '✓', '✓'],
                ['AI speaking sessions', '5/mo', 'Unlimited', 'Unlimited'],
                ['Lesson library', 'A1-A2 only', 'All levels', 'All levels'],
                ['Grammar feedback', 'Basic', 'Advanced', 'Advanced'],
                ['Writing studio', '—', '✓', '✓'],
                ['Progress reports', 'Basic', 'Detailed', 'Team analytics'],
                ['Priority support', '—', '✓', '✓'],
                ['Team dashboard', '—', '—', '✓'],
              ].map(([feature, ...vals], i) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-slate-300 font-medium">{feature}</td>
                  {vals.map((v, j) => (
                    <td key={j} className="px-6 py-4 text-center text-slate-400">
                      {v === '✓' ? <span className="text-emerald-400 font-bold">✓</span> : v === '—' ? <span className="text-slate-700">—</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24 max-w-3xl mx-auto relative z-20">
        <div className="section-divider mb-16" />
        <h2 className="text-2xl font-extrabold text-white text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="glass-card rounded-2xl border border-white/[0.06] group overflow-hidden">
              <summary className="px-6 py-5 cursor-pointer font-semibold text-white list-none flex justify-between items-center">
                {faq.q}
                <span className="text-slate-500 group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <div className="px-6 pb-5 text-slate-400 text-[15px] leading-relaxed border-t border-white/[0.05] pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-10 px-6 relative z-20 bg-[#030303]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">S</span>
            </div>
            <span className="font-bold text-white">SpeakEng</span>
          </div>
          <p className="text-slate-600 text-sm">© {new Date().getFullYear()} SpeakEng. All rights reserved.</p>
          <div className="flex gap-5 text-slate-600 text-sm">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

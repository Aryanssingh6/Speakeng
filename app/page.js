import { supabase } from './lib/supabase'

export default async function Home() {
  return (
    <main className="min-h-screen text-slate-200 relative z-10 overflow-x-hidden selection:bg-amber-500/30">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -mt-40 -mr-40"></div>
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -mt-40 -ml-40"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none mb-10"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 relative z-50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-shadow">
            <span className="text-black font-extrabold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SpeakEng</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="px-6 py-2.5 rounded-full text-sm font-bold text-slate-400 hover:text-white transition-colors">
            Log in
          </a>
          <a href="/register" className="px-6 py-2.5 rounded-full bg-white text-black hover:bg-slate-200 transition-all font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Start Free
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 pt-32 pb-24 relative z-20">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
          <span className="inline-flex glass-card border-white/10 items-center gap-2 px-4 py-2 rounded-full mb-8 text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            AI-Powered English Learning
          </span>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-extrabold leading-[1.1] max-w-4xl mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
          Master English at your <br/>
          <span className="text-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">own pace.</span>
        </h2>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both leading-relaxed font-medium">
          Take a smart proficiency test, unlock personalized lessons, and practice speaking with our advanced AI tutor. No judgment, just progress.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 fill-mode-both">
          <a href="/register" className="px-10 py-4 premium-btn-gold rounded-full text-base font-bold transition-all hover:-translate-y-1">
            Get Started — It's Free
          </a>
          <a href="/login" className="px-10 py-4 glass-card hover:bg-white/5 rounded-full text-base font-bold transition-all border border-white/10 border-t-white/20 flex items-center justify-center gap-2 group">
            Go to Dashboard <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 pb-32 max-w-7xl mx-auto relative z-20">
        
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">Everything you need to succeed</h3>
           <p className="text-slate-400 font-medium">A complete toolkit for mastering English fluency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="glass-card rounded-[2rem] p-8 border border-white/5 hover:border-white/20 transition-colors group bg-[#050505]/40">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Smart Assessment</h3>
            <p className="text-slate-400 text-[15px] leading-relaxed">
              Take our dynamic 20-minute test. Our algorithm determines your exact CEFR level from A1 to C2 instantly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card rounded-[2rem] p-8 border border-white/5 hover:border-emerald-500/30 transition-colors group bg-[#050505]/40">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
              📚
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Curated Curriculum</h3>
            <p className="text-slate-400 text-[15px] leading-relaxed">
              Unlock a personalized learning path tailored specifically for your level, complete with interactive exercises.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card rounded-[2rem] p-8 border border-white/5 hover:border-amber-500/30 transition-colors group bg-[#050505]/40">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
              🎤
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">AI Interview Coach</h3>
            <p className="text-slate-400 text-[15px] leading-relaxed">
              Practice speaking in real-time scenarios. Get instant feedback on grammar, confidence, and vocabulary.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 relative z-20 bg-[#050505]">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center border border-white/10">
                 <span className="text-white font-bold text-xs">S</span>
               </div>
               <span className="font-bold text-slate-300 tracking-wide">SpeakEng</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">© {new Date().getFullYear()} SpeakEng. All rights reserved.</p>
         </div>
      </footer>

    </main>
  )
}
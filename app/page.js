export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5">
        <h1 className="text-2xl font-bold text-blue-300">SpeakEng</h1>
        <div className="flex gap-4">
          <a href="/login" className="px-5 py-2 rounded-full border border-blue-400 text-blue-300 hover:bg-blue-800 transition">
            Login
          </a>
          <a href="/register" className="px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-400 transition font-semibold">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-16">
        <span className="bg-blue-800 text-blue-300 text-sm px-4 py-1 rounded-full mb-6">
          AI-Powered English Learning
        </span>
        <h2 className="text-5xl font-bold leading-tight max-w-2xl mb-6">
          English seekho apne <span className="text-blue-400">level</span> ke hisaab se
        </h2>
        <p className="text-blue-200 text-lg max-w-xl mb-10">
          Pehle apna level test karo, phir AI tumhe personalized lessons, speaking practice aur mock interviews dega.
        </p>
        <a href="/test" className="px-8 py-4 bg-blue-500 hover:bg-blue-400 rounded-full text-lg font-semibold transition">
          Apna Level Test Karo — Free
        </a>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-20 max-w-5xl mx-auto">
        
        <div className="bg-blue-800/40 rounded-2xl p-6 border border-blue-700">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-lg font-semibold mb-2">Level Assessment</h3>
          <p className="text-blue-300 text-sm">20 minute ka smart test jo tumhara exact English level batata hai (A1 se C2 tak)</p>
        </div>

        <div className="bg-blue-800/40 rounded-2xl p-6 border border-blue-700">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-lg font-semibold mb-2">Personalized Path</h3>
          <p className="text-blue-300 text-sm">Tumhare level aur goal ke hisaab se custom lessons — job interview, IELTS, ya daily English</p>
        </div>

        <div className="bg-blue-800/40 rounded-2xl p-6 border border-blue-700">
          <div className="text-3xl mb-3">🎤</div>
          <h3 className="text-lg font-semibold mb-2">AI Speaking Coach</h3>
          <p className="text-blue-300 text-sm">Bolo aur AI turant feedback de — pronunciation, fluency, grammar sab check hoga</p>
        </div>

      </section>

    </main>
  )
}
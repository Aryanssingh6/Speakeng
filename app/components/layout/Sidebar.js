'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Mic, BarChart3, BookOpen, PenTool, FlaskConical,
  Settings, LogOut, Flame, Zap, ChevronRight
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/practice', label: 'Speaking Practice', icon: Mic },
  { href: '/progress', label: 'My Progress', icon: BarChart3 },
  { href: '/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/writing', label: 'Writing Studio', icon: PenTool },
  { href: '/test', label: 'Level Test', icon: FlaskConical },
]

export default function Sidebar({ user, onSignOut, streak = 0, xp = 0 }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen flex flex-col bg-[#050505] border-r border-white/[0.06] shrink-0">
      
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/[0.06]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/50 transition-shadow">
            <span className="text-white font-extrabold text-lg">S</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">SpeakEng</span>
        </Link>
      </div>

      {/* User card */}
      {user && (
        <div className="px-4 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.03]">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user.user_metadata?.full_name || 'Student'}
              </p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          {/* Stats pills */}
          <div className="flex gap-2 mt-3 px-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <Flame size={12} className="text-rose-400" />
              <span className="text-xs font-bold text-rose-400">{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <Zap size={12} className="text-indigo-400" />
              <span className="text-xs font-bold text-indigo-400">{xp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-3 mb-3">Navigation</p>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className={`sidebar-item ${isActive ? 'active' : ''}`}>
              <Icon size={17} />
              <span>{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-white/[0.06] space-y-1">
        <Link href="/settings" className="sidebar-item">
          <Settings size={17} />
          <span>Settings</span>
        </Link>
        <button
          onClick={onSignOut}
          className="sidebar-item w-full text-left hover:text-rose-400 hover:bg-rose-500/10"
        >
          <LogOut size={17} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

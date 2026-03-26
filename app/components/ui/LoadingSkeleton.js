'use client'

export function LoadingSkeleton() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="skeleton h-8 w-48 mb-3 rounded-xl" />
        <div className="skeleton h-4 w-72 rounded-xl" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/[0.06] p-6">
            <div className="skeleton h-10 w-10 rounded-xl mb-4" />
            <div className="skeleton h-7 w-16 mb-2 rounded-lg" />
            <div className="skeleton h-3 w-24 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-3xl border border-white/[0.06] p-6">
            <div className="skeleton h-14 w-14 rounded-2xl mb-5" />
            <div className="skeleton h-6 w-32 mb-3 rounded-lg" />
            <div className="skeleton h-4 w-full mb-2 rounded-lg" />
            <div className="skeleton h-4 w-3/4 mb-6 rounded-lg" />
            <div className="skeleton h-11 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChatSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[false, true, false].map((isUser, i) => (
        <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`skeleton h-16 rounded-2xl ${isUser ? 'w-2/3' : 'w-3/4'}`} />
        </div>
      ))}
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { user, loading, signOut } = useAuth()

  // Không render header khi đang kiểm tra auth (tránh flash)
  if (loading) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 hover:opacity-90 transition-opacity"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-500/25">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <span className="font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent">
            SpendWise
          </span>
        </Link>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-3">
          {user ? (
            // Header khi đã đăng nhập
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 max-w-[220px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span
                  data-testid="user-email"
                  className="text-xs font-medium text-slate-700 truncate"
                  title={user.email ?? ''}
                >
                  {user.email}
                </span>
              </div>

              <Link
                href="/expenses"
                data-testid="link-expenses"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 px-2.5 py-1.5 rounded-lg hover:bg-indigo-50/70 transition-colors"
              >
                Expenses
              </Link>

              <Button
                data-testid="btn-logout"
                variant="outline"
                size="sm"
                onClick={signOut}
                className="h-8 px-3 text-xs font-medium border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
              >
                Logout
              </Button>
            </div>
          ) : (
            // Header khi chưa đăng nhập
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                data-testid="btn-login"
                className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.98]"
              >
                Login
              </Link>
              <Link
                href="/register"
                data-testid="btn-register"
                className="inline-flex h-8 items-center justify-center rounded-lg bg-indigo-600 px-3.5 text-xs font-semibold text-white shadow-xs shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-[0.98]"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

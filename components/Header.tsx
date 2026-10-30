'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { user, loading, signOut } = useAuth()

  // Không render header khi đang kiểm tra auth (tránh flash)
  if (loading) return null

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900 shrink-0">
          SpendWise
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2 flex-wrap">
          {user ? (
            // Header khi đã đăng nhập
            <>
              <span
                data-testid="user-email"
                className="text-sm text-gray-600 truncate max-w-[200px]"
              >
                {user.email}
              </span>
              <Link
                href="/expenses"
                data-testid="link-expenses"
                className="text-sm font-medium text-blue-600 hover:underline px-2"
              >
                Expenses
              </Link>
              <Button
                data-testid="btn-logout"
                variant="outline"
                size="sm"
                onClick={signOut}
              >
                Logout
              </Button>
            </>
          ) : (
            // Header khi chưa đăng nhập
            <>
              <Link
                href="/login"
                data-testid="btn-login"
                className="inline-flex h-7 items-center justify-center rounded-[min(var(--radius-md),12px)] border border-border bg-background px-2.5 text-[0.8rem] font-medium transition-all hover:bg-muted"
              >
                Login
              </Link>
              <Link
                href="/register"
                data-testid="btn-register"
                className="inline-flex h-7 items-center justify-center rounded-[min(var(--radius-md),12px)] bg-primary px-2.5 text-[0.8rem] font-medium text-primary-foreground transition-all hover:bg-primary/80"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

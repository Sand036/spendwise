import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Trang chủ công khai - hiển thị tên app, mô tả và 3 feature card
export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-gradient-to-b from-indigo-100/50 via-slate-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-6 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            Smart Personal Finance
          </div>

          <h1
            data-testid="home-title"
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
          >
            SpendWise
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Track your daily expenses, filter by month, and understand where your money goes — all in one simple app.
          </p>

          <div className="mt-9 flex items-center justify-center gap-3.5 flex-wrap">
            <Link
              href="/register"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-indigo-600 text-white font-medium text-sm shadow-sm shadow-indigo-600/25 hover:bg-indigo-700 transition-all active:scale-[0.98]"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-sm shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.98]"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <Card className="border-slate-200/90 bg-white shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 rounded-2xl">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900">Add expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">
                Quickly log your spending with amount, category, date and an optional note.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="border-slate-200/90 bg-white shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 rounded-2xl">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900">Filter by month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">
                Browse your expenses month by month and filter by category to see patterns.
              </p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="border-slate-200/90 bg-white shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 rounded-2xl">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900">See where money goes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-sm leading-relaxed">
                Get a live summary with totals per category so you know exactly where your money goes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

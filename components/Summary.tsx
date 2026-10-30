'use client'

import { formatMoney } from '@/lib/format'
import type { Expense } from '@/contexts/ExpenseContext'

interface SummaryProps {
  items: Expense[]
}

const CATEGORY_COLORS: Record<string, { bg: string; dot: string; bar: string }> = {
  Food: { bg: 'bg-amber-50', dot: 'bg-amber-500', bar: 'bg-amber-500' },
  Transport: { bg: 'bg-sky-50', dot: 'bg-sky-500', bar: 'bg-sky-500' },
  Shopping: { bg: 'bg-purple-50', dot: 'bg-purple-500', bar: 'bg-purple-500' },
  Bills: { bg: 'bg-rose-50', dot: 'bg-rose-500', bar: 'bg-rose-500' },
  Other: { bg: 'bg-slate-100', dot: 'bg-slate-500', bar: 'bg-slate-500' },
}

export default function Summary({ items }: SummaryProps) {
  // Tính tổng
  const total = items.reduce((sum, item) => sum + Number(item.amount), 0)
  const count = items.length

  // Tính breakdown theo category, sắp xếp theo tổng giảm dần
  const categoryMap: Record<string, number> = {}
  for (const item of items) {
    categoryMap[item.category] = (categoryMap[item.category] ?? 0) + Number(item.amount)
  }
  const breakdown = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          Summary
        </h2>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
          Live overview
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Stat */}
        <div className="bg-gradient-to-br from-indigo-50/70 via-slate-50/50 to-white p-3.5 rounded-xl border border-indigo-100/60">
          <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Total Spent
          </span>
          <span 
            data-testid="total-amount" 
            className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight block truncate"
            title={formatMoney(total)}
          >
            {formatMoney(total)}
          </span>
        </div>

        {/* Count Stat */}
        <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
          <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Total Entries
          </span>
          <span 
            data-testid="expense-count" 
            className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight block"
          >
            {count}
          </span>
        </div>
      </div>

      {/* Breakdown theo category */}
      {breakdown.length > 0 && (
        <div data-testid="category-breakdown" className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              By Category
            </p>
            <span className="text-[11px] text-slate-400">Share</span>
          </div>

          <div className="space-y-2.5">
            {breakdown.map(([cat, amount]) => {
              const percent = total > 0 ? Math.round((amount / total) * 100) : 0
              const theme = CATEGORY_COLORS[cat] || { bg: 'bg-slate-50', dot: 'bg-slate-500', bar: 'bg-slate-500' }

              return (
                <div
                  key={cat}
                  data-testid="breakdown-row"
                  className="group rounded-xl p-2.5 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/60"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full ${theme.dot} shrink-0`} />
                      <span data-testid="breakdown-name" className="text-xs font-semibold text-slate-800 truncate">
                        {cat}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {percent}%
                      </span>
                      <span data-testid="breakdown-amount" className="text-xs font-bold text-slate-900">
                        {formatMoney(amount)}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${theme.bar} transition-all duration-300`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

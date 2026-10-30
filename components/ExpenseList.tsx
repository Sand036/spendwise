'use client'

import { useExpenses } from '@/contexts/ExpenseContext'
import { formatMoney } from '@/lib/format'
import { Button } from '@/components/ui/button'
import type { Expense } from '@/contexts/ExpenseContext'

interface ExpenseListProps {
  items: Expense[]
}

const CATEGORY_STYLES: Record<string, { badge: string; iconBg: string }> = {
  Food: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
    iconBg: 'bg-amber-100/70 text-amber-600',
  },
  Transport: {
    badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
    iconBg: 'bg-sky-100/70 text-sky-600',
  },
  Shopping: {
    badge: 'bg-purple-50 text-purple-700 border-purple-200/80',
    iconBg: 'bg-purple-100/70 text-purple-600',
  },
  Bills: {
    badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
    iconBg: 'bg-rose-100/70 text-rose-600',
  },
  Other: {
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    iconBg: 'bg-slate-200 text-slate-600',
  },
}

export default function ExpenseList({ items }: ExpenseListProps) {
  const { loading, remove } = useExpenses()

  if (loading) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-2xl p-8 text-center space-y-3">
        <div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-xs font-medium">Loading expenses...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-2xl p-10 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p data-testid="expenses-empty" className="text-slate-500 text-sm font-medium">
          No expenses found
        </p>
        <p className="text-slate-400 text-xs mt-1">
          Add an expense on the left or try adjusting your filters.
        </p>
      </div>
    )
  }

  return (
    <ul data-testid="expense-list" className="space-y-3">
      {items.map(item => {
        const theme = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Other

        return (
          <li
            key={item.id}
            data-testid="expense-item"
            className="group bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-sm transition-all duration-200 min-w-0"
          >
            <div className="flex items-start justify-between gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
              {/* Left Column: Details */}
              <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                {/* Category & Date Row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    data-testid="expense-category"
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${theme.badge}`}
                  >
                    {item.category}
                  </span>
                  <span
                    data-testid="expense-date"
                    className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium"
                  >
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.spent_on}
                  </span>
                </div>

                {/* Amount */}
                <div className="pt-0.5">
                  <span
                    data-testid="expense-amount"
                    className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
                  >
                    {formatMoney(item.amount)}
                  </span>
                </div>

                {/* Note */}
                <span
                  data-testid="expense-note"
                  className={`text-xs text-slate-600 break-words min-w-0 leading-relaxed ${
                    item.note ? 'block bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 mt-1' : ''
                  }`}
                >
                  {item.note}
                </span>
              </div>

              {/* Right Column: Delete Action */}
              <div className="shrink-0 self-start sm:self-center">
                <Button
                  data-testid="btn-delete-expense"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(item.id)}
                  className="h-8 px-3 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200/80 hover:bg-rose-100 hover:text-rose-700 shadow-none active:scale-[0.98] transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </Button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

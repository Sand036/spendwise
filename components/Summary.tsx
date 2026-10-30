'use client'

import { formatMoney } from '@/lib/format'
import type { Expense } from '@/contexts/ExpenseContext'

interface SummaryProps {
  items: Expense[]
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <h2 className="text-base font-semibold text-gray-800">Summary</h2>

      {/* Tổng tiền */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Total</span>
        <span data-testid="total-amount" className="text-lg font-bold text-gray-900">
          {formatMoney(total)}
        </span>
      </div>

      {/* Số lượng */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Count</span>
        <span data-testid="expense-count" className="text-base font-semibold text-gray-900">
          {count}
        </span>
      </div>

      {/* Breakdown theo category */}
      {breakdown.length > 0 && (
        <div data-testid="category-breakdown" className="space-y-2 pt-2 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">By Category</p>
          {breakdown.map(([cat, amount]) => (
            <div
              key={cat}
              data-testid="breakdown-row"
              className="flex justify-between items-center"
            >
              <span data-testid="breakdown-name" className="text-sm text-gray-700">
                {cat}
              </span>
              <span data-testid="breakdown-amount" className="text-sm font-medium text-gray-900">
                {formatMoney(amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


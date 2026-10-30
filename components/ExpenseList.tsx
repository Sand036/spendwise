'use client'

import { useExpenses } from '@/contexts/ExpenseContext'
import { formatMoney } from '@/lib/format'
import { Button } from '@/components/ui/button'
import type { Expense } from '@/contexts/ExpenseContext'

interface ExpenseListProps {
  items: Expense[]
}

export default function ExpenseList({ items }: ExpenseListProps) {
  const { loading, remove } = useExpenses()

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading expenses...</p>
  }

  if (items.length === 0) {
    return (
      <p data-testid="expenses-empty" className="text-gray-500 text-sm py-4">
        No expenses found
      </p>
    )
  }

  return (
    <ul data-testid="expense-list" className="space-y-3">
      {items.map(item => (
        <li
          key={item.id}
          data-testid="expense-item"
          className="bg-white border border-gray-200 rounded-lg p-4 min-w-0"
        >
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              {/* Category */}
              <span
                data-testid="expense-category"
                className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full w-fit"
              >
                {item.category}
              </span>
              {/* Amount */}
              <span
                data-testid="expense-amount"
                className="text-lg font-bold text-gray-900"
              >
                {formatMoney(item.amount)}
              </span>
              {/* Date */}
              <span
                data-testid="expense-date"
                className="text-sm text-gray-500"
              >
                {item.spent_on}
              </span>
              {/* Note */}
              <span
                data-testid="expense-note"
                className="text-sm text-gray-600 break-words min-w-0"
              >
                {item.note}
              </span>
            </div>
            {/* Delete button */}
            <Button
              data-testid="btn-delete-expense"
              variant="destructive"
              size="sm"
              onClick={() => remove(item.id)}
              className="shrink-0"
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

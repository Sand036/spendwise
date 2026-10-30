'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useExpenses } from '@/contexts/ExpenseContext'
import ExpenseForm from '@/components/ExpenseForm'
import ExpenseList from '@/components/ExpenseList'
import Filters from '@/components/Filters'
import Summary from '@/components/Summary'

export default function ExpensesPage() {
  const { user, loading } = useAuth()
  const { items } = useExpenses()
  const router = useRouter()

  // State cho filters
  const [filterCategory, setFilterCategory] = useState('')
  const [filterMonth, setFilterMonth] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  // Đang kiểm tra auth -> không render gì (tránh flash)
  if (loading) return null
  if (!user) return null

  // Lọc dữ liệu theo filter (AND logic)
  const filtered = items.filter(item => {
    // Lọc theo category
    if (filterCategory && item.category !== filterCategory) return false
    // Lọc theo month (YYYY-MM)
    if (filterMonth && !item.spent_on.startsWith(filterMonth)) return false
    return true
  })

  const handleClearFilters = () => {
    setFilterCategory('')
    setFilterMonth('')
  }

  return (
    <div data-testid="expenses-page" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2">
            Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            My Expenses
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage, filter, and track all your personal expenses
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="mb-8">
        <Filters
          category={filterCategory}
          month={filterMonth}
          onCategoryChange={setFilterCategory}
          onMonthChange={setFilterMonth}
          onClear={handleClearFilters}
        />
      </div>

      {/* Layout responsive: mobile = 1 cột, 1280px = 3 cột (form+summary | list) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Cột trái: Form + Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* Add Expense Form Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Add Expense
              </h2>
            </div>
            <ExpenseForm />
          </div>

          {/* Summary Card */}
          <Summary items={filtered} />
        </div>

        {/* Cột phải: Expense List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Expenses
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <ExpenseList items={filtered} />
        </div>
      </div>
    </div>
  )
}

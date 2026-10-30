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
    <div data-testid="expenses-page" className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Expenses</h1>

      {/* Filters */}
      <div className="mb-6">
        <Filters
          category={filterCategory}
          month={filterMonth}
          onCategoryChange={setFilterCategory}
          onMonthChange={setFilterMonth}
          onClear={handleClearFilters}
        />
      </div>

      {/* Layout responsive: mobile = 1 cột, 1280px = 3 cột (form+summary | list) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: Form + Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* Add Expense Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Add Expense</h2>
            <ExpenseForm />
          </div>

          {/* Summary của filtered list */}
          <Summary items={filtered} />
        </div>

        {/* Cột phải: Expense List */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-semibold text-gray-800 mb-3">Expenses</h2>
          <ExpenseList items={filtered} />
        </div>
      </div>
    </div>
  )
}

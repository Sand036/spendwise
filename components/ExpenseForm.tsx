'use client'

import { useState } from 'react'
import { useExpenses } from '@/contexts/ExpenseContext'
import { validateExpense, ExpenseValues } from '@/lib/validators'
import { todayLocal } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Other']

export default function ExpenseForm() {
  const { add } = useExpenses()

  const [values, setValues] = useState<ExpenseValues>({
    amount: '',
    category: '',
    date: '',
    note: '',
  })
  const [errors, setErrors] = useState<ExpenseValues>({
    amount: '',
    category: '',
    date: '',
    note: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [expenseError, setExpenseError] = useState('')
  const [expenseSuccess, setExpenseSuccess] = useState('')

  // Cập nhật field và validate lại ngay (chỉ sau lần submit đầu)
  const handleChange = (field: keyof ExpenseValues, val: string) => {
    const next = { ...values, [field]: val }
    setValues(next)
    if (submitted) {
      const newErrors = validateExpense(next)
      setErrors(newErrors)
    }
    // Ẩn success/error khi người dùng bắt đầu chỉnh
    setExpenseSuccess('')
    setExpenseError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setExpenseError('')
    setExpenseSuccess('')

    const newErrors = validateExpense(values)
    setErrors(newErrors)

    // Nếu có lỗi thì dừng
    if (newErrors.amount || newErrors.category || newErrors.date || newErrors.note) {
      return
    }

    // Gọi API thêm expense
    const { error } = await add({
      amount: Number(values.amount),
      category: values.category,
      spent_on: values.date,
      note: values.note,
    })

    if (error) {
      setExpenseError(error)
      return
    }

    // Thành công: reset form
    setExpenseSuccess('Expense added')
    setValues({ amount: '', category: '', date: '', note: '' })
    setErrors({ amount: '', category: '', date: '', note: '' })
    setSubmitted(false)
  }

  return (
    <form
      data-testid="expense-form"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
    >
      {/* Amount */}
      <div className="space-y-1">
        <Label htmlFor="input-amount">Amount</Label>
        <Input
          id="input-amount"
          data-testid="input-amount"
          type="number"
          step="0.01"
          min="0"
          value={values.amount}
          onChange={e => handleChange('amount', e.target.value)}
          placeholder="0.00"
        />
        {errors.amount && (
          <p data-testid="error-amount" className="text-sm text-red-500">
            {errors.amount}
          </p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-1">
        <Label htmlFor="select-category">Category</Label>
        <select
          id="select-category"
          data-testid="select-category"
          value={values.category}
          onChange={e => handleChange('category', e.target.value)}
          className="flex h-8 w-full rounded-lg border border-border bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">-- Select category --</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && (
          <p data-testid="error-category" className="text-sm text-red-500">
            {errors.category}
          </p>
        )}
      </div>

      {/* Date */}
      <div className="space-y-1">
        <Label htmlFor="input-date">Date</Label>
        <Input
          id="input-date"
          data-testid="input-date"
          type="date"
          value={values.date}
          max={todayLocal()}
          onChange={e => handleChange('date', e.target.value)}
        />
        {errors.date && (
          <p data-testid="error-date" className="text-sm text-red-500">
            {errors.date}
          </p>
        )}
      </div>

      {/* Note */}
      <div className="space-y-1">
        <Label htmlFor="input-note">Note (optional)</Label>
        <Input
          id="input-note"
          data-testid="input-note"
          type="text"
          value={values.note}
          onChange={e => handleChange('note', e.target.value)}
          placeholder="Optional note..."
          maxLength={101}
        />
        {errors.note && (
          <p data-testid="error-note" className="text-sm text-red-500">
            {errors.note}
          </p>
        )}
      </div>

      {/* Lỗi từ Supabase */}
      {expenseError && (
        <p data-testid="error-expense" className="text-sm text-red-500">
          {expenseError}
        </p>
      )}

      {/* Thông báo thành công */}
      {expenseSuccess && (
        <p data-testid="expense-success" className="text-sm text-green-600 font-medium">
          {expenseSuccess}
        </p>
      )}

      <Button data-testid="btn-add-expense" type="submit" className="w-full">
        Add Expense
      </Button>
    </form>
  )
}


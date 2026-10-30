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
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    setIsSubmitting(true)
    // Gọi API thêm expense
    const { error } = await add({
      amount: Number(values.amount),
      category: values.category,
      spent_on: values.date,
      note: values.note,
    })
    setIsSubmitting(false)

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
      <div className="space-y-1.5">
        <Label htmlFor="input-amount" className="text-xs font-semibold text-slate-700">
          Amount ($)
        </Label>
        <div className="relative">
          <Input
            id="input-amount"
            data-testid="input-amount"
            type="number"
            step="0.01"
            min="0"
            value={values.amount}
            onChange={e => handleChange('amount', e.target.value)}
            placeholder="0.00"
            className="h-10 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium"
          />
        </div>
        {errors.amount && (
          <p data-testid="error-amount" className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pt-0.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.amount}</span>
          </p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <Label htmlFor="select-category" className="text-xs font-semibold text-slate-700">
          Category
        </Label>
        <select
          id="select-category"
          data-testid="select-category"
          value={values.category}
          onChange={e => handleChange('category', e.target.value)}
          className="flex h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-sm font-medium text-slate-900 shadow-2xs focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
        >
          <option value="">-- Select category --</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && (
          <p data-testid="error-category" className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pt-0.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.category}</span>
          </p>
        )}
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <Label htmlFor="input-date" className="text-xs font-semibold text-slate-700">
          Date
        </Label>
        <Input
          id="input-date"
          data-testid="input-date"
          type="date"
          value={values.date}
          max={todayLocal()}
          onChange={e => handleChange('date', e.target.value)}
          className="h-10 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
        />
        {errors.date && (
          <p data-testid="error-date" className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pt-0.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.date}</span>
          </p>
        )}
      </div>

      {/* Note */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="input-note" className="text-xs font-semibold text-slate-700">
            Note (optional)
          </Label>
          <span className="text-[11px] text-slate-400">
            {values.note.length}/100
          </span>
        </div>
        <Input
          id="input-note"
          data-testid="input-note"
          type="text"
          value={values.note}
          onChange={e => handleChange('note', e.target.value)}
          placeholder="e.g. Lunch with team, Groceries..."
          maxLength={101}
          className="h-10 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
        />
        {errors.note && (
          <p data-testid="error-note" className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pt-0.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.note}</span>
          </p>
        )}
      </div>

      {/* Lỗi từ Supabase */}
      {expenseError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80">
          <p data-testid="error-expense" className="text-xs font-medium text-rose-600 flex items-center gap-1.5">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{expenseError}</span>
          </p>
        </div>
      )}

      {/* Thông báo thành công */}
      {expenseSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80">
          <p data-testid="expense-success" className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
            <svg className="w-4 h-4 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{expenseSuccess}</span>
          </p>
        </div>
      )}

      <Button
        data-testid="btn-add-expense"
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow-xs shadow-indigo-600/25 hover:bg-indigo-700 active:scale-[0.99] transition-all cursor-pointer"
      >
        {isSubmitting ? 'Saving...' : 'Add Expense'}
      </Button>
    </form>
  )
}

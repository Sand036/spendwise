import { todayLocal } from '@/lib/format'

// --- Validation cho form Login / Register ---

export function validateEmail(value: string): string {
  if (!value.trim()) return 'Email is required'
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailReg.test(value.trim())) return 'Please enter a valid email address'
  return ''
}

export function validatePassword(value: string): string {
  if (!value) return 'Password is required'
  if (value.length < 6) return 'Password must be at least 6 characters'
  return ''
}

export function validateLoginPassword(value: string): string {
  if (!value) return 'Password is required'
  return ''
}

export function validateConfirm(value: string, password: string): string {
  if (!value) return 'Confirm password is required'
  if (value !== password) return 'Passwords do not match'
  return ''
}

// --- Validation cho form Expense ---

export interface ExpenseValues {
  amount: string
  category: string
  date: string
  note: string
}

export interface ExpenseErrors {
  amount: string
  category: string
  date: string
  note: string
}

export function validateExpense(values: ExpenseValues): ExpenseErrors {
  const errors: ExpenseErrors = { amount: '', category: '', date: '', note: '' }

  // Kiểm tra amount
  if (!values.amount.trim()) {
    errors.amount = 'Amount is required'
  } else {
    const num = Number(values.amount)
    if (isNaN(num) || num <= 0) {
      errors.amount = 'Amount must be greater than 0'
    }
  }

  // Kiểm tra category
  if (!values.category) {
    errors.category = 'Please choose a category'
  }

  // Kiểm tra date
  if (!values.date) {
    errors.date = 'Date is required'
  } else if (values.date > todayLocal()) {
    errors.date = 'Date cannot be in the future'
  }

  // Kiểm tra note (tùy chọn, nhưng tối đa 100 ký tự)
  if (values.note.length > 100) {
    errors.note = 'Note must be at most 100 characters'
  }

  return errors
}


'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

// --- Kiểu dữ liệu ---
export interface Expense {
  id: string
  user_id: string
  amount: number
  category: string
  spent_on: string   // YYYY-MM-DD
  note: string
  created_at: string
}

interface ExpenseContextType {
  items: Expense[]
  loading: boolean
  error: string
  add: (data: Omit<Expense, 'id' | 'user_id' | 'created_at'>) => Promise<{ error: string | null }>
  remove: (id: string) => Promise<void>
}

const ExpenseContext = createContext<ExpenseContextType | null>(null)

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [items, setItems] = useState<Expense[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Tải danh sách chi tiêu khi user đăng nhập, xóa khi logout
  useEffect(() => {
    if (!user) {
      // Xóa dữ liệu khi user logout hoặc thay đổi
      setItems([])
      return
    }

    // Load dữ liệu từ Supabase: sắp xếp theo spent_on desc, sau đó created_at desc
    setLoading(true)
    setError('')
    supabase
      .from('expenses')
      .select('*')
      .order('spent_on', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message)
        } else {
          setItems(data ?? [])
        }
        setLoading(false)
      })
  }, [user?.id])

  // Thêm chi tiêu mới
  const add = async (data: Omit<Expense, 'id' | 'user_id' | 'created_at'>) => {
    const { data: inserted, error: err } = await supabase
      .from('expenses')
      .insert({ ...data, user_id: user?.id })
      .select()
      .single()

    if (err) {
      return { error: err.message }
    }

    // Thêm vào đầu danh sách (sắp xếp lại theo spent_on desc, created_at desc)
    setItems(prev => {
      const next = [inserted as Expense, ...prev]
      return next.sort((a, b) => {
        if (b.spent_on !== a.spent_on) return b.spent_on.localeCompare(a.spent_on)
        return b.created_at.localeCompare(a.created_at)
      })
    })

    return { error: null }
  }

  // Xóa chi tiêu
  const remove = async (id: string) => {
    await supabase.from('expenses').delete().eq('id', id)
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <ExpenseContext.Provider value={{ items, loading, error, add, remove }}>
      {children}
    </ExpenseContext.Provider>
  )
}

// Hook để sử dụng ExpenseContext
export function useExpenses() {
  const ctx = useContext(ExpenseContext)
  if (!ctx) throw new Error('useExpenses must be used within ExpenseProvider')
  return ctx
}


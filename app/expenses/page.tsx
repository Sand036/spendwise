'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

// Trang expenses có bảo vệ (protected route)
// Phase 5: chỉ guard + container, form/list sẽ thêm ở Phase 6 & 7
export default function ExpensesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Sau khi auth loading xong mà không có user -> redirect về login
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  // Đang kiểm tra auth -> không render gì (tránh flash)
  if (loading) return null

  // Chưa đăng nhập -> null (useEffect sẽ redirect)
  if (!user) return null

  return (
    <div data-testid="expenses-page" className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Expenses</h1>
      {/* Form, Filters, Summary, List sẽ thêm ở các Phase tiếp theo */}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { validateEmail, validateLoginPassword } from '@/lib/validators'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginForm() {
  const { signIn } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [authError, setAuthError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Validate và cập nhật lỗi theo thời gian thực (chỉ sau lần submit đầu)
  const handleEmailChange = (val: string) => {
    setEmail(val)
    if (submitted) {
      setErrors(prev => ({ ...prev, email: validateEmail(val) }))
    }
  }

  const handlePasswordChange = (val: string) => {
    setPassword(val)
    if (submitted) {
      setErrors(prev => ({ ...prev, password: validateLoginPassword(val) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setAuthError('')

    // Validate tất cả fields
    const emailErr = validateEmail(email)
    const passwordErr = validateLoginPassword(password)
    setErrors({ email: emailErr, password: passwordErr })

    // Nếu còn lỗi thì dừng
    if (emailErr || passwordErr) return

    // Gọi API đăng nhập
    const { error } = await signIn(email, password)
    if (error) {
      setAuthError(error)
      return
    }

    // Đăng nhập thành công -> chuyển đến trang expenses
    router.push('/expenses')
  }

  return (
    <form
      data-testid="login-form"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
    >
      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          data-testid="login-email"
          type="email"
          value={email}
          onChange={e => handleEmailChange(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <p data-testid="error-email" className="text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          data-testid="login-password"
          type="password"
          value={password}
          onChange={e => handlePasswordChange(e.target.value)}
          placeholder="••••••"
          autoComplete="current-password"
        />
        {errors.password && (
          <p data-testid="error-password" className="text-sm text-red-500">
            {errors.password}
          </p>
        )}
      </div>

      {/* Lỗi từ Supabase */}
      {authError && (
        <p data-testid="error-auth" className="text-sm text-red-500">
          {authError}
        </p>
      )}

      <Button data-testid="login-submit" type="submit" className="w-full">
        Login
      </Button>
    </form>
  )
}


'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { validateEmail, validatePassword, validateConfirm } from '@/lib/validators'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterForm() {
  const { signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '', confirm: '' })
  const [authError, setAuthError] = useState('')
  const [success, setSuccess] = useState('')
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
      setErrors(prev => ({
        ...prev,
        password: validatePassword(val),
        confirm: validateConfirm(confirm, val),
      }))
    }
  }

  const handleConfirmChange = (val: string) => {
    setConfirm(val)
    if (submitted) {
      setErrors(prev => ({ ...prev, confirm: validateConfirm(val, password) }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setAuthError('')
    setSuccess('')

    // Validate tất cả fields
    const emailErr = validateEmail(email)
    const passwordErr = validatePassword(password)
    const confirmErr = validateConfirm(confirm, password)
    setErrors({ email: emailErr, password: passwordErr, confirm: confirmErr })

    // Nếu còn lỗi thì dừng
    if (emailErr || passwordErr || confirmErr) return

    // Gọi API đăng ký
    const { error } = await signUp(email, password)
    if (error) {
      setAuthError(error)
      return
    }

    // Đăng ký thành công
    setSuccess('Regisration successfull')
  }

  return (
    <form
      data-testid="register-form"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
    >
      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          data-testid="register-email"
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
        <Label htmlFor="register-password">Password</Label>
        <Input
          id="register-password"
          data-testid="register-password"
          type="password"
          value={password}
          onChange={e => handlePasswordChange(e.target.value)}
          placeholder="••••••"
          autoComplete="new-password"
        />
        {errors.password && (
          <p data-testid="error-password" className="text-sm text-red-500">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <Label htmlFor="register-confirm-password">Confirm Password</Label>
        <Input
          id="register-confirm-password"
          data-testid="register-confirm-password"
          type="password"
          value={confirm}
          onChange={e => handleConfirmChange(e.target.value)}
          placeholder="••••••"
          autoComplete="new-password"
        />
        {errors.confirm && (
          <p data-testid="error-confirm-password" className="text-sm text-red-500">
            {errors.confirm}
          </p>
        )}
      </div>

      {/* Lỗi từ Supabase */}
      {authError && (
        <p data-testid="error-auth" className="text-sm text-red-500">
          {authError}
        </p>
      )}

      {/* Thông báo đăng ký thành công */}
      {success && (
        <p data-testid="form-success" className="text-sm text-green-600 font-medium">
          {success}
        </p>
      )}

      <Button data-testid="register-submit" type="submit" className="w-full">
        Register
      </Button>
    </form>
  )
}


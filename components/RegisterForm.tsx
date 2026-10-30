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
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    setIsSubmitting(true)
    // Gọi API đăng ký
    const { error } = await signUp(email, password)
    setIsSubmitting(false)

    if (error) {
      setAuthError(error)
      return
    }

    // Đăng ký thành công
    setSuccess('Registration successful')
  }

  return (
    <form
      data-testid="register-form"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4"
    >
      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="register-email" className="text-xs font-semibold text-slate-700">
          Email address
        </Label>
        <Input
          id="register-email"
          data-testid="register-email"
          type="email"
          value={email}
          onChange={e => handleEmailChange(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="h-10 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
        />
        {errors.email && (
          <p data-testid="error-email" className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pt-0.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label htmlFor="register-password" className="text-xs font-semibold text-slate-700">
          Password
        </Label>
        <Input
          id="register-password"
          data-testid="register-password"
          type="password"
          value={password}
          onChange={e => handlePasswordChange(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
          className="h-10 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
        />
        {errors.password && (
          <p data-testid="error-password" className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pt-0.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <Label htmlFor="register-confirm-password" className="text-xs font-semibold text-slate-700">
          Confirm Password
        </Label>
        <Input
          id="register-confirm-password"
          data-testid="register-confirm-password"
          type="password"
          value={confirm}
          onChange={e => handleConfirmChange(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
          className="h-10 rounded-xl border-slate-200 bg-slate-50/50 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
        />
        {errors.confirm && (
          <p data-testid="error-confirm-password" className="text-xs font-medium text-rose-600 flex items-center gap-1.5 pt-0.5">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.confirm}</span>
          </p>
        )}
      </div>

      {/* Lỗi từ Supabase */}
      {authError && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80">
          <p data-testid="error-auth" className="text-xs font-medium text-rose-600 flex items-center gap-1.5">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{authError}</span>
          </p>
        </div>
      )}

      {/* Thông báo đăng ký thành công */}
      {success && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80">
          <p data-testid="form-success" className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
            <svg className="w-4 h-4 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{success}</span>
          </p>
        </div>
      )}

      <Button
        data-testid="register-submit"
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow-xs shadow-indigo-600/25 hover:bg-indigo-700 active:scale-[0.99] transition-all cursor-pointer"
      >
        {isSubmitting ? 'Creating account...' : 'Register'}
      </Button>
    </form>
  )
}

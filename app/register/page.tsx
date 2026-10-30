import RegisterForm from '@/components/RegisterForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

// Trang đăng ký công khai
export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 relative">
      {/* Background ambient decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-indigo-100/40 via-sky-50/20 to-transparent blur-3xl -z-10 pointer-events-none" />

      <Card className="w-full max-w-md border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 rounded-2xl">
        <CardHeader className="text-center pb-2 pt-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-2xs">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">Create Account</CardTitle>
          <p className="text-sm text-slate-500 mt-1.5">Start tracking your spending today</p>
        </CardHeader>
        <CardContent className="px-6 pb-8 pt-4">
          <RegisterForm />
          <p className="text-center text-xs text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

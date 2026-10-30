import RegisterForm from '@/components/RegisterForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Trang đăng ký công khai
export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}


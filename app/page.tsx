import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Trang chủ công khai - hiển thị tên app, mô tả và 3 feature card
export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Tiêu đề chính */}
      <div className="text-center mb-12">
        <h1
          data-testid="home-title"
          className="text-5xl font-bold text-gray-900 mb-4"
        >
          SpendWise
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track your daily expenses, filter by month, and understand where your money goes — all in one simple app.
        </p>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* 3 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Quickly log your spending with amount, category, date and an optional note.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter by month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Browse your expenses month by month and filter by category to see patterns.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">See where mony goes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">
              Get a live summary with totals per category so you know exactly where your money goes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

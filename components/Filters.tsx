'use client'

// Component Filters: filter-category và filter-month
const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Other']

interface FiltersProps {
  category: string
  month: string
  onCategoryChange: (val: string) => void
  onMonthChange: (val: string) => void
  onClear: () => void
}

export default function Filters({
  category,
  month,
  onCategoryChange,
  onMonthChange,
  onClear,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-end">
      {/* Filter by category */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Category</label>
        <select
          data-testid="filter-category"
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
          className="h-8 rounded-lg border border-border bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">All</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Filter by month */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Month</label>
        <input
          data-testid="filter-month"
          type="month"
          value={month}
          onChange={e => onMonthChange(e.target.value)}
          className="h-8 rounded-lg border border-border bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Clear filters */}
      <button
        data-testid="btn-clear-filters"
        type="button"
        onClick={onClear}
        className="h-8 px-3 text-sm rounded-lg border border-border bg-background hover:bg-muted transition-colors"
      >
        Clear Filters
      </button>
    </div>
  )
}


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
  const hasActiveFilters = Boolean(category || month)

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-wrap items-end gap-3 sm:gap-4 flex-1">
          {/* Filter by category */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[140px] sm:max-w-[200px]">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Category
            </label>
            <select
              data-testid="filter-category"
              value={category}
              onChange={e => onCategoryChange(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-xs font-medium text-slate-800 shadow-2xs focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
            >
              <option value="">All</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Filter by month */}
          <div className="flex flex-col gap-1.5 flex-1 min-w-[140px] sm:max-w-[200px]">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Month
            </label>
            <input
              data-testid="filter-month"
              type="month"
              value={month}
              onChange={e => onMonthChange(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-xs font-medium text-slate-800 shadow-2xs focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Clear filters button */}
        <div className="shrink-0 pt-1 sm:pt-0">
          <button
            data-testid="btn-clear-filters"
            type="button"
            onClick={onClear}
            className={`inline-flex items-center justify-center gap-1.5 h-9 px-4 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              hasActiveFilters
                ? 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 shadow-2xs'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}

// Format tiền tệ: "$" + 2 số thập phân, không có dấu phân cách hàng nghìn
export function formatMoney(n: number): string {
  return "$" + Number(n).toFixed(2)
}

// Lấy ngày hiện tại theo giờ địa phương (local time), định dạng YYYY-MM-DD
export function todayLocal(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}


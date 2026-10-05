export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-')
  return year && month && day ? `${day}/${month}/${year}` : '-'
}

export function formatNumber(value: number | null | undefined, decimals: number): string {
  return value === null || value === undefined ? '-' : value.toFixed(decimals)
}

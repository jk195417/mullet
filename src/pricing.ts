/** One row of the price table: mullets weighing [min, max) taels get this level and price per catty. */
export interface PriceRow {
  level: number
  min: number
  max: number
  money: number
}

/** Weight is in taels (兩); prices are per catty (斤), and 1 catty = 16 taels. */
export const TAELS_PER_CATTY = 16

/** The row a weight falls into. When ranges overlap, the last matching row wins. */
export function findPriceRow(weight: number, prices: PriceRow[]): PriceRow | undefined {
  return prices.findLast((row) => weight >= row.min && weight < row.max)
}

/** Price of one mullet, or 0 when its weight is outside every range. */
export function priceOf(weight: number, prices: PriceRow[]): number {
  const row = findPriceRow(weight, prices)
  return row ? (row.money * weight) / TAELS_PER_CATTY : 0
}

const money = new Intl.NumberFormat('zh-TW', { maximumFractionDigits: 0 })

/** Rounds to whole dollars for display, with thousands separators. */
export function formatMoney(value: number): string {
  return money.format(value)
}

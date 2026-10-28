import { describe, expect, it } from 'vitest'
import { findPriceRow, formatMoney, priceOf, type PriceRow } from './pricing'

const prices: PriceRow[] = [
  { level: 1, min: 0, max: 4, money: 1000 },
  { level: 2, min: 4, max: 6, money: 1600 },
]

describe('findPriceRow', () => {
  it('includes the minimum and excludes the maximum', () => {
    expect(findPriceRow(0, prices)?.level).toBe(1)
    expect(findPriceRow(3.9, prices)?.level).toBe(1)
    expect(findPriceRow(4, prices)?.level).toBe(2)
    expect(findPriceRow(6, prices)).toBeUndefined()
  })

  it('uses the last matching row when ranges overlap', () => {
    const overlapping = [...prices, { level: 9, min: 3, max: 5, money: 2000 }]
    expect(findPriceRow(4.5, overlapping)?.level).toBe(9)
  })
})

describe('priceOf', () => {
  it('converts taels to catties', () => {
    // 5 taels at 1600 per catty (16 taels) = 500
    expect(priceOf(5, prices)).toBe(500)
  })

  it('is 0 outside every range', () => {
    expect(priceOf(10, prices)).toBe(0)
  })
})

describe('formatMoney', () => {
  it('rounds to whole dollars with separators', () => {
    expect(formatMoney(1234.56)).toBe('1,235')
  })
})

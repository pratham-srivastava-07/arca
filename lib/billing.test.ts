import { describe, it, expect } from 'vitest'
import { advanceByCycle, rollover, isReminderDue } from './billing'

describe('advanceByCycle', () => {
  it('advances monthly, clamping to month end', () => {
    expect(advanceByCycle(new Date('2026-01-31'), 'monthly')).toEqual(new Date('2026-02-28'))
  })
  it('advances yearly and weekly', () => {
    expect(advanceByCycle(new Date('2026-03-10'), 'yearly')).toEqual(new Date('2027-03-10'))
    expect(advanceByCycle(new Date('2026-03-10'), 'weekly')).toEqual(new Date('2026-03-17'))
  })
})

describe('rollover', () => {
  const now = new Date('2026-07-10')
  it('does nothing for a future date', () => {
    const { charges, next } = rollover(new Date('2026-07-15'), 'monthly', now)
    expect(charges).toEqual([])
    expect(next).toEqual(new Date('2026-07-15'))
  })
  it('charges one missed monthly period', () => {
    const { charges, next } = rollover(new Date('2026-07-01'), 'monthly', now)
    expect(charges).toEqual([new Date('2026-07-01')])
    expect(next).toEqual(new Date('2026-08-01'))
  })
  it('catches up multiple missed weekly periods', () => {
    const { charges, next } = rollover(new Date('2026-06-25'), 'weekly', now)
    expect(charges).toEqual([
      new Date('2026-06-25'),
      new Date('2026-07-02'),
      new Date('2026-07-09'),
    ])
    expect(next).toEqual(new Date('2026-07-16'))
  })
})

describe('isReminderDue', () => {
  const now = new Date('2026-07-10')
  it('is due within 3 days when never reminded', () => {
    expect(isReminderDue(new Date('2026-07-12'), null, now)).toBe(true)
  })
  it('is not due more than 3 days out', () => {
    expect(isReminderDue(new Date('2026-07-20'), null, now)).toBe(false)
  })
  it('is not due for past-due dates (rollover handles those)', () => {
    expect(isReminderDue(new Date('2026-07-09'), null, now)).toBe(false)
  })
  it('is not due when already reminded for this renewal', () => {
    expect(isReminderDue(new Date('2026-07-12'), new Date('2026-07-10'), now)).toBe(false)
  })
  it('is due when the last reminder was for a previous renewal', () => {
    expect(isReminderDue(new Date('2026-07-12'), new Date('2026-06-09'), now)).toBe(true)
  })
})

import { describe, it, expect } from 'vitest'
import type { UserListItem } from '../models'

/**
 * Extracted sorting logic identical to Users page useMemo:
 * Favourited users sort to top, original order preserved within each group.
 */
const sortWithFavourites = (rows: UserListItem[], favouriteIds: Set<number>): UserListItem[] => {
  return [...rows].sort((a, b) => {
    const aFav = favouriteIds.has(a.id) ? 0 : 1
    const bFav = favouriteIds.has(b.id) ? 0 : 1
    return aFav - bFav
  })
}

const makeUser = (id: number, name: string): UserListItem => ({
  id,
  name,
  email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
  companyName: 'Acme',
  city: 'Metropolis',
  phone: '555-0000',
  website: 'example.com',
})

describe('sortWithFavourites', () => {
  const users: UserListItem[] = [
    makeUser(1, 'Alice'),
    makeUser(2, 'Bob'),
    makeUser(3, 'Charlie'),
    makeUser(4, 'Diana'),
    makeUser(5, 'Eve'),
  ]

  it('returns the same order when no favourites are set', () => {
    const result = sortWithFavourites(users, new Set())
    expect(result.map((u) => u.id)).toEqual([1, 2, 3, 4, 5])
  })

  it('moves a single favourite to the top', () => {
    const result = sortWithFavourites(users, new Set([3]))
    expect(result[0].id).toBe(3)
    // Remaining non-favourites keep their relative order
    expect(result.slice(1).map((u) => u.id)).toEqual([1, 2, 4, 5])
  })

  it('moves multiple favourites to the top, preserving their relative order', () => {
    const result = sortWithFavourites(users, new Set([4, 2]))
    // Bob (2) appears before Diana (4) because Bob comes first in the original list
    expect(result.map((u) => u.id)).toEqual([2, 4, 1, 3, 5])
  })

  it('keeps order unchanged when all users are favourited', () => {
    const allIds = new Set(users.map((u) => u.id))
    const result = sortWithFavourites(users, allIds)
    expect(result.map((u) => u.id)).toEqual([1, 2, 3, 4, 5])
  })

  it('handles an empty user list', () => {
    const result = sortWithFavourites([], new Set([1, 2]))
    expect(result).toEqual([])
  })

  it('ignores favourite ids that are not in the user list', () => {
    const result = sortWithFavourites(users, new Set([99]))
    expect(result.map((u) => u.id)).toEqual([1, 2, 3, 4, 5])
  })

  it('does not mutate the original array', () => {
    const copy = [...users]
    sortWithFavourites(users, new Set([5]))
    expect(users).toEqual(copy)
  })
})

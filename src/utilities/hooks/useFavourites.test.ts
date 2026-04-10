import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import useFavourites from './useFavourites'
import { FAVOURITES_STORAGE_KEY } from '../constants'

describe('useFavourites', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('initialises with an empty set when localStorage is empty', () => {
    const { result } = renderHook(() => useFavourites())
    expect(result.current.favouriteIds.size).toBe(0)
  })

  it('toggles a user id into favourites', () => {
    const { result } = renderHook(() => useFavourites())

    act(() => {
      result.current.toggleFavourite(3)
    })

    expect(result.current.favouriteIds.has(3)).toBe(true)
    expect(result.current.favouriteIds.size).toBe(1)
  })

  it('toggles a user id out of favourites when already present', () => {
    const { result } = renderHook(() => useFavourites())

    act(() => {
      result.current.toggleFavourite(5)
    })
    expect(result.current.favouriteIds.has(5)).toBe(true)

    act(() => {
      result.current.toggleFavourite(5)
    })
    expect(result.current.favouriteIds.has(5)).toBe(false)
    expect(result.current.favouriteIds.size).toBe(0)
  })

  it('supports multiple favourites simultaneously', () => {
    const { result } = renderHook(() => useFavourites())

    act(() => {
      result.current.toggleFavourite(1)
    })
    act(() => {
      result.current.toggleFavourite(4)
    })
    act(() => {
      result.current.toggleFavourite(7)
    })

    expect(result.current.favouriteIds.size).toBe(3)
    expect(result.current.favouriteIds.has(1)).toBe(true)
    expect(result.current.favouriteIds.has(4)).toBe(true)
    expect(result.current.favouriteIds.has(7)).toBe(true)
  })

  it('persists favourites to localStorage', () => {
    const { result } = renderHook(() => useFavourites())

    act(() => {
      result.current.toggleFavourite(2)
    })

    const stored = JSON.parse(localStorage.getItem(FAVOURITES_STORAGE_KEY)!)
    expect(stored).toEqual([2])
  })

  it('restores favourites from localStorage on mount', () => {
    localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify([3, 8]))

    const { result } = renderHook(() => useFavourites())

    expect(result.current.favouriteIds.size).toBe(2)
    expect(result.current.favouriteIds.has(3)).toBe(true)
    expect(result.current.favouriteIds.has(8)).toBe(true)
  })

  it('handles corrupted localStorage gracefully', () => {
    localStorage.setItem(FAVOURITES_STORAGE_KEY, 'not-valid-json')

    const { result } = renderHook(() => useFavourites())

    expect(result.current.favouriteIds.size).toBe(0)
  })
})

import { useState, useCallback } from 'react'
import { FAVOURITES_STORAGE_KEY } from '../constants'

const readFromStorage = (): Set<number> => {
  try {
    const raw = localStorage.getItem(FAVOURITES_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return new Set(parsed)
    }
  } catch {
    // Corrupted data – start fresh
  }
  return new Set()
}

const writeToStorage = (ids: Set<number>) => {
  localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify([...ids]))
}

const useFavourites = () => {
  const [favouriteIds, setFavouriteIds] = useState<Set<number>>(() => readFromStorage())

  const toggleFavourite = useCallback((id: number) => {
    setFavouriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      writeToStorage(next)
      return next
    })
  }, [])

  return { favouriteIds, toggleFavourite }
}

export default useFavourites

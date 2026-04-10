export interface ApiState<T> {
  data: T
  isLoading: boolean
  error: string | null
}

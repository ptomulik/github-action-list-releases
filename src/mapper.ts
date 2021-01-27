export interface ArrayMapper<T, R = T> {
  (array: T[]): R[];
}

interface FakeRequestOptions {
  ms?: number
  fail?: boolean
}

export function fakeRequest<T>(
  value: T,
  { ms = 1000, fail = false }: FakeRequestOptions = {}
): Promise<T> {
  return new Promise<T>((resolve, reject) =>
    setTimeout(() => {
      if (fail) reject(new Error('Server error: request failed'))
      else resolve(value)
    }, ms)
  )
}

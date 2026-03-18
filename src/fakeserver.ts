export function fakeRequest<T>(value: T, fail: boolean): Promise<T> {
    return new Promise<T>((resolve, reject) =>
        setTimeout(() => {
            if (fail) reject(new Error('Server error: request failed'))
            else resolve(value)
        }, 400)
    )
}

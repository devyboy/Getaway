import 'client-only'

export class ApiError extends Error {
    constructor(public readonly status: number) {
        super(`API request failed: HTTP ${status}`)
        this.name = 'ApiError'
    }
}

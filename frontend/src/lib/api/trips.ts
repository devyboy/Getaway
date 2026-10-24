import 'client-only'

import { ApiError } from '@/lib/api/apiError'
import { API_URL } from './api-client'


export type Trip = {
    name: string
    destination: string
    startDate: string
    endDate: string
    id: string
}

export async function getTrips(): Promise<Trip[]> {
    const response = await fetch(`${API_URL}/trips`, {
        credentials: 'include',
        cache: 'no-store',
    })

    if (!response.ok) {
        throw new ApiError(response.status)
    }

    return response.json()
}

export async function getTripById(id: string): Promise<Trip | null> {
    const response = await fetch(`${API_URL}/trips/${id}`, {
        credentials: 'include',
        cache: 'no-store',
    })

    if (response.status === 404) {
        return null
    }

    if (!response.ok) {
        throw new ApiError(response.status)
    }

    return response.json()
}

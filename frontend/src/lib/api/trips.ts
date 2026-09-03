import "server-only"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Trip = {
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    id: string;
};

export async function getTrips(): Promise<Trip[]> {
    const response = await fetch(`${API_URL}/trips`)

    if (!response.ok) {
        throw new Error("Failed to fetch trips")
    }

    return response.json()
}

export async function getTripById(id: string): Promise<Trip | null> {
    const response = await fetch(`${API_URL}/trips/${id}`)

    if (response.status === 404) {
        return null
    }

    if (!response.ok) {
        throw new Error("Failed to fetch trip")
    }

    return response.json()
}
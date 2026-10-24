'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export type User = {
    email: string,
}
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'error'
export type AuthContextType = {
    user: User | null,
    status: AuthStatus,
    refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = process.env.NEXT_PUBLIC_API_URL


export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [status, setStatus] = useState<AuthStatus>('loading')

    const refreshUser = useCallback(async () => {
        setStatus('loading')

        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                method: 'GET',
                credentials: 'include',
                cache: 'no-store'
            })

            if (response.status === 401) {
                setUser(null)
                setStatus('unauthenticated')
                return
            }

            if (!response.ok) {
                setStatus('error')
                return
            }

            const currentUser = (await response.json()) as User
            setUser(currentUser)
            setStatus('authenticated')
        } catch (error) {
            setStatus('error')
        }

    }, [])

    useEffect(() => {
        refreshUser()
    }, [refreshUser])

    return <AuthContext.Provider value={{ user, status, refreshUser }}>
        {status === 'loading' ? <p>Loading...</p> : children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

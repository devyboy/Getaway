'use client'

import { Button } from '@/components/ui/button'
import FormInput from '@/components/ui/formInput'
import { toast } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'
import { SubmitEvent, useState } from 'react'

export default function Register() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    async function handleFormSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(event.currentTarget)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(formData.entries()))
            })

            if (response.status === 409) {
                toast.add({
                    title: 'Unable to register',
                    description: 'User already exists, please login',
                    type: 'warning',
                })
                return
            }

            if (!response.ok) {
                toast.add({
                    title: 'Unable to register',
                    description: 'Invalid username or password',
                    type: 'error',
                })
                return
            }

            router.push('/trips')

        } catch (error) {
            console.error('Failed to register', error)
            toast.add({
                title: 'Unable to register',
                description: 'Please check your connection and try again',
                type: 'error',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleFormSubmit}>
                <FormInput name='email' placeholder='Email' required />
                <FormInput name='password' placeholder='Password' required />
                <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
            </form>
        </>
    )
}

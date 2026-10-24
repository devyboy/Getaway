import { InputHTMLAttributes } from 'react'

export default function FormInput({ type = 'text', ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className='block border border-solid'
            type={type}
            {...rest}
        />
    )
}
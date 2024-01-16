"use client";
import React, { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const session = useSession()
    useEffect(() => {
        if (session?.data?.user?.name) {
            router.push('/')
        }
    }, [session])
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, confirmPassword })
        })
        const response = await res.json()
        setMessage(response.message)

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className=' flex justify-center items-center h-screen my-10  '>

                <div className='border-2 rounded-lg flex flex-col w-1/3 gap-7 p-10 py-10' >
                    <p className='text-center text-2xl font-semibold'>YourNotes App</p>
                    <Input placeholder='Enter your Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <Input placeholder='Enter your email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder='Enter your Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Input placeholder='Confirm your Password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />



                    <Button variant={'default'} size={'lg'}>Sign up</Button>
                    <p className=' border-b-2 border-white'> </p>
                    <p className='text-center '> OR</p>
                    <Button variant={'outline'} size={'lg'} className='border-white' onClick={() => router.push("/signin")}>Sign in to your account</Button>
                </div>
            </form>


        </div>
    )
}
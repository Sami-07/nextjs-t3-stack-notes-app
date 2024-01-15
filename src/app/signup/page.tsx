"use client";
import React, { useState } from 'react'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
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

            <form onSubmit={handleSubmit}>
                <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />

                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type='submit'>Sign Up</button>
                <p>{message}</p>
            </form>

        </div>
    )
}
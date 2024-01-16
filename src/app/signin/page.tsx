"use client";

import { signIn } from 'next-auth/react';
import React, { useState } from 'react'

export default function Signin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const res = await signIn('credentials', {
      email,
      password,
      // callbackUrl: "/",
      redirect: false
    }
    )
  

  }
  return (
    <div>

      <form onSubmit={handleSubmit}>


        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>Sign IN</button>
      </form>

    </div>
  )
}
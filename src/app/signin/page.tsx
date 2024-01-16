"use client";

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button';
import { Input } from "~/components/ui/input"
import { useRouter } from 'next/navigation';
export default function Signin() {
  const router = useRouter();
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
  const session = useSession()
  useEffect(() => {
    if (session?.data?.user?.name) {
      router.push('/')
    }
  }, [session])
  return (
    <div>

      <form onSubmit={handleSubmit} className=' flex justify-center items-center h-screen   '>

        <div className='border-2 rounded-lg flex flex-col w-1/3 gap-7 p-10 py-10' >
          <p className='text-center text-2xl font-semibold'>YourNotes App</p>
          <Input placeholder='Enter your email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder='Enter your Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />


          {/* <button type='submit'>Sign IN</button> */}
          <Button variant={'default'} size={'lg'} >Sign in</Button>
          <p className=' border-b-2 border-white'> </p>
          <p className='text-center '> OR</p>
          <Button variant={'outline'} size={'lg'} className='border-white' onClick={() => router.push("/signup")}>Create an Account</Button>
        </div>
      </form>

    </div>
  )
}
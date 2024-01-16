"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { signOut, useSession } from 'next-auth/react'
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function Navbar() {
    const session = useSession();
    const [name, setName] = useState("");

    useEffect(() => {
        setName(session?.data?.user?.name!)
    }, [session])
    return (
        <div>
            <nav className='bg-purple-600 h-14 flex justify-between px-2 md:px-10 items-center'>
                <p className='font-semibold flex items-center gap-2 md:text-2xl'> <TbNotes /> YourNotes</p>
                <div className='flex gap-4 items-center capitalize'>
                    <Button className='border-2 border-white' variant={'ghost'} onClick={() => signOut()}>Sign out</Button>
                    <div className='flex items-center gap-2 '>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <p className='md:text-2xl'>{name}</p>
                    </div>
                </div>
            </nav></div>
    )
}

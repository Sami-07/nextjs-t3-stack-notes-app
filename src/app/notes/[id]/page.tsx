"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { api } from '~/trpc/react'

import AllNotes from '~/app/_components/AllNotes'
import CreateNote from '~/app/_components/CreateNote'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export default function Page() {
    const router = useRouter()


    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/signin')
        }
    });


    const params = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const { data: allNotes, refetch: refetchNotes } = api.notes.getAll.useQuery({ topicId: params.id }, {
        enabled: session?.data?.user?.name !== undefined
    });

    const addNote = api.notes.addNote.useMutation({
        onSuccess: () => {
            refetchNotes();
        },
        onError: (error) => {
            console.error("An error occurred:", error.message);
        
        },
    }
    )
    const { data: topicName } = api.notes.getTopic.useQuery({ topicId: params.id },


        { enabled: session?.data?.user?.name !== undefined })
    console.log("topic name", topicName)


    return (
        <>
            {topicName && <div>

                {/* This is topic ID: {params.id} */}
                <CreateNote addNote={addNote} params={params} topicName={topicName} />

                <AllNotes allNotes={allNotes} topicName={topicName} refetchNotes={refetchNotes} />
            </div>}
            {!topicName && <div>
                <p className='text-3xl font-semibold text-center'>No topic found</p>
            </div>
            }
        </>
    )
}

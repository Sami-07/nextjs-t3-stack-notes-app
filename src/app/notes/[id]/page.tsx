"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { api } from '~/trpc/react'

import AllNotes from '~/app/_components/AllNotes'
import CreateNote from '~/app/_components/CreateNote'
import { useSession } from 'next-auth/react'
export default function Page() {


    const session = useSession();
    useEffect(() => {
        if (!session?.data?.user?.name) {
            window.location.href = '/signin'
        }
    }, [session])
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
            // Handle the error here. You might want to show a notification to the user, for example.
        },
    }
    )
    const { data: topicName } = api.notes.getTopic.useQuery({ topicId: params.id },
        { enabled: session?.data?.user?.name !== undefined })

    return (
        <div>
            {/* This is topic ID: {params.id} */}
            <CreateNote addNote={addNote} params={params} topicName={topicName} />

            <AllNotes allNotes={allNotes} topicName={topicName} refetchNotes={refetchNotes} />
        </div>
    )
}

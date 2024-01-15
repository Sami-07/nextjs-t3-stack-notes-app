import React, {useState} from 'react'
import { api } from "~/trpc/react";
import { useSession } from 'next-auth/react';
export default function CreateTopic() {
    const [title, setTitle] = useState("");
const session = useSession();

    const { data: allTopics, refetch: refetchTopics } = api.topic.getAll.useQuery(undefined, {
        enabled: session?.data?.user?.name !== undefined
    });
    const createTopic = api.topic.create.useMutation({
        onSuccess: () => {
            refetchTopics();
        },
        onError: (error) => {
            console.error("An error occurred:", error.message);
            // Handle the error here. You might want to show a notification to the user, for example.
        },
    });
    return (
        <div>  <form className='text-center' onSubmit={(e) => {
            e.preventDefault();
            createTopic.mutate({
                title: title,
            })
            setTitle('')
        }
        }>

            <input type='text' placeholder='Enter topic' className='border-2 text-black  rounded-lg p-2' value={title} onChange={e => setTitle(e.target.value)} />
            <button type='submit' className='border-2 text-black  bg-white ml-4 px-2 rounded-lg p-2'>Create Topic</button>
        </form></div>
    )
}

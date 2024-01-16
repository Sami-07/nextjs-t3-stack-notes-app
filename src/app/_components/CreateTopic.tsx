import React, { useState } from 'react'
import { api } from "~/trpc/react";
import { useSession } from 'next-auth/react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
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
        <div>
            <form className=' text-center flex flex-col justify-center items-center gap-5 w-96 mx-auto  ' onSubmit={(e) => {
                e.preventDefault();
                createTopic.mutate({
                    title: title,
                })
                setTitle('')
            }
            }>
                <Input className='border-2 border-white' placeholder='Enter topic' type='text' value={title} onChange={e => setTitle(e.target.value)} />
                <Button variant={'default'} size={'lg'}>Create Topic</Button>
            </form>
            </div>
    )
}

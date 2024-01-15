// "use client"
import React from 'react'
import { api } from '~/trpc/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export default function AllTopics() {
    const session = useSession();
    const router = useRouter();
    const { data: allTopics, refetch: refetchTopics } = api.topic.getAll.useQuery(undefined, {
        enabled: session?.data?.user?.name !== undefined
    });
    return (
        <>
            <p className='text-center font-semibold my-5'>Select any topic to filter notes based on topics.</p>
            <div className='grid grid-cols-3 justify-center items-center gap-5 px-5'>
                {allTopics && allTopics?.map(topic => {
                    return (
                        <div onClick={() => router.push(`/notes/${topic.id}`)} key={topic.id} className='bg-orange-500 p-5 rounded-lg h-28 flex justify-center items-center cursor-pointer hover:scale-110 transition-all'>
                            <p className='font-semibold text-center text-2xl '>{topic.title}</p>
                        </div>
                    )
                })}
            </div>


        </>
    )
}

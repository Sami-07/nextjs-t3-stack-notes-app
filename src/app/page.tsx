"use client"
import React, { useEffect, useState } from 'react'
import { getServerAuthSession } from "../server/auth"
import { api } from "~/trpc/react";
import { useSession } from 'next-auth/react';
import CreateTopic from './_components/CreateTopic';
import AllTopics from './_components/AllTopics';
export default function Home() {
  // const session = await getServerAuthSession();
  const session = useSession();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
   
    if (session?.data?.user?.name) {
      setName(session?.data?.user?.name!) //! indicates that it is not null.
  }
  else{
    window.location.href = '/signin'
  }
    
  }, [session])
  const { data: hello } = api.topic.sayHello.useQuery();
  // we are destructuring the data from the response of the query as "hello".
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
  // we are destructuring the data from the response of the query as "allTopics".

  return (
    // <div className='gradient text-white'>

    //   <h1 className='text-3xl text-center font-semibold mb-5 '>Note Taker App</h1>

    //   <form className='text-center' onSubmit={(e) => {
    //     e.preventDefault();
    //     createTopic.mutate({
    //       title: title,
    //     })
    //     setTitle('')
    //   }
    //   }>

    //     <input type='text' placeholder='Enter topic' className='border-2 text-black border-black' value={title} onChange={e => setTitle(e.target.value)} />
    //     <button type='submit' className='border-2 text-black border-black bg-white ml-4 px-2'>Add Topic</button>
    //   </form>
    //   {createTopic.status === 'loading' && <p>Loading...</p>}
    //   {session?.data?.user &&
    //     <p>
    //       Session  {name}
    //     </p>}
    //   <p>This is topics</p> <br />
    //   {
    //     allTopics && allTopics?.map((topic: any) => (
    //       <div key={topic.id}>
    //         <h2>{topic.title}</h2>

    //       </div>
    //     ))
    //   }
    // </div>

    <>
      {name && <div className='gradient h-screen text-white py-10'>
        <h1 className='text-3xl text-center font-semibold'>Hello, {name} !</h1>
        <h1 className='text-2xl text-center font-semibold my-4'>Take your Notes here.</h1>

        <p className='text-center my-5 font-semibold text-gray-100'>Create Topics to organise your notes based on a topic</p>

        <CreateTopic />
        <AllTopics />

      </div>}
    </>
  )
}

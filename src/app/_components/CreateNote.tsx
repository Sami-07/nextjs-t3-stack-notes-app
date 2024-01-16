import React, { useState } from 'react'
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
export default function CreateNote({ addNote, params, topicName }: { addNote: any, params: any, topicName: any }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <div>
          <IoIosArrowBack className='text-2xl my-5 ml-5' onClick={()=>router.push("/")} />
        
      <p className='text-center font-semibold text-2xl  mb-5 '>Add Note to {topicName}</p>

    
      <form className='text-center flex flex-col justify-center items-center gap-5 w-96 mx-auto' onSubmit={(e) => {
        e.preventDefault();
        addNote.mutate({
          title: title,
          content: content,
          topicId: params.id

        })
        setTitle('')
        setContent('')

      }
      }>
        <Input className='border-2 border-white' placeholder='Enter Title' type='text' value={title} onChange={e => setTitle(e.target.value)} />
        <Textarea placeholder='Enter Content' value={content} onChange={e => setContent(e.target.value)} />
        <Button variant={'default'} size={'lg'}>Add Note</Button>
      </form>
      </div>
  )
}

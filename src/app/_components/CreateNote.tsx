import React, { useState } from 'react'


export default function CreateNote({ addNote, params, topicName }: { addNote: any, params: any, topicName: any }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  return (
    <div>
      <p className='text-center font-semibold text-2xl my-5'>Add Note to {topicName}</p>

      <form className='text-center flex flex-col justify-center items-center gap-5' onSubmit={(e) => {
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

        <input type='text' placeholder='Enter Title' className='border-2 text-black  rounded-lg p-2 w-1/2' value={title} onChange={e => setTitle(e.target.value)} />

        <textarea placeholder='Enter Content' className='border-2 text-black  rounded-lg p-2 w-1/2 h-40' value={content} onChange={e => setContent(e.target.value)} />
        <button type='submit' className='border-2 text-black  bg-white ml-4  rounded-lg p-2 px-6'>Add Note</button>
      </form></div>
  )
}

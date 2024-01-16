import React, { useState } from 'react'
import { api } from '~/trpc/react'
export default function AllNotes({ allNotes, topicName, refetchNotes }: { allNotes: any, topicName: any, refetchNotes: any }) {
    const [readMoreId, setReadMoreId] = useState<any>(null)
    const [openedNotes, setOpenedNotes] = useState<any>([])
    const deleteNote = api.notes.deleteNote.useMutation({
        onSuccess: () => {
            refetchNotes();
        }
    })
    return (
        <>
            <div className=' my-5 flex flex-col gap-2'>
                <p className='text-3xl font-semibold text-center'>All Notes</p>
                <p className='text-2xl font-semibold text-center'>Topic : {topicName} </p>

                {allNotes && allNotes?.map((note: any) => {
                    return (
                        <div key={note.id} className='border-2 mx-5 rounded-xl p-4'>

                            <div className='flex justify-between items-center my-2'>
                                <p className='text-lg'><span className='font-semibold mr-1'>Title: </span>{note.title}</p>
                                <button onClick={() => {
                                    deleteNote.mutate({
                                        noteId: note.id
                                    })
                                }} className='bg-orange-500 text-white px-2 rounded-lg' >Delete</button>
                            </div>
                            <p><span className='font-semibold mr-1'>Content:</span>


                                {(openedNotes.includes(note.id)) ? note.content : `${(note.content).substring(0, 100)}...`} 


                                <span className='underline font-semibold cursor-pointer' onClick={() => { setOpenedNotes([...openedNotes, note.id]) }
                                }>{!(openedNotes.includes(note.id)) && "Read More"}
                                </span>
                                <span className='underline font-semibold cursor-pointer' onClick={() => { setOpenedNotes((prevNotes: any) => prevNotes.filter((id: any) => id !== note.id)) }
                                }>{(openedNotes.includes(note.id)) && "Read Less"}
                                </span>

                            </p>

                        </div>
                    )
                })
                }
            </div >

        </>
    )
}

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'


const Paste = () => {
  const pastes = useSelector(state => state.paste.pastes)

  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useDispatch()

  const filterData = pastes.filter(paste =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete (pasteId) {
    dispatch(removeFromPastes(pasteId))
  }
  return (
    <div>
      <input
        className=' border-2 rounded-2xl mt-4 p-2 pl-4 min-w-[600px]'
        type='search'
        placeholder='search here'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-4'>
        {filterData.length > 0 &&
          filterData.map(paste => {
            return (
              <div className=' border ' key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className=' flex flex-row gap-4 place-content-evenly mt-3'>
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button  
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success('Copied to ClipBoard')
                    }}
                  >
                   Copy
                  </button>
                  <button
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: paste?.title,
                            text: paste?.content,
                            url: window.location.href // optional, current page ka link
                          })
                          toast.success('Shared successfully!')
                        } catch (err) {
                          toast.error('Sharing cancelled or failed')
                        }
                      } else {
                        // fallback agar support nahi hai
                        navigator.clipboard.writeText(
                          `${paste?.title} - ${paste?.content}`
                        )
                        toast.success('Copied to clipboard (share manually)')
                      }
                    }}
                  >
                    Share
                  </button>
                </div>
                <div className=' mt-1.5'>{paste.createdAt}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Paste

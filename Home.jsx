import React, { useEffect, useState  } from 'react'
import {useSearchParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from '../redux/pasteSlice';


const Home = () => {
    const [title , setTitle] = useState('')
    const [value , setValue] = useState('')
    const [searchParams , setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId")
    const dispatch = useDispatch();
    const allPastes = useSelector((state)=> state.paste.pastes);
 
    useEffect(() => {
         if(pasteId){
          const paste = allPastes.find((p)=>p._id === pasteId);
          setTitle(paste.title)
          setValue(paste.content);
         }
         
      }, [pasteId])


    function createPaste(){
      const paste ={
        title : title,
        content : value,
        _id : pasteId || 
               Date.now().toString(36),
        createdAt : new Date().toISOString(),
      }
            
      if(pasteId){
        // update
        dispatch(updateToPastes(paste));
      }
      else{
          // create
          dispatch(addToPastes(paste));
      }

      // after creation and updation
      setTitle('');
      setValue('');
      setSearchParams({}); 
    }


  return (
   <div>
     <div className=' flex flex-row gap-7 place-content-between'>
     <input
     className=' p-2 rounded-2xl mt-2 border-2 w-[60%] pl-4' 
     type="text" 
     placeholder='enter title here'
     value={title}
     onChange={(e)=>setTitle(e.target.value)}
     />
     <button  onClick={createPaste}
     className=' p-2 rounded-2xl mt-2 text-2xl '>
      {
        pasteId ? "update My paste " : "Create My paste"
      }
     </button>
    </div>
    <div className=' mt-8'>
      <textarea  className=' border-2 mt-4 rounded-2xl min-w-[500px] p-4'
      value={value}
      placeholder='enter content here'
      onChange={(e)=>setValue(e.target.value)}
      rows={20}

      />
    </div>
   </div>
  )
}

export default Home

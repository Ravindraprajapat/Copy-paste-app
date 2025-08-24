import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
const initialState = {
  pastes: localStorage.getItem('pastes')
    ? JSON.parse(localStorage.getItem('pastes')) // local storage me data hoga to json format paste ho jayga
    : [] // varna empty array print ho
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload

      const exist = state.pastes.find(p => p.title === paste.title)
      if (exist) {
        toast('⚠️ Paste with same title already exists!')
      } else {
        state.pastes.push(paste)

        localStorage.setItem('pastes', JSON.stringify(state.pastes))
        toast.success('Paste Created SuccessFully')
      }
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=> item._id === paste._id)
      if(index >=0){
        state.pastes[index] = paste;
        localStorage.setItem("pastes",JSON.stringify(state.pastes))

        toast.success("Paste update")
      }
    },
    resetAllPastes: (state, action) => {
     state.pastes =[];
     localStorage.removeItem("pastes")
    },
    removeFromPastes: (state, action) => {
     const pasteId = action.payload;
      console.log(pasteId)
      const index = state.pastes.findIndex((item)=>item._id === pasteId)
      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes))
        toast.success("Paste deleted");
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions

export default pasteSlice.reducer

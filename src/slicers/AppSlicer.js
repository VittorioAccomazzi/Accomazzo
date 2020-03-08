import { createSlice } from "@reduxjs/toolkit"
import { documentSearch } from '../docEngine/docSearch'

const AppSlicer = createSlice({
    name : 'docList',
    initialState : {
        docs: []
    },
    reducers : {
         search(state,action) { 
            state.docs =  documentSearch( action.payload );
        }
    }
})

export const {search} = AppSlicer.actions
export default AppSlicer.reducer
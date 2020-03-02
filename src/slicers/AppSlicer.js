import { createSlice } from "@reduxjs/toolkit"
import docSearch from '../docEngine/docSearch'

const AppSlicer = createSlice({
    name : 'docList',
    initialState : {
        docs: []
    },
    reducers : {
        search(state,action) { 
            state.docs = docSearch( action.payload );
        }
    }
})

export const {search} = AppSlicer.actions
export default AppSlicer.reducer
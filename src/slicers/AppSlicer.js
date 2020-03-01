import { createSlice } from "@reduxjs/toolkit"
import docSearch from '../docEngine/docSearch'

const AppSlicer = createSlice({
    name : 'docList',
    initialState : {
        docs: []
    },
    reducers : {
        search(state,action) { 
            state.docs = docSearch( action.payload.name, action.payload.fromYear, action.payload.toYear, action.payload.includeParents, action.payload.includeWitness );
        }
    }
})

export const {search} = AppSlicer.actions
export default AppSlicer.reducer
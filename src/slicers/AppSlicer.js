import { createSlice } from "@reduxjs/toolkit"
import { trackingInit, documentInit, documentSearch, documentByID } from '../docEngine/docSearch'
const queryString = require('query-string');

const AppSlicer = createSlice({
    name : 'docList',
    initialState : {
        docs: generateState()
    },
    reducers : {
         search(state,action) { 
            state.docs =  documentSearch( action.payload );
        }
    }
})

function generateState(){
    trackingInit();
    documentInit();
    let param = queryString.parse(window.location.search);
    return documentByID( param.show )
}

export const {search} = AppSlicer.actions
export default AppSlicer.reducer
import { createSlice } from '@reduxjs/toolkit'

export const csrftokenSlice = createSlice({
    name: 'csrftoken',
    initialState:{
        status:"no-authenticated",
        token:'notoken',
        msg:null
    },
    reducers: {
        getcsrftoken: (state,{payload}) => {
            state.status="OK";
            state.token=payload
        },
        
        erroringetcsrftoken:(state,{ payload })=>{
            state.status='error-in-gettoken';
            state.token=null;  
            state.msg=payload;           
        },
    },
})
export const { action, getcsrftoken, erroringetcsrftoken } = csrftokenSlice.actions;
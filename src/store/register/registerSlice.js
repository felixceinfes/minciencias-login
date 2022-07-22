import { createSlice } from '@reduxjs/toolkit'

export const registerSlice = createSlice({
    name: 'register',
    initialState:{
        status:"no-registered",
        email:null,
        error:null
    },
    reducers: {
        checkregistration: (state) => {
            state.status="checking";
        },
        registration:(state,{payload})=>{
            state.status='registered';
            state.email=payload;
            state.error=null;
        },
        errorinregistration:(state,{ payload })=>{
            state.status='error-in-register';
            state.email=null;
            state.error=payload;
        },
    },
})
export const { action, checkregistration, registration, errorinregistration } = registerSlice.actions;
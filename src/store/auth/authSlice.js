import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        status:"no-authenticated",
        iduser:null,
        uuid:null,
        email:null,
        name:null,
        accessToken:null,
        error:null,
        rolename:null       
    },
    reducers: {
        checkauthentication: (state) => {
            state.status="checking";
        },
        login:(state,{payload})=>{

            state.status='authenticated';
            state.iduser=payload.user.id_user;
            state.uuid=payload.user_uuid;
            state.email=payload.user.email;  
            state.name=payload.user.email;    
            state.accessToken=payload.token;
            state.error=payload.msg || null;
            state.rolename = payload.user.rolename;

        },
        logout:(state)=>{
            state.status='no-authenticated';
            state.iduser=null;
            state.uuid=null;
            state.email=null;  
            state.name=null;  
            state.accessToken=null;
            state.error=null;
            state.rolename = null;
        },
        errorinlogin:(state,{ payload })=>{
            state.status='error-in-authentication';
            state.iduser=null;
            state.uuid=null;
            state.email=null;  
            state.name=null;  
            state.accessToken=null;
            state.error=payload;
            state.rolename = null;
        },
    },
})
export const { action, checkauthentication, login, logout, errorinlogin } = authSlice.actions;
import axios from 'axios';
import { useStore } from 'react-redux';
import { checkauthentication, login, logout, errorinlogin } from './';


export const checkLogedIn=()=>{

    

    return async(dispatch)=>{ 
        if(localStorage.getItem('session_token')===null){
            dispatch(logout(""));
            return false;
        } 
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL_APIS}auth/checktoken`, {
                params: { token: "sdfsf" },
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('session_token')}`
                } } );
            const { user,msg, user_uuid }=res.data
            if(res.status===200 && res.data.status==="success"){
                const token = localStorage.getItem('session_token');
                dispatch(login({ user, msg, token, user_uuid }));
                return true;
            }
            dispatch(logout(msg));
        } catch (error) {
            let msgError = "Error de aplicación"; 
            if(error.request.status===401){
                msgError = JSON.parse(error.request.response).msg;
            }
            dispatch(errorinlogin(msgError));
        }
    }
}


export const loginBM=({loginEmail,password,_token})=>{
    return async(dispatch)=>{        
        await dispatch(checkauthentication());
        try {
           
             
              const options = {
                method: 'POST',
                //headers: { 'content-type': 'application/x-www-form-urlencoded' },
                //headers: { '_token': 'tyosD1GMfKV7Xrdwfz4qFH8SB49pFRjsZWo6a0tJ' },
                data: new URLSearchParams({ email:loginEmail, password:password,_token:_token }),
                //url:'https://192.168.5.108/enlazaa-backend/public/api/v1/loginuser'
                url:`${import.meta.env.VITE_URL_APIS}auth/loginuser`
              };
              //const { status, msg, user, token } =  await axios(options).data;
              const response =  await axios(options);
              const { status, msg, user, user_uuid, token } = await response.data;
            if(status==="success"){
                localStorage.setItem('session_token', token);
                await dispatch(login({ user, msg, token, user_uuid }));
            }else{
                await dispatch(logout(msg));
            }
        } catch (error) {
            let msgError = "Error de aplicación"; 
            if(error.request.status===401){
                msgError = JSON.parse(error.request.response).msg;
            }
            dispatch(errorinlogin(msgError));
        }
        
    }
}
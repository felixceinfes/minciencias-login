import axios from 'axios';
import { checkauthentication, login, logout, errorinlogin } from './';


export const checkLogedIn=()=>{
    return async(dispatch)=>{ 
        if(localStorage.getItem('session_token')===null){
            dispatch(logout(""));
            return false;
        } 
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL_APIS}checktoken`, {
                params: { token: "sdfsf" },
                headers: {
                'Authorization': `Bearer ${localStorage.getItem('session_token')}`
                } } );
            const { user,msg }=res.data
            if(res.status===200 && res.data.status==="success"){
                const token = localStorage.getItem('session_token');
                dispatch(login({ user, msg, token }));
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


export const loginBM=({loginEmail,password})=>{
    
    return async(dispatch)=>{        
        dispatch(checkauthentication());
        try {
           
             
              const options = {
                method: 'POST',
                //headers: { 'content-type': 'application/x-www-form-urlencoded' },
                //headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({ email:loginEmail, password:password }),
                //url:'https://192.168.5.108/enlazaa-backend/public/api/v1/loginuser'
                url:`${import.meta.env.VITE_URL_APIS}auth/loginuser`
              };
              //const { status, msg, user, token } =  await axios(options).data;
              const response =  await axios(options);
              const { status, msg, user, token } = response.data;
            if(status==="success"){
                localStorage.setItem('session_token', token);
                dispatch(login({ user,msg,token }));
            }else{
                dispatch(logout(msg));
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
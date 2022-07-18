import axios from 'axios';
import { checkauthentication, login, logout, errorinlogin } from './';

export const loginBM=({loginEmail,password})=>{
    
    return async(dispatch)=>{        
        dispatch(checkauthentication());
        try {
           
             
              const options = {
                method: 'POST',
                //headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: new URLSearchParams({ email:loginEmail, password:password }),
                url:'http://192.168.5.108/enlazaa-backend/public/api/v1/loginuser'
              };
              //const { status, msg, user, token } =  await axios(options).data;
              const response =  await axios(options);
              const { status, msg, user, token } = response.data;
             console.log({ status, msg, user, token });
            if(status==="success"){
                dispatch(login({ user,msg,token }))
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
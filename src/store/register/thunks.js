import axios from 'axios';
import { checkregistration, registration, errorinregistration } from '.';


export const registerEnlazaa=({email})=>{
    return async(dispatch)=>{ 
        dispatch(checkregistration());
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL_APIS}auth/user`, {
                params: { token: "sdfsf" },
            });
            if(res.status===200 && res.data.status==="success"){
                dispatch(registration({ email }));
            }
        } catch (error) {
            let msgError = "Error de aplicación"; 
            if(error.request.status===401){
                msgError = JSON.parse(error.request.response)?.msg;
            }
            dispatch(errorinregistration(msgError));
        }
    }
}


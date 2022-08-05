import axios from 'axios';
import { erroringetcsrftoken, getcsrftoken } from './csrftokenSlice';

export const getCsrfTokenApi=()=>{
    return async(dispatch)=>{     
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL_APIS}auth/generatetoken`);
            const { status,msg,data }=res.data
            if(res.status===200 && status==="success"){
                console.log(data);
                localStorage.setItem('csrftoken',data);
                dispatch(getcsrftoken(data));
                return true;
            }
            dispatch(erroringetcsrftoken("Error en obtención de csrf token"));
        } catch (error) {
            let msgError = "Error de aplicación";             
            dispatch(erroringetcsrftoken(msgError));
        }
    }
}
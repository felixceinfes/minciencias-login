export const sendEmailToResetPassword = async(email) => {
    
    try{
        const params=new URLSearchParams(email);
        const url=`${import.meta.env.VITE_URL_APIS}auth/emailtoresetpassword`;
        const result = await fetch( url,{
            method:'POST',body:params,
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded' 
            }
        });
        const statusTransaction = await result.json();
        return statusTransaction;
    }catch(err){
        console.error(err);
    }
}

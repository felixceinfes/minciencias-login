export const accountActivation = async(userData) => {
    console.log(userData);
    try{
        const params=new URLSearchParams(userData);
        const url=`${import.meta.env.VITE_URL_APIS}auth/activateaccount`;
        const result = await fetch( url,{
            method:'PUT',body:params,
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

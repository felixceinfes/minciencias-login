export const accountActivation = (userData) => {
async
    return async()=>{
        try{
            const params=new URLSearchParams(userData);
            const url=`${import.meta.env.VITE_URL_APIS}auth/activateaccount`;
            const result = await fetch( url,{method:'POST',params:params});
            const statustransaction = await result.json();
            return statustransaction;
        }catch(err){
            console.error(err);
        }
    }
    
}

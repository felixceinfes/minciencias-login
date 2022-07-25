export const checkUsedToken = async (dataToken) => {
        console.log(new URLSearchParams(dataToken));
            try{
                const params=new URLSearchParams(dataToken);
                const url=`${import.meta.env.VITE_URL_APIS}auth/checkusedtoken`;
                const result = await fetch( url,{
                    method:'POST',
                    body:params,
                    headers: {
                        'Accept': 'application/json',
                        'content-type': 'application/x-www-form-urlencoded' 
                      },
                });
                const { status, msg, data}  = await result.json();
                let usedToken=false;
                if(status==="success" && data[0].is_active===true){
                    usedToken = true;
                }
                return usedToken;
            }catch(err){
                console.error(err);
            }
        
    }
    
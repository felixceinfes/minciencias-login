import { useParams } from 'react-router-dom';
import { Base64 } from "js-base64";
import { useEffect, useState } from 'react';
import { checkUsedToken } from '../../../api/auth';
import { FormActivateAccount } from './FormActivateAccount';
import { BlankPage } from '../../../pages/blankPage';


export const ActivateAccount = () => {

  const [statusToken,setStatusToken] = useState(false);
  const { token } = useParams();
  const tokenAccount = JSON.parse(Base64.decode(token));
  const resultApi = async ()=>{
    const isUsedToken = await checkUsedToken(tokenAccount);
    setStatusToken(isUsedToken);
  }
  useEffect(() => {
    resultApi();
  }, [])
  
 console.log(statusToken);

  return (
    (statusToken===true)?
    <BlankPage title={"¡Ten en cuenta!"} body={"Tu cuenta ya ha sido activada"}/>:
    <FormActivateAccount tokenAccount={tokenAccount}/>
  )
}

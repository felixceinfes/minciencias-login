import React from 'react'

export const getDocumentTypes = async () => {
    try{
        const url=`${import.meta.env.VITE_URL_APIS}documenttype`;
        const result = await fetch( url,{method:'GET'} );
        const docs = await result.json();
        const { document_types } = docs;
        return document_types;
    }catch(err){
        console.error(err);
    }
}

import { HEADERS_CONTENT_TYPE } from "../constant/myConstant"
import { setErrorMsgCreatAndEdit } from "../helpers/validators"

export const EditRecipeFetch = async (userData, form,id) => {  

    const url = `https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/edit/${id}?auth=${userData.idToken}`
    
    const obj = {        
        ...form,
        userEmail:userData.email,
        __v: 0,
        _id:userData.localId        
    }
    const options = {
        method: 'PUT',
        headers: HEADERS_CONTENT_TYPE,
        body: JSON.stringify(obj)
    }
    const data = await fetch(url, options)
    const res = await data.json()
    
    if ( data.status === 500 ) {
        res.server = ""
        setErrorMsgCreatAndEdit(res)
        throw new Error("Error del servidor")
    }

    if( res.errors ){
        setErrorMsgCreatAndEdit(res)
        throw new Error('Hubo un error')
    }


    return res
}

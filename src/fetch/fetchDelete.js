import { HEADERS_CONTENT_TYPE } from "../constant/myConstant"


export const deleteRcipes = async(id,idToken) => {
    const url = `https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/delete/${id}?auth=${idToken}`

    const options = {
        method: 'DELETE',
        headers: HEADERS_CONTENT_TYPE
    }
    
    await fetch(url, options)   
}
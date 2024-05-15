import { HEADERS_CONTENT_TYPE } from "../constant/myConstant"


export const getWall = async (idToken) => {

    const url = `https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes/get?auth=${idToken}`

    const options = {
        method: 'GET',
        headers: HEADERS_CONTENT_TYPE
    }
    
    const data = await fetch(url, options)
    const res = await data.json()

    return res
}

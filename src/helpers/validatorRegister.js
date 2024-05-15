
export const validRegister = (form) => {
    const arrErr = [];
    const errBool = {}

    if( form.email === "" ){
        arrErr.push({ msg:'Ingrese un email' })
        errBool.email = true
    }
    if( form.password === ""){
        arrErr.push({ msg:'Ingrese una contraseña' })
        errBool.password = true
    }
    if( form.password.length <= 6 ){
        arrErr.push({ msg:'El password tiene que tener mas 6 caracteres' })
        errBool.password = true
    }
    if (arrErr.length === 0) {
        const valid = false
    
        return {
          valid,
          errBool
        };
    } else {
        const valid = arrErr
    
        return {
          valid,
          errBool
        };
    }
}
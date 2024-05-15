
export const validLogIn = (form) => {
    const arrErr = [];
    const errBool = {}

    if( form.email === "" ){
        arrErr.push({ msg:'Ingrese un email'})
        errBool.email = true
    }
    if( form.password === "" ){
        arrErr.push({ msg:'Ingrese una contraseña'})
        errBool.password = true
    }
    if( !form.email.includes("@") ){
        arrErr.push({ msg:'El email no es valido'})
        errBool.email = true
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
import { HEADERS_CONTENT_TYPE } from '../constant/myConstant';
import { setErrorMsgLog, setErrorMsgRegister } from '../helpers/validators';

const urlLogIn =
  'https://backend-recipes-bootcamps-tribe.onrender.com/api/auth/login';

export const login = async (form) => {
  
  const options = {
    method: 'POST',
    headers: HEADERS_CONTENT_TYPE,
    body: JSON.stringify(form),
  };

  const data = await fetch(urlLogIn, options);
  const res = await data.json();

  if (res.errors || res.error || !res.idToken) {
    setErrorMsgLog(res);
    throw new Error('Hubo un error');
  }

  return res;
};

const urlRegister =
  'https://backend-recipes-bootcamps-tribe.onrender.com/api/auth/signup';

export const register = async (form) => {
  const options = {
    method: 'POST',
    headers: HEADERS_CONTENT_TYPE,
    body: JSON.stringify(form),
  };

  const data = await fetch(urlRegister, options);
  const res = await data.json()

  if (!res.idToken || res.errors) {
    setErrorMsgRegister(res)
    throw new Error('No se pudo registrar el usuario');
  }
  const dataLogIn = await fetch(urlLogIn, options);
  const resLogIn = await dataLogIn.json();

  res.noLogIn = ""

  if (!resLogIn.idToken) {
    setErrorMsgRegister(res)
    throw new Error('No se pudo registrar el usuario');
  }

  return resLogIn;
};

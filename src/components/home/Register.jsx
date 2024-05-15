import { useEffect, useState } from "react";
import { Button, Metric, TextInput } from "@tremor/react";
import Transitions from "../transitions/Transitions";
import { register } from "../../fetch/fetchLogIn";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from "../../context/GlobalContext";
import { BORDER_BLACK } from "../../constant/myConstant";
import { useForm } from "../../hooks/useForm";
import { getErrorMsg } from "../../helpers/validators";
import { validRegister } from "../../helpers/validatorRegister";

export default function Register({ stateWatch }) {
  const [disa, setDisa] = useState(false);
  const [error, setError] = useState({})
  const { setUserData } = useGlobalContext()
  const go = useNavigate()
  const { form, buildForm, initialLoginRegister } = useForm()

  useEffect(() => {
    initialLoginRegister()
  }, [])

  const handlerSubmit = async () => {
    const { valid, errBool } = validRegister(form)
    setError(errBool)
    if (!valid) {
      setDisa(true);
      toast.promise(register(form), {
        loading: 'Registrando...',
        success: (data) => {
          setUserData(data)
          go('/wall')
          return `${data.email} registro correctamente`
        },
        error: (err) => {
          setDisa(false);
          return getErrorMsg()
        }
      })
    } else {
      valid.map((val) => {
        toast.error(val.msg);
      });
    }
  }

  return (
    <Transitions direction='left'>
      <div className={`p-8 ${BORDER_BLACK}`} >
        <Metric className="text-center mb-8">Registrarse</Metric>
        <div className="grid gap-4">
          {/*   <TextInput placeholder='Nombre completo' /> */}
          <TextInput
            placeholder='Email'
            name='email'
            onChange={buildForm}
            error={error.email}
          />
          <TextInput
            placeholder='Password'
            onChange={buildForm}
            name='password'
            error={error.password}
          />
          <Button onClick={handlerSubmit} disabled={disa}>
            Registrarse
          </Button>
          <Button variant="light" onClick={() => stateWatch(true)} disabled={disa}>
            Ya tengo cuenta
          </Button>
        </div>
      </div>
    </Transitions>
  )
}

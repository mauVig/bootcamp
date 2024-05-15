import { useEffect, useState } from 'react';
import { Button, Metric, TextInput } from '@tremor/react';
import Transitions from '../transitions/Transitions';
import { login } from '../../fetch/fetchLogIn';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import { BORDER_BLACK } from '../../constant/myConstant';
import { useForm } from '../../hooks/useForm';
import { getErrorMsg } from '../../helpers/validators';
import { validLogIn } from '../../helpers/validatorLogin';

export default function Login({ stateWatch }) {
  const [disa, setDisa] = useState(false);
  const [error, setError] = useState({})
  const { setUserData } = useGlobalContext();
  const go = useNavigate();
  const { form, buildForm, initialLoginRegister } = useForm();

  useEffect(() => {
    initialLoginRegister()
  }, [])

  const handlerSubmit = async () => {
    const { valid, errBool } = validLogIn(form)
    setError(errBool)
    if (!valid) {
      setDisa(true);
      toast.promise(login(form), {
        loading: 'Ingresando...',
        success: (data) => {
          setUserData(data);
          go('/wall');
          return `${data.email} ingreso correctamente`;
        },
        error: () => {
          setDisa(false);
          return getErrorMsg();
        },
      });
    } else {
      valid.map((val) => {
        toast.error(val.msg);
      });
    }
  };

  return (
    <Transitions direction="right">
      <div className={`p-8 ${BORDER_BLACK}`}>
        <Metric className="text-center mb-8">
          <span>Ingresar</span>
        </Metric>
        <div className="grid gap-4">
          <TextInput
            type="email"
            placeholder="Email"
            name="email"
            onChange={buildForm}
            error={error.email}

          />
          <TextInput
            placeholder="Contraseña"
            name="password"
            type="password"
            onChange={buildForm}
            error={error.password}

          />
          <Button onClick={handlerSubmit} disabled={disa}>
            Ingresar
          </Button>
          <Button
            variant="light"
            disabled={disa}
            onClick={() => stateWatch(false)}
          >
            Registrarse
          </Button>
        </div>
      </div>
    </Transitions>
  );
}

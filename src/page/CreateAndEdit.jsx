import { Badge, Button, TextInput, Title } from '@tremor/react';
import { BODY_CONTAINER, BORDER_BLACK } from '../constant/myConstant';
import { capitalize } from '../helpers/tools';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { back, deleteIco, plus } from '../components/icons';
import { toast } from 'sonner';
import { useGlobalContext } from '../context/GlobalContext';
import { AddRecipeFetch } from '../fetch/fetchAddRecipe';
import { EditRecipeFetch } from '../fetch/fetchEdit';
import { useForm } from '../hooks/useForm';
import { getErrorMsg } from '../helpers/validators';
import { validRecip } from '../helpers/validatorRecip';

const Icon = {
  plus,
  delete: deleteIco,
};

export default function CreateAndEdit() {
  const [opacity, setOpacity] = useState(false);
  const [error, setError] = useState({});
  const ingredientsRef = useRef();
  const { userData, getOneRecipe } = useGlobalContext();
  const go = useNavigate();
  const { id } = useParams();
  const {
    form,
    equalForm,
    buildForm,
    addIngredient,
    deleteIngredients,
    stateIngredient,
    initialRecip,
  } = useForm();

  useEffect(() => {
    initialRecip();
    if (id) {
      const res = getOneRecipe(id);
      equalForm(res);
    }
  }, []);

  const handlerFetchRecipe = () => {
    const { valid, errBool } = validRecip(form);
    setError(errBool);
    if (!valid) {
      if (id) {
        toast.promise(EditRecipeFetch(userData, form, id), {
          loading: 'Guardando cambios...',
          success: () => {
            go('/wall');
            return 'La modificacion se hizo correctamente';
          },
          error: getErrorMsg(),
        });
      } else {
        toast.promise(AddRecipeFetch(userData.idToken, form), {
          loading: 'Agregando...',
          success: () => {
            go('/wall');
            return 'Se guardo correctamente';
          },
          error: getErrorMsg(),
        });
      }
    } else {
      valid.map((val) => {
        toast.error(val.msg);
      });
    }
  };

  useEffect(() => {
    if (form.imagePath) {
      setOpacity(true);
    } else {
      setOpacity(false);
    }
  }, [form]);

  const handlerAddIngredients = () => {
    if (ingredientsRef.current.value !== '') {
      addIngredient(ingredientsRef.current.value);
      ingredientsRef.current.value = '';
      ingredientsRef.current.focus();
    }
  };

  const handlerBack = () => {
    if (id) {
      go(`/wall/receta/${id}`);
    } else {
      go(`/wall`);
    }
  };

  return (
    <div className={BODY_CONTAINER}>
      <div className={`${BORDER_BLACK} p-6 mb-6`}>
        <h1 className="text-3xl font-semibold text-center">
          {id ? 'Editar receta' : 'Crear receta'}
        </h1>
      </div>
      <div className={`grid lg:grid-cols-2 ${BORDER_BLACK}`}>
        <div
          className="flex justify-center items-center py-6"
          style={{
            backgroundImage: `url(${form.imagePath ?? form.imagePath})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center',
          }}
        >
          <div
            className={`bg-white p-6 rounded-lg ${
              opacity ? 'bg-opacity-70 ' : 'shadow-xl'
            }`}
          >
            <Title className="mb-2">Ingrese la URL de la imagen</Title>
            <TextInput
              placeholder="http://image..."
              className="w-full "
              name="imagePath"
              onChange={buildForm}
              defaultValue={form.imagePath ?? form.imagePath}
              error={error.imagePath}
            />
          </div>
        </div>
        <div className="border-l-2 border-black p-6">
          <div className="my-auto grid gap-4">
            <TextInput
              placeholder="Nombre"
              name="name"
              onChange={buildForm}
              className="shadow-xl"
              defaultValue={form.name ?? form.name}
              error={error.name}
            />
            <TextInput
              placeholder="Descripción"
              name="description"
              onChange={buildForm}
              className="shadow-xl"
              defaultValue={form.description ?? form.description}
              error={error.description}
            />
            <div className="flex gap-2">
              <TextInput
                placeholder="Agregar ingredientes"
                onKeyDown={(event) =>
                  event.key === 'Enter' ? handlerAddIngredients() : ''
                }
                className="shadow-xl"
                ref={ingredientsRef}
                error={error.ingredients}
              />
              <Button onClick={handlerAddIngredients}>
                <Icon.plus />
              </Button>
            </div>
            <ul className="flex flex-col">
              {stateIngredient.map((ingredient) => (
                <Badge key={ingredient.name} className="mr-1 my-2">
                  <span
                    className="flex items-center"
                    onClick={() => deleteIngredients(ingredient.name)}
                  >
                    <Icon.delete className="mr-4 hover:cursor-pointer" />
                    <span className="text-lg">
                      {capitalize(ingredient.name)}
                    </span>
                  </span>
                </Badge>
              ))}
            </ul>
            <div className="flex justify-between">
              <Button
                variant="secondary"
                className="mt-8"
                onClick={handlerBack}
                icon={back}
              >
                Volver
              </Button>
              <Button
                variant="primary"
                className="mt-8"
                icon={plus}
                onClick={handlerFetchRecipe}
              >
                {id ? 'Modificar' : 'Agregar receta'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

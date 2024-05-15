import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BODY_CONTAINER_MD, BORDER_BLACK } from '../constant/myConstant';
import { Badge, Button, Divider, Metric, Text, Title } from '@tremor/react';
import { back, plus, deleteIco, edit } from '../components/icons';
import { useGlobalContext } from '../context/GlobalContext';
import { capitalize } from '../helpers/tools';
import { deleteRcipes } from '../fetch/fetchDelete';
import Modal from '../components/Modal';
import { toast } from 'sonner';
import { createBrowserHistory } from "history";
import TransitionRecip from '../components/transitions/TransitionRecip';

const Icon = {
  delete: deleteIco,
  edit,
};

export default function OneRecipe() {
  const { getOneRecipe, userData, addBuyProduct } = useGlobalContext();
  const [recip, setRecip] = useState(null);
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const go = useNavigate();
  const history = createBrowserHistory();
  
  useEffect(() => {
    setRecip(getOneRecipe(id));
  }, []);

  const handlerDelete = () => {
    toast.promise(deleteRcipes(id, userData.idToken), {
      loading: 'Eliminando...',
      success: () => {
        go('/wall');
        return `${recip.name} fue eliminado`;
      },
      error: 'No se pudo borrar, intentelo nuevamente',
    });
  };

  const hanlerAddProducts = () => {
    addBuyProduct(recip);
    toast('Se agregaron los productos al carrito', {
      action: {
        label: 'Ver carrito',
        onClick: () => go('/wall/carrito'),
      },
    });
  };

  return (
    <TransitionRecip>
      {recip !== null ? (
        <div className={BODY_CONTAINER_MD}>
          <div className={`flex ${BORDER_BLACK}`}>
            <Modal
              show={show}
              setShow={setShow}
              name={recip.name}
              action={() => handlerDelete()}
            />
            <div>
              <img
                src={recip.imagePath}
                alt={recip.description}
                className="rounded-tl-lg rounded-tr-gl"
              />
            </div>
            <div className="my-auto p-6 relative">
              <div
                onClick={() => setShow(true)}
                className="px-1 hover:cursor-pointer flex flex-col items-center absolute right-2 top-2 bg-white"
              >
                <Icon.delete className="text-red-800" />
                <span className="text-red-800 text-xs">Borrar</span>
              </div>
              <div
                onClick={() => go(`/wall/crear/${id}`)}
                className="px-1 hover:cursor-pointer flex flex-col items-center absolute right-14 top-2 bg-white"
              >
                <Icon.edit className="text-blue-800" />
                <span className="text-blue-800 text-xs">Editar</span>
              </div>
              <Metric className="-ml-[2px]">{capitalize(recip.name)}</Metric>
              <Title className="font-medium mt-4">{recip.description}</Title>
              <Divider />
              <Text>Productos para preparar la receta de forma correcta</Text>
              <ul>
                {recip.ingredients.map((ingredient) => (
                  <Badge key={ingredient.name} className="mr-1 my-1">
                    <span className="text-lg">
                      {capitalize(ingredient?.name)}
                    </span>
                  </Badge>
                ))}
              </ul>
              <div className="flex justify-between gap-4">
                <Button
                  variant="secondary"
                  icon={back}
                  className="mt-8"
                  onClick={() =>history.go(-1)}
                >
                  Volver
                </Button>
                <Button
                  variant="primary"
                  icon={plus}
                  className="mt-8"
                  onClick={hanlerAddProducts}
                >
                  Agregar productos
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </TransitionRecip>
  );
}

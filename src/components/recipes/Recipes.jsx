import { Button, Card } from '@tremor/react';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '../../helpers/tools';
import TransitionRecip from '../transitions/TransitionRecip';
import st from '../../style/recipes.module.css';
import Favorite from './Favorite';

export default function Recipes({ _id, name, description, imagePath }) {
  const go = useNavigate();

  const handlerPlus = () => {
    go(`/wall/receta/${_id}`);
  };

  return (
    <TransitionRecip>
      <Card
        className="bg-white rounded-lg min-w-[300px] shadow-2xl relative"
        decoration="top"
        decorationColor="gray"
      >
        <Favorite id={_id} name={name} />
        <h2 className="mb-4 text-2xl text-center">{capitalize(name)}</h2>
        <div className={st.target} onClick={handlerPlus}>
          <img
            src={imagePath}
            alt={description}
            className="rounded-lg border-y-4 border-blue-400"
          />
          <div className={st.greyOpacity}>
            <Button
              size="xs"
              variant="primary"
              className={`px-8 py-2 ${st.buttom}`}
            >
              Leer Receta
            </Button>
          </div>
        </div>
      </Card>
    </TransitionRecip>
  );
}

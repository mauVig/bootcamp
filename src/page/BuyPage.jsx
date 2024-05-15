import { useEffect, useState } from 'react';
import { BODY_CONTAINER, BORDER_BLACK } from '../constant/myConstant';
import { useGlobalContext } from '../context/GlobalContext';
import { showArrBuy } from '../helpers/tools';
import NoRecipesBuy from '../components/buy/NoRecipesBuy';
import TableOfIngredient from '../components/buy/TableOfIngredient';

export default function FavoritePage() {
  const [data, setData] = useState([]);
  const { buyProduct } = useGlobalContext();

  useEffect(() => {
    setData(showArrBuy(buyProduct));
  }, []);

  return (
    <>
      <div className={BODY_CONTAINER}>
        <div className={`${BORDER_BLACK} p-6 mb-6`}>
          <h1 className="text-3xl font-semibold text-center">
            Carrito de compras
          </h1>
        </div>
        {data.length > 0 ? (
          <TableOfIngredient data={data}/>
        ):(
          <NoRecipesBuy />
        )}
      </div>
    </>
  );
}

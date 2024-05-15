import { BODY_CONTAINER, BORDER_BLACK } from '../constant/myConstant';
import { useEffect, useState } from 'react';
import { getWall } from '../fetch/fetchWall';
import { useGlobalContext } from '../context/GlobalContext';
import ContSpinner from '../components/spinner/ContSpinner';
import ContAllDataToWall from '../components/recipes/ContAllDataToWall';

export default function Wall() {
  const { userData, setAllRecipe } = useGlobalContext();
  const [data, setData] = useState(null);
  const [look, setLook] = useState(false);
  const [loading, setLoading] = useState(true);

  const handlerStart = async () => {
    const res = await getWall(userData.idToken);
    if (res.length === 0) {
      setLook(false);
    } else {
      setLook(true);
      setData(res);
      setAllRecipe(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    handlerStart();
  }, []);

  return (
    <div className={BODY_CONTAINER}>
      <div className={`${BORDER_BLACK} p-6 mb-6`}>
        <h1 className="text-3xl font-semibold text-center">Tus recetas</h1>
      </div>
      {loading ? (
        <ContSpinner />
      ) : (
        <ContAllDataToWall data={data} look={look} />
      )}
    </div>
  );
}

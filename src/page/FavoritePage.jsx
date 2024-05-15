import { useEffect, useState } from 'react';
import ContAllDataToWall from '../components/recipes/ContAllDataToWall';
import { BODY_CONTAINER, BORDER_BLACK } from '../constant/myConstant';
import { useGlobalContext } from '../context/GlobalContext';

export default function FavoritePage() {
  const [data, setData] = useState(null);
  const { getFavorite } = useGlobalContext();

  useEffect(() => {
    setData(getFavorite());    
  }, []);
  
  return (
    <>
      <div className={BODY_CONTAINER}>
        <div className={`${BORDER_BLACK} p-6 mb-6`}>
          <h1 className="text-3xl font-semibold text-center">Favoritos</h1>
        </div>
        {data && <ContAllDataToWall data={data} look={true} />}
      </div>
    </>
  );
}

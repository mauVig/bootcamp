import { useEffect, useState } from 'react';
import { start, startOn } from '../icons';
import { LOCAL_FAVORITE } from '../../constant/myConstant';
import { toast } from 'sonner';

const Icon = { start, startOn };

export default function Favorite({ id, name }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handlerClick = () => {
    const local = JSON.parse(localStorage.getItem(LOCAL_FAVORITE));

    if (!isFavorite) {
      if (localStorage.getItem(LOCAL_FAVORITE)) {
          const obj = [...local, id];
          localStorage.setItem(LOCAL_FAVORITE, JSON.stringify(obj));
      } else {
          localStorage.setItem(LOCAL_FAVORITE, JSON.stringify([id]));
      }
      setIsFavorite(true);
      toast(
        <div className='flex items-center gap-3'>
          <Icon.startOn />
          <span>  El producto <span className='font-bold'>{name}</span> fue agregado </span>
        </div>
      )
    } else {
      const obj = local.filter((favorite) => favorite !== id);
      localStorage.setItem(LOCAL_FAVORITE, JSON.stringify(obj));
      setIsFavorite(false);
      toast(
        <div className='flex items-center gap-3'>
          <Icon.start />
          <span>  El producto <span className='font-bold'>{name}</span> fue <span className='text-red-400'>eliminado</span> de favoritos</span>
        </div>
      )
    }
  };

  useEffect(() => {
    if (localStorage.getItem(LOCAL_FAVORITE)) {
      const local = JSON.parse(localStorage.getItem(LOCAL_FAVORITE));
      const res = local.filter(x => x === id)
      if (res.length === 1) setIsFavorite(true);
    }
  }, []);

  return (
    <div
      className="absolute right-2 top-2 scale-110 cursor-pointer"
      onClick={handlerClick}
    >
      {isFavorite ? <Icon.startOn /> : <Icon.start />}
    </div>
  );
}

import { useContext, createContext, useState } from 'react';
import { LOCAL_FAVORITE } from '../constant/myConstant';

const DataContext = createContext();

export const GlobalContext = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [allRecipe, setAllRecipe] = useState([]);
  const [buyProduct, setBuyProduct] = useState([]);

  const getOneRecipe = (id) => {
    return allRecipe.find((recipe) => recipe._id === id);
  };

  const getFavorite = () => {
    const local = JSON.parse(localStorage.getItem(LOCAL_FAVORITE));

    let obj = [];
    for (let i = 0; i < allRecipe.length; i++) {
      if (local.find((loc) => loc === allRecipe[i]._id)) {
        obj.push(allRecipe[i]);
      }
    }

    return obj;
  };

  const addBuyProduct = (recip) => {
    setBuyProduct([...buyProduct, recip]);
  };

  return (
    <DataContext.Provider
      value={{
        setUserData,
        userData,
        setAllRecipe,
        getOneRecipe,
        getFavorite,
        addBuyProduct,
        buyProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(DataContext);
};

import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useGlobalContext } from './context/GlobalContext';
import { MIN_SCREEN } from './constant/myConstant';
import Header from './components/header/Header';
import Home from './page/Home';
import Wall from './page/Wall';
import img from './assets/mainBack.jpg';
import OneRecipe from './page/OneRecipe';
import CreateAndEdit from './page/CreateAndEdit';
import FavoritePage from './page/FavoritePage';
import BuyPage from './page/BuyPage'

function App() {
  document.title = 'Recetas';
  const { setUserData } = useGlobalContext();

  useEffect(() => {
    return () => {
      setUserData({});
    };
  }, []);
  
  return (
    <>
      <Toaster
        position="top-center"
        expand={true}
        richColors
      />
      <Header />
      <div
        style={{
          backgroundImage: `url(${img})`,
          objectFit: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          minHeight: MIN_SCREEN,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wall" element={<Wall />} />
          <Route path="/wall/receta/:id" element={<OneRecipe />} />
          <Route path="/wall/crear" element={<CreateAndEdit />} />
          <Route path="/wall/crear/:id" element={<CreateAndEdit />} />
          <Route path="/wall/favoritos" element={<FavoritePage />} />
          <Route path="/wall/carrito" element={<BuyPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

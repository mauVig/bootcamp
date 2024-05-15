import { useEffect, useState } from 'react';
import Login from '../components/home/Login';
import Register from '../components/home/Register';
import { useForm } from '../hooks/useForm';

export default function Home() {
  const [watch, setWatch] = useState(true);

  

  return (
    <div className="max-w-xs sm:max-w-md mx-auto pt-8 ">
      {watch ? (
        <Login stateWatch={setWatch} />
      ) : (
        <Register stateWatch={setWatch} />
      )}
    </div>
  );
}
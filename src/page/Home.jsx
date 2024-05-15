import { useState } from 'react';
import Login from '../components/home/Login';
import Register from '../components/home/Register';

export default function Home() {
  const [watch, setWatch] = useState(true);

  return (
    <div 
      className="flex justify-center items-center"
      style={{ height: 'calc(100vh - 40px)' }}
      >
      {watch ? (
        <Login stateWatch={setWatch} />
      ) : (
        <Register stateWatch={setWatch} />
      )}
    </div>
  );
}

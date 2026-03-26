import React, { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { AppContextProvider } from './context/AppContextProvider';
import Login from './pages/login';


export const backendUrl = import.meta.env.VITE_BACKEND_URL



const App = () => {
  const [token, setToken] = useState('');

  return (
    <>
      
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <AppContextProvider>
            <AppRoutes />
          </AppContextProvider>
        </div>
    
    </>
  );
};

export default App;

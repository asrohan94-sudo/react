// App.jsx
import React, { useState } from "react";
import AppRoutes from "./Routes/appRoutes";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
 

  return (
    <div className="bg-gray-50 min-h-screen">
     
        <AppRoutes />
    
    </div>
  );
};

export default App;

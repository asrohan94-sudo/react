import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setAuth({
        user: JSON.parse(user),
        token: token,
      });
    } else {
      setAuth({
        user: null,
        token: null,
      });
    }
  }, []);

  async function logOut() {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setAuth({
      user: null,
      token: null,
    });

  }
  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
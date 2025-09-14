import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUser as getLocalUser, setUser } from "../utils/auth";
import { getUserApi } from "../service/api";
export const userContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(getLocalUser());
  const [errors, setErrors] = useState([]);

  const gettingUser = async () => {
    setErrors([]);
    try {
      const { data, error } = await getUserApi();
      if (error) return setErrors((prev) => [...prev, error.message]);

      const user = data?.data?.user;
      if (!user) return setErrors((prev) => [...prev, error.message]);
      setLoginUser(user);
      setUser(user);
    } catch (error) {
      console.error(error.message);
      setErrors((prev) => [...prev, error.message]);
      setLoginUser(null);
    }
  };

  useEffect(() => {
    if (!loginUser) {
      gettingUser();
    }
  }, []);

  return (
    <userContext.Provider value={{ setLoginUser, loginUser, errors }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);

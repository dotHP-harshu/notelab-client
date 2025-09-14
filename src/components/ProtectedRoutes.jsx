import { useNavigate } from "react-router";

import React, { useContext, useEffect } from "react";
import { getUser, setUser } from "../utils/auth";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const gettingUser = async () => {
    try {
      const { data, error } = await getUserApi();
      if (error) return navigate("/login");

      const user = data?.data?.user;
      if (!user) return navigate("/login");
      setUser(user);
    } catch (error) {
      console.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    const localUser = getUser();
    if (localUser) return;
    gettingUser();
  }, []);

  return <>{children}</>;
}

export default ProtectedRoutes;

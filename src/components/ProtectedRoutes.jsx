import { useNavigate } from "react-router";
import { getUser, setUser } from "../utils/auth";

import React, { useEffect } from "react";
import { getUserApi } from "../service/api";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();

  const gettingUser = async () => {
    const { data, error } = await getUserApi();
    if (error) return navigate("/login");

    const user = data?.data?.user;
    if (!user) return navigate("/login");
    setUser(user);
  };

  useEffect(() => {
    const loadedUser = getUser();
    if (loadedUser) return;

    gettingUser();
  }, []);

  return <>{children}</>;
}

export default ProtectedRoutes;

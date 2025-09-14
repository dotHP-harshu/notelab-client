import { useNavigate } from "react-router";

import React, { useContext, useEffect } from "react";
import { useAuth, userContext } from "../context/UserContext";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  useEffect(() => {
    if (!loginUser) {
      navigate("/login");
    }
  }, [loginUser]);

  return <>{children}</>;
}

export default ProtectedRoutes;

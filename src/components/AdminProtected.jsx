import { useNavigate } from "react-router";
import { getUser } from "../utils/auth";

import React, { useEffect } from "react";
import { getUserApi } from "../service/api";

function AdminProtected({ children }) {
  const navigate = useNavigate();

  const isAdmin = async()=>{
     try {
       const {data, error} = await getUserApi();
       if(error){
        console.log(error)
        navigate("/login")
       }
       const user = data.data.user
       if(user.role !== "admin"){
        return navigate("/login")
       }
     } catch (error) {
       console.log(error);
       navigate("/login");
     }
  }

  useEffect(() => {
    const user = getUser();
    if (!user) return navigate("/login");
    isAdmin()
  }, []);

  return <>{children}</>;
}

export default AdminProtected;

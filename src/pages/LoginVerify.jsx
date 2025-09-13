import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router'
import { getUserApi } from "../service/api"
import { setUser } from '../utils/auth'

function LoginVerify() {
  const navigate = useNavigate()
  const location  = useLocation()

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const getUser = async()=>{
    try{
      if(!token) return navigate("/login")
      
      const {data, error} =  await getUserApi()
      if(error){
        return navigate("/login")
      }
      const user = data?.data?.user
      setUser(user)
      navigate("/")
    }catch(error){
      console.log(error)
      navigate("/login")
    }
  }

  useEffect(() => {
    getUser()
  
  }, [])
  
  
  return <div>verifying</div>;
}

export default LoginVerify


const getUser = ()=>{
    const loadedUser = localStorage.getItem("notelab-user")
    return JSON.parse(loadedUser)
}

const setUser = (user)=>{
    localStorage.setItem("notelab-user", JSON.stringify(user))
    return user;
}
const deleteUser = ()=>{
  return  localStorage.removeItem("notelab-user")
}

export {getUser , setUser, deleteUser}
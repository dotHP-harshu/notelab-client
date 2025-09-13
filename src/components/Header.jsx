import React from 'react'
import Logo from "./Logo"
import { useNavigate } from 'react-router'

function Header() {
  const navigate = useNavigate()
  return (
    <header className="w-full flex justify-between items-center px-[5vw] py-4">
      <span onClick={()=> navigate("/home")} className='w-fit h-fit cursor-pointer '>
        <Logo size={40} />
      </span>

      <button
        onClick={() => navigate("/profile")}
        className="w-12 h-12 leading-none rounded-full outline-none overflow-hidden border-none select-none cursor-pointer bg-surface-color flex justify-center items-center"
      >
        <img
          src="/images/profile.png"
          alt="profile"
          className="w-full object-center object-cover"
        />
      </button>
    </header>
  );
}

export default Header

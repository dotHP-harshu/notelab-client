import React from 'react'
import { NavLink } from 'react-router'

function MenuBar() {
  return (
    <div>
      <menu>
        <NavLink to={"/home"}>Home</NavLink>
      </menu>
    </div>
  )
}

export default MenuBar

import React from "react";
import { BiHome, BiLibrary } from "react-icons/bi";
import { CgProfile, CgSearch } from "react-icons/cg";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-bg-sec-color px-6 py-2 rounded-full flex justify-center items-center gap-6 w-fit select-none">
      {/* desktop  */}
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary-color text-lg font-semibold max-xs:hidden"
            : " text-lg font-semibold max-xs:hidden "
        }
        to={"/"}
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary-color text-lg font-semibold max-xs:hidden"
            : " text-lg font-semibold max-xs:hidden "
        }
        to={"/search?q=&page=1"}
      >
        Search
      </NavLink>
      {/* <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary-color text-lg font-semibold max-xs:hidden"
            : " text-lg font-semibold max-xs:hidden "
        }
        to={"/bookmark"}
      >
        Library
      </NavLink> */}
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary-color text-lg font-semibold max-xs:hidden"
            : " text-lg font-semibold max-xs:hidden "
        }
        to={"/profile"}
      >
        Profile
      </NavLink>
      {/* desktop  */}

      {/* ------------------------------------------------------------------------------------------------ */}
      {/* mobile */}

      <NavLink
        title="home"
        className={({ isActive }) =>
          isActive
            ? "text-primary-color text-lg font-semibold hidden max-xs:inline-block"
            : " text-lg font-semibold hidden max-xs:inline-block"
        }
        to={"/"}
      >
        <BiHome />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary-color text-lg font-semibold hidden max-xs:inline-block"
            : " text-lg font-semibold hidden max-xs:inline-block"
        }
        to={"/search?q=&page=1"}
      >
        <CgSearch />
      </NavLink>
      {/* <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary-color text-lg font-semibold hidden max-xs:inline-block"
            : " text-lg font-semibold hidden max-xs:inline-block"
        }
        to={"/bookmark"}
      >
        <BiLibrary />
      </NavLink> */}
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-primary-color text-lg font-semibold hidden max-xs:inline-block"
            : " text-lg font-semibold hidden max-xs:inline-block"
        }
        to={"/profile"}
      >
        <CgProfile />
      </NavLink>
      {/* mobile */}
    </nav>
  );
}

export default Navbar;

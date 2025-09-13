import React, { useEffect } from "react";
import Header from "../components/Header";
import { NavLink, useNavigate, useParams } from "react-router";

import ManageUnit from "../components/ManageUnit";
import ManageSubject from "../components/ManageSubject";

function Admin() {
  const navigate = useNavigate()
  const {page}= useParams();

  useEffect(() => {
    if(!["dashboard", "manage-unit", "manage-subject"].includes(page)){
      navigate("/admin/dashboard")
    }
  
  }, [])
  
  
  
  return (
    <div>
      <Header />
      <main className="w-full flex ">
        <nav className="w-fit flex justify-start items-start gap-4 fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-4 rounded-[100px] bg-bg-color border-2 border-border-color">
          <NavLink
            to={"/admin/dashboard"}
            className={({ isActive }) => {
              return `${
                isActive ? "bg-surface-color" : ""
              } w-fit px-2 py-1 rounded-sm cursor-pointer`;
            }}
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/admin/manage-subject"}
            className={({ isActive }) => {
              return `${
                isActive ? "bg-surface-color" : ""
              } w-fit px-2 py-1 rounded-sm cursor-pointer`;
            }}
          >
            Manage Subject
          </NavLink>
          <NavLink
            to={"/admin/manage-unit"}
            className={({ isActive }) => {
              return `${
                isActive ? "bg-surface-color" : ""
              } w-fit px-2 py-1 rounded-sm cursor-pointer`;
            }}
          >
            Manage Unit
          </NavLink>
        </nav>

        {/* main panel  */}

        <div className="w-full min-h-dvh p-6">
          {page === "dashboard" && (
            <div className="w-full bg-surface-color p-4">
              <h2>DashBoard</h2>
            </div>
          )}

          {page === "manage-unit" && (<ManageUnit/>)}

          {page === "manage-subject" && (<ManageSubject/>)}
        </div>

        {/* main panel  */}
      </main>
    </div>
  );
}

export default Admin;

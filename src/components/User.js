import React from "react";
import FetchData from "../components/FetchData";
import SideBar from "./SideBar";
import Nav from "./Nav";
import ResNav from "./ResNav";

function User() {
  return (
    <>
      <ResNav />
      <div className="main">
        <SideBar />
        <div className="user--display">
          <Nav title="Users" />
          <div className="final-container-user">
            <FetchData />
          </div>
        </div>
      </div>
    </>
  );
}

export default User;

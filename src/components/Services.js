import React from "react";
import FetchServices from "./FetchServices";
import SideBar from "./SideBar";
import Nav from "./Nav";
import ResNav from "./ResNav";


function Services (){
    return(
        <>
        <ResNav />
        <div className="main">
          <SideBar />
          <div className="user--display">
            <Nav title="Services" />
            <div className="final-container-user">
              <FetchServices />
            </div>
          </div>
        </div>
      </>
    )
}

export default Services;
import React from "react";
import SideBar from "./SideBar";
import Nav from "./Nav";
import ResNav from "./ResNav";
import FetchVendorData from "./FetchVendorData";

function Vendor() {
  return (
    <>
      <ResNav />
      <div className="main">
        <SideBar />
        <div className="user--display">
          <Nav title="Vendors" />
          <div className="final-container-user">
           <FetchVendorData/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vendor;

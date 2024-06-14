import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Nav from "./Nav";
import ResNav from "./ResNav";
import FetchVendorData from "./FetchVendorData";
import { Link } from "react-router-dom";

function Vendor() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  if (!isAuthenticated) {
    return (
      <div className="post-logout">
        <img src="../images/refill-energy.png" alt="" />
        <h4>Thanks for the good work Admin!, take a break</h4>
        <p>
          Want to resume? <Link to="/">Go to Login</Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <ResNav />
      <div className="main">
        <SideBar />
        <div className="user--display">
          <Nav title="Vendors" onLogout={handleLogout} />
          <div className="final-container-user">
            <FetchVendorData />
          </div>
        </div>
      </div>
    </>
  );
}

export default Vendor;

import React, { useState, useEffect } from "react";
import FetchData from "../components/FetchData";
import SideBar from "./SideBar";
import Nav from "./Nav";
import ResNav from "./ResNav";
import { Link } from "react-router-dom";

function User() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  if (!isAuthenticated) {
    return (
      <div>
        Please login to view this page. <Link to="/">Go to Login</Link>
      </div>
    );
  }
  return (
    <>
      <ResNav />
      <div className="main">
        <SideBar />
        <div className="user--display">
          <Nav title="Users" onLogout={handleLogout} />
          <div className="final-container-user">
            <FetchData />
          </div>
        </div>
      </div>
    </>
  );
}

export default User;

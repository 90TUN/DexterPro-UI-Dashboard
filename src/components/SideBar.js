import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  return (
    <div className="side--bar">
      <img src="../images/logo.png" alt="" />
      <ul>
        <li>
          {" "}
          <Link
            className={
              location.pathname === "/" ? "active-link" : "normal-link"
            }
            to="/"
          >
            {location.pathname === "/" ? (
              <img src="../images/home-active.png" alt="" />
            ) : (
              <img src="../images/home-normal.png" alt="" />
            )}
            Home{" "}
          </Link>
        </li>
        <li>
          {" "}
          <img src="../images/service-req.png" alt="" />
          Service request
        </li>
        <li>
          {" "}
          <img src="../images/vendors.png" alt="" />
          Vendors
        </li>
        <li>
          {" "}
          <Link
            className={
              location.pathname === "/user" ? "active-link" : "normal-link"
            }
            to="/user"
          >
            {location.pathname === "/" ? (
              <img src="../images/user-normal.png" alt="" />
            ) : (
              <img src="../images/user-active.png" alt="" />
            )}
            Users
          </Link>{" "}
        </li>
        <li>
          {" "}
          <img src="../images/services.png" alt="" />
          Services
        </li>
        <li>
          {" "}
          <img src="../images/payments.png" alt="" />
          Payments
        </li>
      </ul>
    </div>
  );
}

export default SideBar;

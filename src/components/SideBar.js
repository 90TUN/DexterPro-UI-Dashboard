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
          <Link
            className={
              location.pathname === "/order" ? "active-link" : "normal-link"
            }
            to="/order"
          >
            {location.pathname === "/" ? (
              <img src="../images/user-normal.png" alt="" />
            ) : (
              <img src="../images/user-active.png" alt="" />
            )}
            Orders
          </Link>{" "}
        </li>
        <li>
          {" "}
          <Link
            className={
              location.pathname === "/vendor" ? "active-link" : "normal-link"
            }
            to="/vendor"
          >
            {location.pathname === "/" ? (
              <img src="../images/user-normal.png" alt="" />
            ) : (
              <img src="../images/user-active.png" alt="" />
            )}
            Vendors
          </Link>{" "}
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
          <Link
            className={
              location.pathname === "/service" ? "active-link" : "normal-link"
            }
            to="/service"
          > {location.pathname === "/" ? (
            <img src="../images/user-normal.png" alt="" />
          ) : (
            <img src="../images/user-active.png" alt="" />
          )}
            Services
          </Link>
          {" "}
        </li>
        <li>
          {" "}
          <Link
            className={
              location.pathname === "/transactions" ? "active-link" : "normal-link"
            }
            to="/transactions"
          > {location.pathname === "/" ? (
            <img src="../images/user-normal.png" alt="" />
          ) : (
            <img src="../images/user-active.png" alt="" />
          )}
            Transactions
          </Link>
          {" "}
        </li>
      </ul>
    </div>
  );
}

export default SideBar;

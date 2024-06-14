import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  return (
    <div className="side--bar">
      <img src="../images/logo.png" alt="" />
      <ul>
        <li>
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
            Home
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/order" ? "active-link" : "normal-link"
            }
            to="/order"
          >
            {location.pathname === "/order" ? (
              <img src="../images/order-active.png" alt="" />
            ) : (
              <img src="../images/order-normal.png" alt="" />
            )}
            Orders
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/vendor" ? "active-link" : "normal-link"
            }
            to="/vendor"
          >
            {location.pathname === "/vendor" ? (
              <img src="../images/vendor-active.png" alt="" />
            ) : (
              <img src="../images/vendor-normal.png" alt="" />
            )}
            Vendors
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/user" ? "active-link" : "normal-link"
            }
            to="/user"
          >
            {location.pathname === "/user" ? (
              <img src="../images/user-active.png" alt="" />
            ) : (
              <img src="../images/user-normal.png" alt="" />
            )}
            Users
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/service" ? "active-link" : "normal-link"
            }
            to="/service"
          >
            {location.pathname === "/service" ? (
              <img src="../images/service-active.png" alt="" />
            ) : (
              <img src="../images/service-normal.png" alt="" />
            )}
            Services
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname === "/transactions"
                ? "active-link"
                : "normal-link"
            }
            to="/transactions"
          >
            {location.pathname === "/transactions" ? (
              <img src="../images/transaction-active.png" alt="" />
            ) : (
              <img src="../images/transaction-normal.png" alt="" />
            )}
            Transactions
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;

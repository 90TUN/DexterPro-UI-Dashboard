import React from "react";
import { Link, useLocation } from "react-router-dom";

function ResNav() {
  const location = useLocation();
  return (
    <nav>
      <input type="checkbox" id="check" />
      <label for="check" class="checkbtn">
        <p>≡</p>
      </label>
      <label className="logo">
        {" "}
        <img
          src="../images/logo.png"
          alt=""
          style={{ height: "40px", marginLeft: "30px" }}
        />
      </label>
      <ul>
        <li>
          {" "}
          <Link
            className={
              location.pathname === "/" ? "active-link" : "normal-link"
            }
            to="/"
          >
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
            Orders{" "}
          </Link>
        </li>
        <li>
          {" "}
          <Link
            className={
              location.pathname === "/vendor" ? "active-link" : "normal-link"
            }
            to="/vendor"
          >
            Vendors{" "}
          </Link>
        </li>
        <li>
          {" "}
          <Link
            className={
              location.pathname === "/user" ? "active-link" : "normal-link"
            }
            to="/user"
          >
            Users{" "}
          </Link>
        </li>
        <li>
          {" "}
          <Link
            className={
              location.pathname === "/service" ? "active-link" : "normal-link"
            }
            to="/service"
          >
            Services{" "}
          </Link>
        </li>
        <li>
          {" "}
          <Link
            className={
              location.pathname === "/transactions"
                ? "active-link"
                : "normal-link"
            }
            to="/transactions"
          >
            Transactions{" "}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default ResNav;

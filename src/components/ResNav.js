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
        <li> Service request</li>
        <li> Vendors</li>
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
        <li> Services</li>
        <li> Payments</li>
      </ul>
    </nav>
  );
}

export default ResNav;

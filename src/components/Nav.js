import React, { useState } from "react";

function Nav(props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="nav">
      <h1>{props.title}</h1>
      <div className="side--nav">
        <img id="notif" src="../images/notif--icon.png" alt="Notification" />
        <img src="../images/profile.png" alt="Profile" />
        <h1 style={{ fontWeight: "lighter" }}>Admin</h1>
        <div className="dropdown">
          <img
            src="../images/dropdown.png"
            alt="Dropdown"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          />
          {dropdownVisible && (
            <div className="dropdown-content">
              <button onClick={props.onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;

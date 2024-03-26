import React from "react";

function Nav(props) {
  return (
    <div className="nav">
      <h1>{props.title}</h1>
      <div className="side--nav">
        <img id="notif" src="../images/notif--icon.png" alt="" />
        <img src="../images/profile.png" alt="" />
        <h1 style={{ fontWeight: "lighter" }}>Admin</h1>
        <img src="../images/dropdown.png" alt="" />
      </div>
    </div>
  );
}
export default Nav;

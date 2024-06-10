import React from "react";
import FetchOrders from "./FetchOrders.js";
import SideBar from "./SideBar";
import Nav from "./Nav";
import ResNav from "./ResNav";

function Orders() {
  return (
    <>
      <ResNav />
      <div className="main">
        <SideBar />
        <div className="user--display">
          <Nav title="Orders" />
          <div className="final-container-user">
            <FetchOrders/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;

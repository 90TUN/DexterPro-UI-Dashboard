import React from "react";
import SideBar from "./components/SideBar";
import Nav from "./components/Nav";
import DataInfo from "./components/DataInfo";
import UserGraphContainer from "./components/UserGraphContainer";
import TopRatedVendors from "./components/TopRatedVendors";
import TopRatedUsers from "./components/TopRatedUsers";
import ResNav from "./components/ResNav";

function App() {
  return (
    <>
      <ResNav />
      <div className="main">
        <SideBar />
        <div className="user--display">
          <Nav title="Welcome Dexter Admin" />

          <DataInfo />

          <div className="final-container">
            <div className="item1">
              <UserGraphContainer />
            </div>
            <div className="item3">
              <div className="item2">
                <TopRatedVendors />
              </div>
              <div className="item2">
                <TopRatedUsers />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

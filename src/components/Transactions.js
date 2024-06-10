import React from "react";
import SideBar from "./SideBar";
import Nav from "./Nav";
import ResNav from "./ResNav";
import FetchTransactions from "./FetchTransactions";


function Transactions (){
    return(
        <>
        <ResNav />
        <div className="main">
          <SideBar />
          <div className="user--display">
            <Nav title="Transactions" />
            <div className="final-container-user">
              <FetchTransactions />
            </div>
          </div>
        </div>
      </>
    )
}

export default Transactions;
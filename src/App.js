import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import Nav from "./components/Nav";
import DataInfo from "./components/DataInfo";
import UserGraphContainer from "./components/UserGraphContainer";
import TopRatedBusinesses from "./components/TopRatedBusinesses";
import TopRatedShops from "./components/TopRatedShops";
import ResNav from "./components/ResNav";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <ResNav />
      <div className="main">
        <SideBar />
        <div className="user--display">
          <Nav title="Welcome Dexter Admin," onLogout={handleLogout} />
          <DataInfo />
          <div className="final-container">
            <div className="item1">
              <UserGraphContainer />
            </div>
            <div className="item3">
              <div className="item2">
                <TopRatedBusinesses />
              </div>
              <div className="item2">
                <TopRatedShops />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

function DataInfo() {
  const [vendorCount, setVendorCount] = useState(0);
  const [activeServicesCount, setActiveServicesCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [activeServiceRequestCount, setActiveServiceRequestCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the token from sessionStorage (consistent with your other code)
        const token = sessionStorage.getItem('accessToken');
        console.log('Authorization Tokennnn:', token);
        
        // If there is no token, throw an error
        if (!token) {
          throw new Error('No authorization token found');
        }

        const response = await axios.get(
          "https://api.getdexterapp.com/api/backoffice/statistics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        console.log(data);
          console.log(data.data.total_vendors)

          setVendorCount(data.data.total_vendors);
          setUserCount(data.data.total_users);
          setActiveServiceRequestCount(data.data.total_completed_bookings + data.data.total_completed_orders);
          setActiveServicesCount(data.data.total_completed_bookings + data.data.total_completed_orders);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="info">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="info--card vendor">
        <img src="../images/info--vendor.png" alt="" />
        <h1 style={{ color: "#1B264F" }}>{vendorCount}</h1>
        <p>Vendors</p>
      </div>
      <div className="info--card services">
        <img src="../images/info--services.png" alt="" />
        <h1 style={{ color: "#F7B32B" }}>{activeServicesCount}</h1>
        <p>Active services</p>
      </div>
      <div className="info--card services--req">
        <img src="../images/info--services--req.png" alt="" />
        <h1 style={{ color: "#C1292E" }}> {activeServiceRequestCount}</h1>
        <p>Active Service Request</p>
      </div>
      <div className="info--card info--users">
        <img src="../images/info--users.png" alt="" />
        <h1 style={{ color: "#34252F" }}>{userCount}</h1>
        <p>Users</p>
      </div>
    </div>
  );
}

export default DataInfo;

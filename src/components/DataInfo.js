import React, { useState, useEffect } from "react";
import axios from "axios";

function DataInfo() {
  const [vendorCount, setVendorCount] = useState(0);
  const [activeServicesCount, setActiveServicesCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [activeServiceRequestCount, setActiveServiceRequestCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let totalCount = 0;
        let vendorTotalCount = 0;
        let activeServicesTotalCount = 0;
        let activeServiceRequestTotalCount = 0;

        // Loop through each page
        for (let i = 1; i <= 6; i++) {
          const response = await axios.get(
            `https://beta.getdexterapp.com/api/test?page=${i}`,
          );
          const data = response.data.data;

          // Calculate vendor count for current page
          const vendorCount = data.filter(
            (item) => item.business?.vendor_id || item.shop?.vendor_id,
          ).length;
          vendorTotalCount += vendorCount;

          // Calculate active services count for current page
          const activeServicesCount = data.filter(
            (item) =>
              (item.shop && item.shop.service && item.shop.service.is_active) ||
              (item.business &&
                item.business.service &&
                item.business.service.is_active),
          ).length;
          activeServicesTotalCount += activeServicesCount;

          const activeServiceRequestCount = data.filter(
            (item) =>
              item.business &&
              item.business.service &&
              !item.business.service.is_bookable,
          ).length;
          activeServiceRequestTotalCount += activeServiceRequestCount;

          // Calculate total user count
          totalCount += data.length;
        }

        // Update states
        setVendorCount(vendorTotalCount);
        setActiveServicesCount(activeServicesTotalCount);
        setUserCount(totalCount);
        setActiveServiceRequestCount(activeServiceRequestTotalCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="info">
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

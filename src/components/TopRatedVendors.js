import React, { useState, useEffect } from "react";

function TopRatedVendors() {
  const [vendors, setVendors] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // State variable to track data loading

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await fetch("https://beta.getdexterapp.com/api/test");
        const data = await response.json();
        const allPagesData = [data];

        // Fetch data from additional pages
        for (let i = 2; i <= data.meta.last_page; i++) {
          const nextPageResponse = await fetch(
            `https://beta.getdexterapp.com/api/test?page=${i}`,
          );
          const nextPageData = await nextPageResponse.json();
          allPagesData.push(nextPageData);
        }

        // Combine data from all pages into a single array
        const allVendors = allPagesData.flatMap((page) => page.data);

        // Extract relevant information and format the data
        const formattedData = allVendors.map((vendor) => ({
          id: vendor.id,
          fullName: `${vendor.first_name} ${vendor.last_name}`,
          image: vendor.image,
          VendorName: vendor.shop ? vendor.shop.service.name : "N/A", // Update this line
          vendorId: vendor.shop ? vendor.shop.vendor_id : "N/A",
        }));

        // Sort vendors by ID (ascending order)
        formattedData.sort((a, b) => a.id - b.id);

        // Set the top 5 vendors to the state
        setVendors(formattedData.slice(0, 5));
        setDataLoaded(true); // Set dataLoaded to true after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchVendors();
  }, []);

  return (
    <div className="top-rated-vendors">
      {dataLoaded && <h3>Top Rated Vendors</h3>} {/* Conditionally render h3 */}
      {vendors.map((vendor) => (
        <div className="vendor-row" key={vendor.id}>
          <div className="vendor">
            <div className="vendor--p1">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  className="vendor--line"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "16.5px",
                    border: "3px solid #D9D9D9",
                  }}
                  src={vendor.image}
                  alt={vendor.fullName}
                />
                <div
                  className="vendor--line"
                  style={{
                    fontWeight: "bold",
                    maxWidth: "100px", // Set maximum width for the container
                    wordWrap: "break-word", // Allow text to break into multiple lines
                    fontSize: "12px",
                  }}
                >
                  {vendor.fullName}
                </div>
              </div>
              <div className="Vendor--p2">
                <div
                  className="vendor--line"
                  style={{
                    color: "#808080",
                    marginLeft: "16.5px",
                    marginRight: "1px",
                    wordWrap: "normal",
                  }}
                >
                  {vendor.VendorName}
                </div>
              </div>
              <div className="vendor--p3">
                <img
                  className="vendor--line"
                  style={{ marginRight: "4px" }}
                  src="../images/Stars.png"
                  alt=""
                />
                <div
                  className="vendor--line"
                  style={{
                    color: "#3A5743",
                    fontWeight: "700",
                  }}
                >
                  4/5
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopRatedVendors;

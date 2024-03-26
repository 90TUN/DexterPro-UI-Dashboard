import React, { useState, useEffect } from "react";

function TopRatedUsers() {
  const [users, setUsers] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // State variable to track data loading

  useEffect(() => {
    async function fetchUsers() {
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
        const allUsers = allPagesData.flatMap((page) => page.data);

        // Extract relevant information and format the data
        const formattedData = allUsers.map((user) => ({
          id: user.id,
          fullName: `${user.first_name} ${user.last_name}`,
          image: user.image,
          vendorId: user.shop ? user.shop.vendor_id : "N/A",
        }));

        // Sort vendors by ID (ascending order)
        formattedData.sort((a, b) => a.id - b.id);

        // Set the top 5 vendors to the state
        setUsers(formattedData.slice(0, 5));
        setDataLoaded(true); // Set dataLoaded to true after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="top-rated-vendors user-i">
      {dataLoaded && <h3>Top Rated Users</h3>} {/* Conditionally render h3 */}
      {users.map((user) => (
        <div className="vendor-row" key={user.id}>
          <div className="vendor">
            <div className="user--p1">
              <div style={{ display: "inline-block" }}>
                <img
                  className="user--line"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    border: "3px solid #D9D9D9",
                    marginRight: "16.5px",
                  }}
                  src={user.image}
                  alt={user.fullName}
                />
                <div
                  className="user--line"
                  style={{
                    display: "inline-block",
                    fontWeight: "bold",
                  }}
                >
                  {user.fullName}
                </div>
              </div>
              <div className="user--p2">
                <img
                  className="user--line--star"
                  src="../images/Stars.png"
                  alt=""
                />
                <div
                  className="user--line"
                  style={{
                    display: "inline-block",
                    color: "#3A5743",
                    fontWeight: "700",
                    marginLeft: "4px",
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

export default TopRatedUsers;
